import React from 'react';
import styles from './login.module.scss';
import BaseInput from "../../components/base-input/base-input";
import {useForm} from "../../hooks/useForm";
import BaseButton from "../../components/base-button/base-button";
import {authFormApi} from "../../services/auth/auth";
import {useAppDispatch} from "../../hooks/redux";
import {setIsAuth, setUserInfo} from "../../services/user/user-slice";
import {Cookie} from "../../utils/cookie";

export interface ILogin {
    login: string;
    password: string;
}

const Login = () => {
    const [loginHandler, { data }] = authFormApi.useLoginMutation()
    const dispatch = useAppDispatch();
    const {values, setValues} = useForm<ILogin>({
        login: "",
        password: ""
    });

    const login = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginHandler(values)
    }

    React.useEffect(() => {
        if (data?.success) {
            Cookie.setCookie("token", data.data.user_token)
            dispatch(setIsAuth(true))
            dispatch(setUserInfo(data?.data))
        }
    }, [data?.success])

    return (
        <section className={styles.wrapper}>
            <form onSubmit={login}>
                <h2>Вход для сотрудников</h2>
                <BaseInput
                    name="login"
                    label="Имя пользователя"
                    placeholder="Введите имя пользователя"
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
                <BaseButton name="Войти" type="submit" />
            </form>
        </section>
    );
};

export default Login;