import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    selectedDept: {},
    selectedDoctor:{}
};

export const selectedDataSlice = createSlice({
    name: 'selectedData',
    initialState,
    reducers: {
        setDeptData: (state, action) => {
            state.selectedDept = action.payload
        },
        setSelectedDoctor: (state, action) => {
            state.selectedDoctor = action.payload;
        }
    }
})

export const { setDeptData, setSelectedDoctor } = selectedDataSlice.actions;

export default selectedDataSlice.reducer;