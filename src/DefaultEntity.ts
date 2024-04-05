import { GeoCoordinate } from "./Component/GeoCoordinate";
import { Entity, EntityType, entityTypes } from "./types/EntityTypes";

export const defaultEntity = (coordinate: GeoCoordinate): { [key in EntityType]: Entity } => {
    return {
        FlightLeg: {
            name: 'LZ_001',
            entityType: entityTypes.FlightLeg,
            position: coordinate,
            endPosition: coordinate,
            centerPosition: coordinate,
            altitude: 0,
            id: Math.round(Math.random() * 100000000).toString(),
            isVisible: true,
            note: ''

        },
        wpt: {
            name: 'WPT_001',
            entityType: entityTypes.WPT,
            position: coordinate,
            altitude: 0,
            id: Math.round(Math.random() * 100000000).toString(),
            isVisible: true,
            note: '',
        }
    }
}