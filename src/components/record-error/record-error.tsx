import React from 'react';
import styles from "./record-error.module.scss";

const RecordError = () => {
    return (
        <section className={styles.wrapper}>
            <div>
                Произошла ошибка. Повторите попытку чуть позже. Мы уже разбираемся с проблемой.
            </div>
        </section>
    );
};

export default RecordError;