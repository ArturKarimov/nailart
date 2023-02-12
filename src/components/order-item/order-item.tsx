import React from 'react';
import styles from './order-item.module.scss';
import {useAppSelector} from "../../hooks/redux";

interface IOrderItem {
    id: number;
    color: string;
    avatar: string;
    title: string;
    comment?: string;
    information?: string;
    price?: number;
    width?: string;
    isServices?: boolean;
    onClick?: () => void;
    actions?: React.ReactNode[];
}

const OrderItem: React.FC<IOrderItem> = (
    {color: background,
        id,
        avatar,
        title,
        comment,
        price,
        information,
        width = "80%",
        onClick,
        isServices,
        actions
    }) => {
    const { services } = useAppSelector(state => state.recordFormReducer.form)

    const getStyles = () => {
        return {
            background,
            width,
            cursor: !isServices ? "pointer" : "default",
            opacity: isServices && services.find(s => s.id === id) ? 0.7 : 1,
        }
    }

    return (
        <div
            className={styles.wrapper}
            style={getStyles()}
            onClick={!isServices ? onClick : () => null}
        >
            <div className={styles.innerWrapper}>
                <div className={styles.avatar}>
                    <img src={avatar} alt="avatar"/>
                </div>
                <div className={styles.masterInfo}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.comment}>{comment} {information && `/ ${information}`}</div>
                </div>
            </div>
            {
                actions && actions?.length > 0 &&
            <div className={styles.actions}>
                {actions?.map(action => action)}
            </div>
            }

        </div>
    );
};

export default OrderItem;