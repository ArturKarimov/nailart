import {ILogin} from "../../pages/login/login";

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