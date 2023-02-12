import React from 'react';
import styles from "./order-time.module.scss";
import {useAppDispatch} from "../../hooks/redux";
import {setTime} from "../../services/record-form/record-form-slice";
import {emitter} from "../../services/event-emitter/EventEmitter";

interface IOrderTime {
    time: string;
    datetime: string;
}

const OrderTime: React.FC<IOrderTime> = ({time, datetime}) => {
    const dispatch = useAppDispatch();

    const selectTime = () => {
        dispatch(setTime(datetime))
        emitter.emit("getClientFormInfo")
    }

    return (
        <div className={styles.wrapper} onClick={selectTime}>
            {time}
        </div>
    );
};

export default OrderTime;