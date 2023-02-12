import React from 'react';
import styles from './header.module.scss';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div className={styles.headerLeftBts}>
                <NavLink exact to="/" className={styles.link} activeClassName={styles.activeLink}>
                    <div className={styles.headerButton}>
                        <p>Главная</p>
                    </div>
                </NavLink>
                <NavLink to="/works" className={styles.link} activeClassName={styles.activeLink}>
                    <div className={styles.headerButton}>
                        <p>Наши работы</p>
                    </div>
                </NavLink>
                <NavLink exact to="/order" className={styles.link} activeClassName={styles.activeLink}>
                    <div className={styles.headerButton}>
                        <p>Записаться</p>
                    </div>
                </NavLink>
            </div>
            <div className={styles.headerLogo} >
                NAILART.KAZAN
            </div>
            <NavLink to="/profile/staffs" className={styles.link} activeClassName={styles.activeLink}>
                <div className={styles.headerButton}>
                    <p>Личный кабинет</p>
                </div>
            </NavLink>
        </header>
    );
};

export default Header;