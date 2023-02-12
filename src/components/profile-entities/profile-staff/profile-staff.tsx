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
import {profileApi} from "../../../services/profile/profile";
import ConfirmModal from "../../modal/confirm-modal/confirm-modal";
import Loading from "../../loading/loading";

const ProfileStaff = () => {
    const [confirmAction, setConfirmAction] = React.useState<{isConfirm: boolean, data: number | null}>(
        {isConfirm: false, data: null}
    );
    const {data, isLoading} = recordFormApi.useGetBookStaffQuery("")
    const [getStaffs] = recordFormApi.endpoints.getBookStaff.useLazyQuery()
    const [deleteStaff] = profileApi.useDeleteStaffMutation();
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
            getStaffs("")
        }
    }

    return (
        <>
            {isLoading ? <Loading /> :
            <div className={styles.wrapper}>
                <Link to={{pathname: "/profile/staffs/add", state: {background: location}}}>
                    <OrderHeader
                        color="rgb(255 255 255 / 80%)"
                        avatar={avatar}
                        title="Добавить сотрудника"
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
                                        title="Удалить сотрудника"
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
                    {data?.data && data?.data.length === 0 && <div className={styles.notStaffs}>Сотрудники отсутствуют. Вы можете добавить своего первого сотрудника</div>}
                </div>
            </div> }
            {confirmAction.isConfirm &&
                <ConfirmModal
                    okCallback={removeStaff}
                    onClose={onClose}
                    title="Вы действительно хотите удалить сотрудника?"
                />}
        </>
    );
};

export default ProfileStaff;