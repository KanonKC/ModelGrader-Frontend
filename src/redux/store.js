import { configureStore } from "@reduxjs/toolkit";
import confirmationReducer from "./confirmation.reducer";

export const store = configureStore({
    reducer: {
        confirmation: confirmationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})