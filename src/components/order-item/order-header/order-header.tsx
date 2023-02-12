import React from 'react';
import styles from './order-header.module.scss';

interface IOrderHeader {
    color: string;
    avatar: string;
    title: string;
    width?: string;
    actions?: React.ReactNode[];
}

const OrderHeader: React.FC<IOrderHeader> = (
    {color: background, avatar, title, width = "80%", actions}) => {

    const getStyles = () => ({
        background,
        width,
        cursor: actions?.length ? "pointer" : "default"
    })

    return (
        <div className={styles.wrapper} style={getStyles()}>
            <div className={styles.innerWrapper}>
                <div className={styles.avatar}>
                    <img src={avatar} alt="avatar"/>
                </div>
                <div className={styles.masterInfo}>
                    <div className={styles.title}>{title}</div>
                </div>
            </div>
            {actions && actions.map(action => action)}
        </div>
    );
};

export default OrderHeader;