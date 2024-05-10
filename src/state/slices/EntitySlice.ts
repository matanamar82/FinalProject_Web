import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Feature } from "geojson";

interface EntityState {
    FlightLegs: Feature[];
    Wpts: Feature[];
    ClickedEntity: Feature | null;
}

const initialState: EntityState = {
    FlightLegs: [],
    Wpts: [],
    ClickedEntity: null,
}

const EntitySlice = createSlice({
    name: 'Entity',
    initialState,
    
    reducers: {
        AddFlightLeg: (state, action:PayloadAction<Feature>) => {
            state.FlightLegs.push(action.payload)
        },
        AddWpt: (state, action:PayloadAction<Feature>) => {
            state.Wpts.push(action.payload)
        },
    }
})

export const { AddFlightLeg, AddWpt } = EntitySlice.actions;

export default EntitySlice.reducer;
