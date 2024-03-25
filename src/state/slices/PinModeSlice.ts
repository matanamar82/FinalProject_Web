import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Feature } from "geojson";

interface pinModeState {
    option: string;
    numberOfClicks: number;
    points: Feature[]
}

const initialState: pinModeState = {
    option: '',
    numberOfClicks: 0,
    points: []
};

const pinModeSlice = createSlice({
    name: "pinMode",
    initialState,

    // actions
    reducers: {
        LandingZone: (state) => {
            state.option = 'LandingZone'
            state.numberOfClicks = 2
            state.points = []
        },
        Wpt: (state) => {
            state.option = 'Wpt'
            state.numberOfClicks = 1
            state.points = []
        },
        Init: (state) => {
            state.option = ''
            state.numberOfClicks = 0
            state.points = []
        },
        DecreaseClicks: (state, action: PayloadAction<pinModeState>) => {
            state.option = action.payload.option
            state.numberOfClicks = action.payload.numberOfClicks - 1
            state.points = action.payload.points
        }
    }
})

export const { LandingZone, Wpt, Init, DecreaseClicks } = pinModeSlice.actions;

export default pinModeSlice.reducer;

