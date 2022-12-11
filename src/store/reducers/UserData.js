import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    nationalId: '',
    token: '',
    isLoggedIn: false,
    userProfile:{},
    otherData:{}
};

export const userDataSlice = createSlice({
    name: 'selectedData',
    initialState,
    reducers: {
        setNationalId: (state, action) => {
            state.nationalId = action.payload
        },
        setToken : (state, action) => {
            state.token = action.payload
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload
        },
        setOtherData: (state, action) => {
            state.otherData = action.payload
        }
    }
})

export const { setNationalId, setToken, setLoggedIn, setUserProfile, setOtherData } = userDataSlice.actions;

export default userDataSlice.reducer;