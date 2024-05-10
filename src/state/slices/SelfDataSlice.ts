import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { SelfData } from "../../types/Dto"

type SelfDataTypes = {
    selfData: SelfData
}

const initialState: SelfDataTypes = {
    selfData: {
        Position: { Latitude: 0, Longitude: 0 },
        CallSign: "Samson",
        TrueAirSpeed: 100,
        RateOfTurn: 0,
        RollAngle: 30,
        AltitudeRate: 0,
        WindSpeed: 5,
        WindAzimuth: 90,
        TrueTrack: 360,
        TrueHeading: 0,
        Altitude: 0,
        PitchAngle: 0,
        GroundSpeed: 100,
    }
}

const SelfDataSlice = createSlice({
    name: 'SelfData',
    initialState,
    reducers: {
        setSelfData: (state, action: PayloadAction<SelfData>) => {
            state.selfData = action.payload
        }
    }
})

export const { setSelfData } = SelfDataSlice.actions;

export default SelfDataSlice.reducer