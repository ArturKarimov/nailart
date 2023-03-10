import React from 'react';
import styles from "./profile-staff.module.scss";
import OrderHeader from "../../order-item/order-header/order-header";
import avatar from "../../../images/avatar.svg";
import {recordFormApi} from "../../../services/record-form/record-form";
import OrderItem from "../../order-item/order-item";
import luna from "../../../images/luna.png";
import {Link, useLocation} from "react-router-dom";
import {ILocationState} from "../../../interfaces/interfaces";
import {nanoid} from "@reduxjs/toolkit";
import {profileStaffApi} from "../../../services/profile/profile-staff/profile-staff";
import ConfirmModal from "../../modal/confirm-modal/confirm-modal";
import Loading from "../../loading/loading";

const ProfileStaff = () => {
    const [confirmAction, setConfirmAction] = React.useState<{isConfirm: boolean, data: number | null}>(
        {isConfirm: false, data: null}
    );
    const {data, isLoading} = recordFormApi.useGetBookStaffQuery("")
    const [getStaffs] = recordFormApi.endpoints.getBookStaff.useLazyQuery()
    const [deleteStaff, { isSuccess }] = profileStaffApi.useDeleteStaffMutation();
    const location = useLocation() as ILocationState;

    const onClose = () => {
        setConfirmAction({isConfirm: false, data: null})
    }

    const confirmDelete = (e: React.ChangeEvent<any>, id: number) => {
        e.stopPropagation()
        e.preventDefault()
        setConfirmAction({isConfirm: true, data: id})
    }

    const removeStaff = () => {
        if (confirmAction.data) {
            deleteStaff(confirmAction.data)
            onClose()
        }
    }

    React.useEffect(() => {
       if (isSuccess) {
           getStaffs("")
       }
    }, [isSuccess])

    return (
        <>
            {isLoading ? <Loading /> :
            <div className={styles.wrapper}>
                <Link to={{pathname: "/profile/staffs/add", state: {background: location}}}>
                    <OrderHeader
                        color="rgb(255 255 255 / 80%)"
                        avatar={avatar}
                        title="???????????????? ????????????????????"
                        width="100%"
                        actions={[<span className={styles.addIcon} key={nanoid()}>+</span>]}
                    />
                </Link>

                <div className={styles.innerWrapper}>
                    {data?.data.map(item => (
                        <Link key={item.id} to={{pathname: `/profile/staffs/${item.id}`, state: {background: location}}}>
                            <OrderItem
                                id={item.id}
                                color="#fffdfd80"
                                avatar={luna}
                                title={item.name}
                                comment={item.specialization}
                                information={item?.information}
                                width="100%"
                                actions={[
                                    <div
                                        title="?????????????? ????????????????????"
                                        key={item.id}
                                        className={styles.deleteIcon}
                                        onClick={(e) => confirmDelete(e, item.id)}
                                    >
                                        +
                                    </div>
                                ]}
                            />
                        </Link>
                    ))}
                    {data?.data && data?.data.length === 0 && <div className={styles.notStaffs}>???????????????????? ??????????????????????. ???? ???????????? ???????????????? ???????????? ?????????????? ????????????????????</div>}
                </div>
            </div> }
            {confirmAction.isConfirm &&
                <ConfirmModal
                    okCallback={removeStaff}
                    onClose={onClose}
                    title="???? ?????????????????????????? ???????????? ?????????????? ?????????????????????"
                />}
        </>
    );
};

export default ProfileStaff;