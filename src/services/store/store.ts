import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {recordFormApi} from "../record-form/record-form";
import recordFormReducer from "../record-form/record-form-slice";
import userReducer from "../user/user-slice";
import {authFormApi} from "../auth/auth";
import {profileStaffApi} from "../profile/profile-staff/profile-staff";
import {profileServicesApi} from "../profile/profile-services/profile-services";
import {authV2FormApi} from "../auth_v2/auth_v2";

const rootReducer = combineReducers({
    recordFormReducer,
    userReducer,
    [recordFormApi.reducerPath]: recordFormApi.reducer,
    [authFormApi.reducerPath]: authFormApi.reducer,
    [authV2FormApi.reducerPath]: authV2FormApi.reducer,
    [profileStaffApi.reducerPath]: profileStaffApi.reducer,
    [profileServicesApi.reducerPath]: profileServicesApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([
                recordFormApi.middleware,
                authFormApi.middleware,
                authV2FormApi.middleware,
                profileStaffApi.middleware,
                profileServicesApi.middleware
            ])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]