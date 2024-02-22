
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Entity, EntityType } from '../../types/EntityTypes';
import { GeoCoordinate } from '../../Component/GeoCoordinate';

export interface insertCoordinateProps {
    id: string;
    entityType: EntityType;
    coordinate: GeoCoordinate;
}

export const sandboxSlice = createSlice({
    name: 'sandbox',
    initialState: [] as Entity[],
    reducers: {
        modifyEntity: (state, action: PayloadAction<Entity>) => {
            const entityIndex = state.findIndex(ent => ent.id === action.payload.id);
            if (entityIndex === -1)
                state.push(action.payload)
            else
                state.splice(entityIndex, 1, action.payload);
        },
        deleteEntity: (state, action: PayloadAction<string>) => {
            const entityIndex = state.findIndex(ent => ent.id === action.payload);

            if (entityIndex === -1)
                throw Error(`Unable to delete entity. Id ${action.payload} not found`);
            state.splice(entityIndex, 1);
        },
        addEntity: (state, action: PayloadAction<Entity>) => {
            state.push(action.payload);
        },
    }
});

export const { modifyEntity, addEntity, deleteEntity } = sandboxSlice.actions;
export const selectSandboxEntities = (state: RootState) => state.sandBox;

export default sandboxSlice.reducer;