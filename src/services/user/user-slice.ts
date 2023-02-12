import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserInfo} from "./interface";

interface UserState {
    isAuth: boolean;
    user?: IUserInfo;
}

export const initialState: UserState = {
    isAuth: false,
    user: undefined
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<IUserInfo | undefined>) => {
            state.user = action.payload;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        }
    }
})

export const {setUserInfo, setIsAuth} = userSlice.actions;
export default userSlice.reducer;