import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TextFieldsTypes } from '../../types/DialogTypes';

interface DialogType {
    Dialog: TextFieldsTypes[]
}
interface DialogsState {
    Dialogs: DialogType[],
    isOpen: boolean

}

const initialState:DialogsState = {
    Dialogs: [],
    isOpen: false
}

const DialogsSlice = createSlice({
    name: 'Dialogs',
    initialState, 

    reducers: {
        AddDialog: (state, action: PayloadAction<DialogType>) => {
            state.Dialogs.push(action.payload)
        },
        OpenDialog: (state) => {
            state.isOpen = true
        },
        CloseDialog: (state) => {
            state.isOpen = false
        }
    }
})

export const {AddDialog, OpenDialog, CloseDialog} = DialogsSlice.actions;

export default DialogsSlice.reducer