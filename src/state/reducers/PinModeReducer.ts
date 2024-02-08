import {PinAction, PinModeActions} from 'map/pinModes/PinAction';
import {PinMode} from 'map/pinModes/PinMode';
import { MapEntityTypes} from 'map/types/mission/EntityTypes';

import { RootState } from '../../app/store';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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

export const { setEntityMode, setActionMode, stopPinMode, startPinMode} = pinModeSlice.actions;
export const selectPinMode = (state: RootState) => state.pinMode;

export default pinModeSlice.reducer;