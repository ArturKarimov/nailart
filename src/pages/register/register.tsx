import React from 'react';
import styles from './register.module.scss';
import BaseInput from "../../components/base-input/base-input";
import {useForm} from "../../hooks/useForm";
import BaseButton from "../../components/base-button/base-button";
import {Cookie} from "../../utils/cookie";
import {authV2FormApi} from "../../services/auth_v2/auth_v2";

export interface IRegister {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

const Register = () => {
    const [registerHandler, { data }] = authV2FormApi.useRegisterMutation()
    const {values, setValues} = useForm<IRegister>({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const register = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerHandler(values)
    }

    React.useEffect(() => {
        if (data?.accessToken) {
            Cookie.setCookie("accessToken", data?.accessToken)
            Cookie.setCookie("refreshToken", data?.refreshToken)
        }
    }, [data?.accessToken])

    return (
        <section className={styles.wrapper}>
            <form onSubmit={register}>
                <h2>Регистрация новых сотрудников</h2>
                <BaseInput
                    name="firstname"
                    label="Имя"
                    placeholder="Введите имя"
                    value={values}
                    setValue={setValues}
                />
                <BaseInput
                    name="lastname"
                    label="Фамилия"
                    placeholder="Введите фаиилию"
                    value={values}
                    setValue={setValues}
                />
                <BaseInput
                    name="email"
                    label="Электронная почта"
                    placeholder="Введите e-mail"
                    value={values}
                    setValue={setValues}
                />
                <BaseInput
                    name="password"
                    label="Пароль"
                    type="password"
                    placeholder="Введите пароль"
                    value={values}
                    setValue={setValues}
                />
                <BaseButton name="Зарегистрироваться" type="submit" />
            </form>
        </section>
    );
};

export default Register;