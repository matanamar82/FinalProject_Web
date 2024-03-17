import { configureStore } from "@reduxjs/toolkit";
import pinModeReducer from '../pinModeSlice/pinModeSlice';

export const Store = configureStore({
    reducer: {
        pinMode: pinModeReducer,
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

