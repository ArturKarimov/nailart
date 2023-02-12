import React from 'react';
import styles from "./base.input.module.scss";


type IBaseInputValue<T> = {
    [key in keyof T]: T[key]
}

interface IBaseInput<T> {
    name: string;
    label: string;
    placeholder: string;
    type?: "text" | "password";
    value: IBaseInputValue<T>;
    setValue: (value: IBaseInputValue<T>) => void;
}

const BaseInput = <T, >({name, type = "text", label, placeholder, value, setValue}: IBaseInput<T>) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;
        setValue({
            ...value,
            [name]: targetValue
        })
    }
    return (
       <div className={styles.wrapper}>
           <label htmlFor={name} className={styles.label}>{label}</label>
           <input
               type={type}
               className={styles.input}
               value={value[name as keyof IBaseInputValue<T>] as string}
               onChange={handleInputChange}
               placeholder={placeholder}
               name={name}
               id={name}
           />
       </div>
    );
};

export default BaseInput;