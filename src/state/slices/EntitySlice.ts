import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { Feature } from "geojson";

interface EntityState {
    LandingZones: Feature[];
    Wpts: Feature[];
    ClickedEntity: Feature | null;
}

const initialState: EntityState = {
    LandingZones: [],
    Wpts: [],
    ClickedEntity: null,
    

}

const EntitySlice = createSlice({
    name: 'Entity',
    initialState,
    
    reducers: {
        AddLandingZone: (state, action:PayloadAction<Feature>) => {
            state.LandingZones.push(action.payload)
        },
        AddWpt: (state, action:PayloadAction<Feature>) => {
            state.Wpts.push(action.payload)
        },
    }
})

export const { AddLandingZone, AddWpt } = EntitySlice.actions;

export default EntitySlice.reducer;
