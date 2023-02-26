import {ILogin} from "../../pages/login/login";
import {IRegister} from "../../pages/register/register";

export interface ILoginResponse {
    id: number;
    user_token: string;
    name: string;
    phone: string;
    login: string;
    email: string;
    avatar: string;
    is_approved: boolean;
}

export type ILoginRequest = ILogin;

export interface IRegisterResponse {
    tokenType: string;
    accessToken: string;
    refreshToken: string;
}

export type IRegisterRequest = IRegister;