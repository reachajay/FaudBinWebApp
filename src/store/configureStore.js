import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './reducers/SelectedData';
import userReducer from './reducers/UserData';
import appointmentReducer from './reducers/AppointmentData';

export const store = configureStore({
    reducer: {
        selectedData: dataReducer,
        userData: userReducer,
        appointmentData: appointmentReducer,
    }
})