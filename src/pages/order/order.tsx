import React from 'react';
import styles from './order.module.scss';
import OrderItem from "../../components/order-item/order-item";
import avatar from '../../images/avatar.svg';
import luna from '../../images/luna.png';
import {recordFormApi} from "../../services/record-form/record-form";
import Loading from "../../components/loading/loading";
import CustomDatePicker from "../../components/date-picker/date-picker";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {addService, removeService, resetState, setDate, setStaff} from "../../services/record-form/record-form-slice";
import {format} from "date-fns";
import {emitter} from "../../services/event-emitter/EventEmitter";
import OrderTimeSection from "../../components/order-time/order-time-section/order-time-section";
import OrderHeader from '../../components/order-item/order-header/order-header';
import ClientInfo from "../../components/client-info/client-info";
import RecordSuccess from "../../components/record-success/record-success";
import RecordError from "../../components/record-error/record-error";
import RecordInfo from "../../components/record-info/record-info";


export enum RecordFormStage {
    staff,
    services,
    seances,
    info,
    success,
    error
}

const Order = () => {
    const [stage, setStage] = React.useState<RecordFormStage>(RecordFormStage.staff)
    const {data, isLoading} = recordFormApi.useGetBookStaffQuery("")
    const dispatch = useAppDispatch();
    const {date, staff, services: selectedServices} = useAppSelector(state => state.recordFormReducer.form)
    const [getBookServices, {
        data: services,
        isLoading: isLoadingServices
    }] = recordFormApi.endpoints.getBookServices.useLazyQuery()

    const [getBookSeances, {
        data: seances,
        isLoading: isLoadingSeances
    }] = recordFormApi.endpoints.getBookSeances.useLazyQuery()


    const getBookServicesHandler = (id: number, name: string) => {
        getBookServices(id)
        dispatch(setStaff({id, name}))
        if (!isLoadingServices) {
            setStage(RecordFormStage.services)
        }
    }

    const getBookSeancesHandler = () => {
        setStage(RecordFormStage.seances)
        emitter.subscribe("getBookSeances", getBookSeances)
        emitter.subscribe("getClientFormInfo", getClientFormInfo)
        emitter.subscribe("bookRecordSuccess", bookRecordSuccess)
        emitter.subscribe("bookRecordError", bookRecordError)
        getBookSeances({id: staff?.id || 0, date: format(date || Date.now(), 'yyyy-MM-dd')})
        dispatch(setDate(Date.now()))
        if (!isLoadingSeances) {
            setStage(RecordFormStage.seances)
        }
    }

    const getClientFormInfo = () => {
        setStage(RecordFormStage.info)
    }

    const bookRecordSuccess = () => {
        setStage(RecordFormStage.success)
    }

    const bookRecordError = () => {
        setStage(RecordFormStage.error)
    }

    const addServiceItem = (id: number, title: string) => {
        dispatch(addService({id, title}))
    }

    const removeServiceItem = (id: number) => {
        dispatch(removeService(id))
    }

    const addServiceIcon = (id: number, title: string) => {
        if (selectedServices?.find(s => s.id === id)) {
            return <span onClick={() => removeServiceItem(id)}>-</span>
        }
        return <span onClick={() => addServiceItem(id, title)}>+</span>
    }

    function getFormTitle() {
        switch (stage) {
            case RecordFormStage.staff: {
                return <OrderHeader color="rgb(255 255 255 / 80%)" avatar={avatar} title="Выберите мастера маникюра"/>
            }
            case RecordFormStage.services: {
                return <OrderHeader color="rgb(255 255 255 / 80%)" avatar={avatar} title="Выберите услугу"/>
            }
            case RecordFormStage.seances: {
                return <OrderHeader color="rgb(255 255 255 / 80%)" avatar={avatar}
                                    title="Выберите удобное время записи"/>
            }
            case RecordFormStage.info: {
                return <OrderHeader color="rgb(255 255 255 / 80%)" avatar={avatar} title="Ваши данные"/>
            }
            case RecordFormStage.success: {
                return <RecordSuccess/>
            }
            case RecordFormStage.error: {
                return <RecordError/>
            }
        }
    }

    function getFormStage() {
        switch (stage) {
            case RecordFormStage.staff: {
                return data?.data.map(item => (
                    <OrderItem
                        key={item.id}
                        id={item.id}
                        color="#fffdfd80"
                        avatar={luna}
                        title={item.name}
                        comment={item.specialization}
                        onClick={() => getBookServicesHandler(item.id, item.name)}
                    />
                ))
            }
            case RecordFormStage.services: {
                return services?.data.services.map(item => (
                    <OrderItem
                        key={item.id}
                        id={item.id}
                        color="#fffdfd80"
                        avatar={avatar}
                        title={item.title}
                        comment={item.comment}
                        price={item.price_min}
                        isServices={true}
                        actions={[
                            <>
                                <div>{item.price_min}</div>
                                <div className={styles.addService}>{addServiceIcon(item.id, item.title)}</div>
                            </>
                        ]}
                    />
                ))
            }
            case RecordFormStage.seances: {
                return (
                    <>
                        <CustomDatePicker/>
                        <OrderTimeSection seances={seances?.data || []} isLoading={isLoadingSeances}/>
                    </>
                )
            }
            case RecordFormStage.info: {
                return (
                    <ClientInfo/>
                )
            }
        }
    }

    React.useEffect(() => {
        getFormStage()
    }, [stage])

    React.useEffect(() => {
        return () => {
            dispatch(resetState())
        }
    }, [])


    if (isLoading) {
        return <Loading/>
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.wrapperLeft}>
                {getFormTitle()}
                <div className={styles.innerWrapper}>
                    {getFormStage()}
                </div>
                {selectedServices.length && stage === RecordFormStage.services ?
                    <>
                        <button
                            className={styles.nextButton}
                            onClick={getBookSeancesHandler}
                        >
                            Продолжить
                        </button>
                    </>
                    : null}
            </div>
            <RecordInfo/>
        </section>

    );
};

export default Order;