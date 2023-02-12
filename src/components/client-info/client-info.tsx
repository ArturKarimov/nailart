import React from 'react';
import BaseInput from "../base-input/base-input";
import {useForm} from "../../hooks/useForm";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import styles from "../../pages/order/order.module.scss";
import {IBookRecordRequest} from "../../interfaces/interfaces";
import {recordFormApi} from "../../services/record-form/record-form";
import {emitter} from "../../services/event-emitter/EventEmitter";
import {setClientInfo} from "../../services/record-form/record-form-slice";

export interface IClientInfo {
    fullname: string;
    phone: string;
    email?: string;
    comment?: string;
}

const ClientInfo = () => {
    const {values, setValues} = useForm<IClientInfo>({
        fullname: "",
        phone: "",
        email: "",
        comment: ""
    });
    const [createBookRecord, {isLoading, data, error}] = recordFormApi.useCreateBookRecordMutation()

    const {services, time, staff} = useAppSelector(state => state.recordFormReducer.form);
    const {phone, fullname, email, comment} = values;
    const dispatch = useAppDispatch();

    const bookRecord = async () => {
        const selectedServices: number[] = []
        services.forEach(el => selectedServices.push(el.id))
        const formRecord: IBookRecordRequest = {
            phone, fullname, email, comment,
            appointments: [{id: Date.now(), staff_id: staff?.id!, datetime: time!, services: selectedServices}]
        }
        await createBookRecord(formRecord)
    }

    React.useEffect(() => {
        if (data?.success) {
            emitter.emit("bookRecordSuccess");
        }
        if (error) {
            emitter.emit("bookRecordError");
        }
    }, [data])

    React.useEffect(() => {
        dispatch(setClientInfo(values))
    }, [values])

    return (
        <div>
            <BaseInput<IClientInfo> name="fullname" label="Имя" placeholder="Введите имя" value={values}
                                    setValue={setValues}/>
            <BaseInput<IClientInfo> name="phone" label="Телефон" placeholder="Введите номер телефона" value={values}
                                    setValue={setValues}/>
            <BaseInput<IClientInfo> name="email" label="E-mail" placeholder="Введите электронную почту" value={values}
                                    setValue={setValues}/>
            <BaseInput<IClientInfo> name="comment" label="Комментарий к записи" placeholder="Комментарий к записи"
                                    value={values} setValue={setValues}/>
            <button
                className={styles.nextButton}
                onClick={bookRecord}
            >
                Записаться
            </button>
        </div>
    );
};

export default ClientInfo;