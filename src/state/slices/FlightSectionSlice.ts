import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type FlightSectionState = {
    FlightSection: number[],
    WitoutGlideControl: number[],
    SafeElevationOf300: number[],
    SafeElevationOf500: number[],
    SafeElevationOf1000: number[],
}

const initialState:FlightSectionState = {
    FlightSection: [],
    WitoutGlideControl: [],
    SafeElevationOf300: [],
    SafeElevationOf500: [],
    SafeElevationOf1000: []
}

const FlightSectioSlice = createSlice({
    name: 'FlightSectioSlice',
    initialState,
    reducers: {
        SetWithoutGlideControl: (state, action:PayloadAction<number[]>) => {
            state.WitoutGlideControl = action.payload
        },
        SetSafeElevationOf300: (state, action:PayloadAction<number[]>) => {
            state.SafeElevationOf300 = action.payload
        },
        SetSafeElevationOf500: (state, action:PayloadAction<number[]>) => {
            state.SafeElevationOf500 = action.payload
        },
        SetSafeElevationOf1000: (state, action:PayloadAction<number[]>) => {
            state.SafeElevationOf1000 = action.payload
        },
    }
})

export const {SetWithoutGlideControl, SetSafeElevationOf300, SetSafeElevationOf500, SetSafeElevationOf1000} = FlightSectioSlice.actions;

export default FlightSectioSlice.reducer