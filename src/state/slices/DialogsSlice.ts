import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Dialog } from '../../types/DialogTypes';
import { MapboxGeoJSONFeature } from 'mapbox-gl';

type DialogsState = {
    Dialogs: Dialog[],
    isOpen: boolean,
    CurrentDialog: Dialog | undefined

}

const initialState:DialogsState = {
    Dialogs: [],
    isOpen: false,
    CurrentDialog: undefined
}

const DialogsSlice = createSlice({
    name: 'Dialogs',
    initialState, 

    reducers: {
        AddDialog: (state, action: PayloadAction<Dialog>) => {
            state.Dialogs.push(action.payload) 
            state.isOpen = true;
            state.CurrentDialog = action.payload;
        },
        OpenDialog: (state, action: PayloadAction<MapboxGeoJSONFeature>) => {
            state.isOpen = true;
            state.CurrentDialog = state.Dialogs[
                state.Dialogs.findIndex(Dialog => 
                    (Dialog.properties.id == action.payload.id) && (Dialog.properties.type == action.payload.geometry.type))
            ];
        },
        CloseDialog: (state) => {
            state.isOpen = false;
            state.CurrentDialog = undefined;
        }
    }
})

export const {AddDialog, OpenDialog, CloseDialog} = DialogsSlice.actions;

export default DialogsSlice.reducer