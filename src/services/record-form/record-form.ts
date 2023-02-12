import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../utils/constants";
import {
    IBookServices,
    IBookStaff,
    IBookSeances,
    IMainResponse,
    IBookRecordRequest,
    IBookRecordResponse
} from "../../interfaces/interfaces";

export const recordFormApi = createApi({
    reducerPath: "recordFormApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        getBookStaff: build.query<IMainResponse<IBookStaff[]>, "">({
            query: () => ({
                url: `/book_staff/808329`,
                headers: {
                    "Authorization": "Bearer nb5ey85mgf9bpc5mfx4m",
                    "Accept": "application/vnd.api.v2+json"
                }
            })
        }),
        getBookServices: build.query<IMainResponse<IBookServices>, number>({
            query: (id) => ({
                url: `/book_services/808329?staff_id=${id}`,
                headers: {
                    "Authorization": "Bearer nb5ey85mgf9bpc5mfx4m",
                    "Accept": "application/vnd.api.v2+json"
                }
            })
        }),
        getBookSeances: build.query<IMainResponse<IBookSeances[]>, {id: number, date: string}>({
            query: ({id, date}) => ({
                url: `/book_times/808329/${id}/${date}`,
                headers: {
                    "Authorization": "Bearer nb5ey85mgf9bpc5mfx4m",
                    "Accept": "application/vnd.api.v2+json"
                }
            })
        }),
        createBookRecord: build.mutation<IMainResponse<IBookRecordResponse>, IBookRecordRequest>({
            query: (data) => ({
                url: "/book_record/808329",
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