import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false
}

export const AuthReducer = createSlice({
    name: "counter",
    initialState,
    reducers: {
        activatedAccount: (state)=>{
            state.active = true
        },
        deactivatedAccount: (state)=>{
            state.active = false
        }
    }
})

export const { activatedAccount, deactivatedAccount } = AuthReducer.actions
export default AuthReducer.reducer