import React from 'react';
import styles from "./main.module.scss";
import {NavLink} from "react-router-dom";

import mainImage from "../../images/main.png";

const Main = () => {
    return (
        <main className={styles.wrapper}>
            <img src={mainImage} alt=""/>
            <p className={styles.text}>Маникюр Красиво Аккуратно</p>
            <NavLink exact to="/order" className={styles.link}>
                    <div className={styles.order}>ЗАПИСАТЬСЯ</div>
            </NavLink>
        </main>
    );
};

export default Main;