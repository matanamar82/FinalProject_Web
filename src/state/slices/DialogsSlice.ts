import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LandingZoneDialogPropsType } from '../../types/LandingZoneDialogTypes';
import { WptDialogPropsType } from '../../types/WptDialogPropsType';

interface DialogType {
    Dialog: LandingZoneDialogPropsType | WptDialogPropsType
}
interface DialogsState {
    Dialogs: DialogType[]

}

const initialState:DialogsState = {
    Dialogs: []
}

const DialogsSlice = createSlice({
    name: 'Dialogs',
    initialState, 

    reducers: {
        AddDialog: (state, action: PayloadAction<DialogType>) => {
            state.Dialogs.push(action.payload)
        }
    }
})

export const {AddDialog} = DialogsSlice.actions;

export default DialogsSlice.reducer