import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IClientInfo} from "../../components/client-info/client-info";
import {RecordFormStage} from "../../pages/order/order";

interface IRecordForm {
    staff?: { id: number, name: string };
    services: { id: number, title: string }[];
    date?: any;
    time?: string;
    clientInfo: IClientInfo;
}

interface IRecordFormState {
    form: IRecordForm;
}

const initialState: IRecordFormState = {
    form: {
        services: [],
        clientInfo: {fullname: "", phone: "", email: "", comment: ""}
    }
}

export const recordFormSlice = createSlice({
    name: "recordFormSlice",
    initialState,
    reducers: {
        setStaff: (state, action: PayloadAction<{ id: number, name: string }>) => {
            state.form.staff = action.payload;
        },
        addService: (state, action: PayloadAction<{ id: number, title: string }>) => {
            state.form.services = [...state.form.services, action.payload]
        },
        removeService: (state, action: PayloadAction<number>) => {
            state.form.services = state.form.services.filter(service => service.id !== action.payload)
        },
        setDate: (state, action: PayloadAction<number>) => {
            state.form.date = action.payload;
        },
        setTime: (state, action: PayloadAction<string>) => {
            state.form.time = action.payload;
        },
        setClientInfo: (state, action: PayloadAction<IClientInfo>) => {
            state.form.clientInfo = action.payload
        },
        resetState: (state) => {
            state.form = initialState.form
        }
    }
})

export const {
    setStaff,
    addService,
    removeService,
    setDate,
    setTime,
    setClientInfo,
    resetState
} = recordFormSlice.actions;
export default recordFormSlice.reducer;