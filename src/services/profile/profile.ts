import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../utils/constants";
import {IMainResponse} from "../../interfaces/interfaces";
import {IStaffRequest, IStaffResponse} from "./interface";
import {Cookie} from "../../utils/cookie";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        addStaff: build.mutation<IMainResponse<IStaffResponse>, IStaffRequest>({
            query: (data) => ({
                url: "/staff/808329",
                method: "POST",
                body: data,
                headers: {
                    "Authorization": `Bearer nb5ey85mgf9bpc5mfx4m, User ${Cookie.getCookie("token")}`,
                    "Accept": "application/vnd.api.v2+json"
                }
            })
        }),
        updateStaff: build.mutation<IMainResponse<IStaffResponse>, {id: string, data: IStaffRequest}>({
            query: ({id, data}) => ({
                url: `/staff/808329/${id}`,
                method: "PUT",
                body: data,
                headers: {
                    "Authorization": `Bearer nb5ey85mgf9bpc5mfx4m, User ${Cookie.getCookie("token")}`,
                    "Accept": "application/vnd.api.v2+json"
                }
            })
        }),
        deleteStaff: build.mutation<IMainResponse<IStaffResponse>, number>({
            query: (id) => ({
                url: `/staff/808329/${id}`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer nb5ey85mgf9bpc5mfx4m, User ${Cookie.getCookie("token")}`,
                    "Accept": "application/vnd.api.v2+json"
                }
            })
        }),
        getStaff: build.query<IMainResponse<IStaffResponse>, string>({
            query: (id) => ({
                url: `/staff/808329/${id}`,
                headers: {
                    "Authorization": `Bearer nb5ey85mgf9bpc5mfx4m, User ${Cookie.getCookie("token")}`,
                    "Accept": "application/vnd.api.v2+json"
                }
            })
        })
    })
})