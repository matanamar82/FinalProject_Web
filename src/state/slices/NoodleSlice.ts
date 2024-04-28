import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Position } from "geojson"

type SelfDataSourceTypes = {
    coordinates: Position,
    callSign: string,
    trueTrack: number
}
type NoodleTypes = {
    Noodle: Position[],
    Direct: Position[],
    SelfDataSource: SelfDataSourceTypes
}

const initialState:NoodleTypes = {
    Noodle: [],
    Direct: [],
    SelfDataSource: {coordinates: [], callSign: '', trueTrack: 0}
}

const NoodleSlice = createSlice({
    name: 'NoodleSlice',
    initialState,
    reducers: {
        setNoodle: (state, action: PayloadAction<Position[]>) => {
            state.Noodle = action.payload
        },
        setDirect: (state, action: PayloadAction<Position[]>) => {
            state.Direct = action.payload
        },
        setSelfDataSource: (state, action: PayloadAction<SelfDataSourceTypes>) => {
            state.SelfDataSource = action.payload
        },
    }
})

export const {setNoodle, setDirect, setSelfDataSource} = NoodleSlice.actions;

export default NoodleSlice.reducer