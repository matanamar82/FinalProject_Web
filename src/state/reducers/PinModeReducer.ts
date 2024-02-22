
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PinAction, PinModeActions } from '../../Component/PinModes/PinAction';
import { PinMode } from '../../Component/PinModes/PinMode';
import { MapEntityTypes } from '../../types/EntityTypes';
import { RootState } from '../store';

const initialPinMode: PinMode = {
    action: PinModeActions.NONE,
    entity: 'none'
};

export const pinModeSlice = createSlice({
    name: 'pinMode',
    initialState: initialPinMode,
    reducers: {
        setEntityMode: (state, action: PayloadAction<PinMode>) => {
            Object.assign(state, action.payload);
        },
        setActionMode: (state, action: PayloadAction<PinAction>) => {
            state.action = action.payload;
        },
        startPinMode: (state, action: PayloadAction<MapEntityTypes>) => {
            state.action = PinModeActions.CREATE;
            state.entity = action.payload;
        },
        stopPinMode: state => {
            state.action = PinModeActions.NONE;
        }
    }
})

export const { setEntityMode, setActionMode, stopPinMode, startPinMode } = pinModeSlice.actions;
export const selectPinMode = (state: RootState) => state.pinMode;

export default pinModeSlice.reducer;