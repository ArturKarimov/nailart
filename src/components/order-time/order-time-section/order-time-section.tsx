import React from 'react';
import styles from "./order-time-section.module.scss";
import {IBookSeances} from "../../../interfaces/interfaces";
import OrderTime from "../order-time";
import Loading from "../../loading/loading";

interface IOrderTimeSection {
    seances: IBookSeances[];
    isLoading: boolean;
}

const OrderTimeSection: React.FC<IOrderTimeSection> = ({seances, isLoading}) => {
    return (
        <>
            <section className={styles.wrapper}>
                {isLoading && <Loading />}
                {seances?.map(seance => <OrderTime time={seance.time} datetime={seance.datetime} key={seance.time}/>)}

            </section>

            {!seances.length && <div>Нет свободных мест</div>}
        </>

    );
};

export default OrderTimeSection;