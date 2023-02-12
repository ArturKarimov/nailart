import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../utils/constants";
import {ILoginRequest, ILoginResponse} from "./interface";
import {IMainResponse} from "../../interfaces/interfaces";

export const authFormApi = createApi({
    reducerPath: "authFormApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
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
        })
    })
})