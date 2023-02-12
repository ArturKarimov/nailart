import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {recordFormApi} from "../record-form/record-form";
import recordFormReducer from "../record-form/record-form-slice";
import userReducer from "../user/user-slice";
import {authFormApi} from "../auth/auth";
import {profileApi} from "../profile/profile";

const rootReducer = combineReducers({
    recordFormReducer,
    userReducer,
    [recordFormApi.reducerPath]: recordFormApi.reducer,
    [authFormApi.reducerPath]: authFormApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([recordFormApi.middleware, authFormApi.middleware, profileApi.middleware])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]