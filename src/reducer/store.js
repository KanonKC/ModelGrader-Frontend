import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import CounterReducer from './CounterReducer'

export const store = configureStore({
    reducer: {
        counter: CounterReducer,
        login: AuthReducer
    }
})