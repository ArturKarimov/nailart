import React from 'react';
import styles from "./record-success.module.scss";
import mainImage from "../../images/main.png";

const RecordSuccess = () => {
    return (
        <section className={styles.wrapper}>
            <div>
                Вы были успешно записаны! Будем рады Вас видеть!
            </div>
            <img src={mainImage} alt="Успешная запись"/>
        </section>

    );
};

export default RecordSuccess;