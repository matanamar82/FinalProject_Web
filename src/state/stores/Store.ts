import { configureStore } from "@reduxjs/toolkit";
import pinModeReducer from '../slices/PinModeSlice';
import EntitySlice from "../slices/EntitySlice";

export const Store = configureStore({
    reducer: {
        pinMode: pinModeReducer,
        Entity: EntitySlice
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

