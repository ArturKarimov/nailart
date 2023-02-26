import React from 'react';
import styles from './profile-add-staff.module.scss';
import {useHistory, useParams} from "react-router-dom";
import {Modal} from '../modal';
import BaseInput from "../../base-input/base-input";
import {useForm} from "../../../hooks/useForm";
import BaseButton from "../../base-button/base-button";
import {profileStaffApi} from "../../../services/profile/profile-staff/profile-staff";
import {IStaffRequest} from "../../../services/profile/profile-staff/interface";
import {nanoid} from "@reduxjs/toolkit";
import {recordFormApi} from "../../../services/record-form/record-form";
import Loading from "../../loading/loading";

interface INewStaff {
    name: string;
    specialization: string;
    information: string;
}

const ProfileAddStaffModal = () => {
    const [addStaff, {data: addStaffData}] = profileStaffApi.useAddStaffMutation();
    const [updateStaff, {data: updateStaffData}] = profileStaffApi.useUpdateStaffMutation();
    const [getStaffs] = recordFormApi.endpoints.getBookStaff.useLazyQuery()
    const [getStaff, {data: staffData, isLoading}] = profileStaffApi.useLazyGetStaffQuery()
    const history = useHistory();
    const params = useParams<{ id: string }>()

    const {values, setValues} = useForm<INewStaff>({
        name: staffData?.data.name || "",
        specialization: staffData?.data.specialization || "",
        information: staffData?.data.information || ""
    });

    const onClose = () => {
        history.replace("/profile/staffs")
    }

    const changeStaff = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const payload: IStaffRequest = {
            name: values.name,
            specialization: values.specialization,
            weight: 10,
            information: values.information,
            api_id: nanoid(),
            hidden: 0,
            fired: 0,
            user_id: 0
        }
        if (params?.id) {
            updateStaff({id: params?.id, data: payload})
        } else {
            addStaff(payload)
        }
    }

    React.useEffect(() => {
        if (addStaffData?.success || updateStaffData?.success) {
            getStaffs("")
            onClose()
        }

        if (staffData?.success) {
            setValues({
                name: staffData?.data.name || "",
                specialization: staffData?.data.specialization || "",
                information: staffData?.data.information || ""
            })
        }
    }, [addStaffData?.success, staffData?.success, updateStaffData?.success])

    React.useEffect(() => {
        if (params?.id) {
            getStaff(params.id)
        }
    }, [params?.id])

    return (
        <Modal
            width={450}
            height="fit-content"
            onClose={onClose}
            title={params?.id ? "Измените данные сотрудника" : "Добавить нового сотрудника"}
            background="#40424b"
        >
            {isLoading
                ? <Loading/>
                : <form className={styles.wrapper} onSubmit={changeStaff}>
                    <BaseInput name="name" label="Имя" placeholder="Введите имя" value={values} setValue={setValues}/>
                    <BaseInput name="specialization" label="Специализация" placeholder="Введите специализацию"
                               value={values} setValue={setValues}/>
                    <BaseInput name="information" label="Дополнительная информация"
                               placeholder="Введите дополнительную информацию" value={values} setValue={setValues}/>
                    <BaseButton name={params?.id ? "Обновить" : "Добавить"} type="submit"/>
                </form>}
        </Modal>
    );
};

export default ProfileAddStaffModal;