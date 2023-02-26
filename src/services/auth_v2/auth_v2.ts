import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL_V2} from "../../utils/constants";
import {ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse} from "./interface";
import {IMainResponse} from "../../interfaces/interfaces";

export const authV2FormApi = createApi({
    reducerPath: "authFormApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_V2,
        mode: "no-cors"
    }),
    endpoints: (build) => ({
        login: build.mutation<IMainResponse<ILoginResponse>, ILoginRequest>({
            query: (data) => ({
                url: "/auth",
                method: "POST",
                body: data,
                headers: {
                    "Authorization": "Bearer nb5ey85mgf9bpc5mfx4m",
                    "Accept": "application/vnd.api.v2+json"
                }
            })
        }),
        register: build.mutation<IRegisterResponse, IRegisterRequest>({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data
            })
        })
    })
})