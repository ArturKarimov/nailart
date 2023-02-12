import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './profile-navigation.module.scss';

const ProfileNavigation = () => {
    return (
        <nav className={styles.wrapper}>
            <div className={styles.link}>
                <NavLink to="/profile/staffs" activeClassName={styles.activeLink} exact>
                    Сотрудники
                </NavLink>
            </div>
            <div className={styles.link}>
                <NavLink to="/profile/services" activeClassName={styles.activeLink} exact>
                    Услуги
                </NavLink>
            </div>
        </nav>
    );
};

export default ProfileNavigation;