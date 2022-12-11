import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    futureAppointment: [],
    pastAppointment: [],
    selectedAppointment: {},
    fromAppointment: false
}

export const appintmentDataSlice = createSlice({
    name: 'appointmentData',
    initialState,
    reducers: {
        setFutureAppointmentData: (state, action) => {
            state.futureAppointment = action.payload
        },
        setPastAppointmentData: (state, action) => {
            state.pastAppointment = action.payload
        },
        setSelectedAppointment : (state, action) => {
            state.selectedAppointment = action.payload
        },
        setFromAppointment: (state, action) => {
            state.fromAppointment = action.payload
        }
    }
})

export const { setFutureAppointmentData, setPastAppointmentData, setSelectedAppointment, setFromAppointment } = appintmentDataSlice.actions;

export default appintmentDataSlice.reducer;