import React from 'react';
import styles from "./profile.module.scss";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import ProfileRoutes from "../../components/profile-routes/profile-routes";

const Profile = () => {
    return (
        <section className={styles.wrapper}>
            <ProfileNavigation />
            <ProfileRoutes />
        </section>

    );
};

export default Profile;