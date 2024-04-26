import { configureStore } from "@reduxjs/toolkit";
import pinModeSlice from '../slices/PinModeSlice';
import EntitySlice from "../slices/EntitySlice";
import DialogsSlice from "../slices/DialogsSlice";
import SelfDataSlice from "../slices/SelfDataSlice";

export const Store = configureStore({
    reducer: {
        pinMode: pinModeSlice,
        Entity: EntitySlice,
        dialogs: DialogsSlice,
        selfData: SelfDataSlice,
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

