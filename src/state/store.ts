import { configureStore } from "@reduxjs/toolkit";
import PinModeReducer from "./reducers/PinModeReducer";
import SandBoxReducer from "./reducers/SandBoxReducer";

const store = configureStore({
    reducer: {
        pinMode: PinModeReducer,
        sandBox: SandBoxReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
