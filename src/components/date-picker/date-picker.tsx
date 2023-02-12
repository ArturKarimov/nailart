import React from 'react';
import styles from "./date-picker.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import {format} from "date-fns";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setDate} from "../../services/record-form/record-form-slice";
import {emitter} from "../../services/event-emitter/EventEmitter";

interface ICustomInput {
    value: Date;
    onClick: () => void;
}

const CustomDatePicker = () => {
    const dispatch = useAppDispatch();
    const { date, staff } = useAppSelector(state => state.recordFormReducer.form)
    const CustomInput = React.forwardRef(({value, onClick}: Partial<ICustomInput>, ref: any) => {
            const result = format(new Date(value || Date.now()), "dd MMMM yyyy", {
                locale: ru
            })
            return (
                <div className={styles.customInput} onClick={onClick} ref={ref}>
                    {result}
                </div>
            )
        }
    )

    const onChange = async (selectedDate: Date) => {
        await dispatch(setDate(+new Date(selectedDate || "")))
        await emitter.emit("getBookSeances", {id: staff?.id, date: format(selectedDate, 'yyyy-MM-dd')})
    }

    return (
        <DatePicker
            locale={ru}
            selected={date}
            onChange={onChange}
            customInput={<CustomInput/>}
        />
    );
};

export default CustomDatePicker;