import React from 'react';
import styles from "./record-info.module.scss";
import {useAppSelector} from "../../hooks/redux";
import {format} from "date-fns";
import ru from "date-fns/locale/ru";

const RecordInfo = () => {
    const { staff, services, date, time } = useAppSelector(state => state.recordFormReducer.form)
    const { fullname, phone, email, comment } = useAppSelector(state => state.recordFormReducer.form.clientInfo)

    const getServices = () => {
        const selectedServices: string[] = []
        services.forEach(el => selectedServices.push(el?.title))
        return selectedServices.join(", ")
    }

    const getDate = () => format(date, "dd MMMM yyyy", {locale: ru})
    const getTime = () => format(new Date(time!), "HH:mm", {locale: ru})

    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>Параметры записи</div>
            {staff?.name && <div className={styles.row}>
                <p>Мастер:</p>
                <p>{staff?.name}</p>
            </div>}
            {getServices() && <div className={styles.row}>
                <p>Услуга:</p>
                <p>{getServices()}</p>
            </div>}
            {date && getDate() && <div className={styles.row}>
                <p>Дата:</p>
                <p>{getDate()}</p>
            </div>}
            {time && getTime() && <div className={styles.row}>
                <p>Время:</p>
                <p>{getTime()}</p>
            </div>}
            {(fullname || phone || email || comment) && <div className={styles.header}>Ваши данные</div>}
            {fullname && <div className={styles.row}>
                <p>Имя:</p>
                <p>{fullname}</p>
            </div>}
            {phone && <div className={styles.row}>
                <p>Телефон:</p>
                <p>{phone}</p>
            </div>}
            {email && <div className={styles.row}>
                <p>E-mail:</p>
                <p>{email}</p>
            </div>}
            {comment && <div className={styles.row}>
                <p>Комментарий к записи:</p>
                <p>{comment}</p>
            </div>}
        </section>
    );
};

export default RecordInfo;