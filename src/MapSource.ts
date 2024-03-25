import { AnyLayer } from "react-map-gl";
import { MapEntityTypes, entityTypes } from "./types/EntityTypes";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { landingZoneLayer } from "./layers/LandingZoneLayer";
import { WptPointsLayer } from "./layers/WptLayer";

export interface Source {
    id: MapEntityTypes;
    layers: AnyLayer;
    source?: Feature<Geometry, GeoJsonProperties>[];
}

const getEntity = (entityType:string, mission?: Feature<Geometry, GeoJsonProperties>[]): Source[] => {
    switch(entityType) {
        case entityTypes.LANDING_ZONE:
            return [
                {
                    source: mission,
                    id: entityTypes.LANDING_ZONE,
                    layers: landingZoneLayer
                }
            ];
        case entityTypes.WPT:
            return [
                {
                    source: mission,
                    id: entityTypes.WPT,
                    layers: WptPointsLayer
                }
            ];
        default:
            return [
                {
                    source: mission,
                    id: entityTypes.WPT,
                    layers: WptPointsLayer
                }
            ]
    }
}
export const entitySources = (entityType:string, mission?: Feature<Geometry, GeoJsonProperties>[]): Source[] => {
    console.log(mission)
    return getEntity(entityType, mission)
    
};

const sources = (
    mission?: Feature<Geometry, GeoJsonProperties>[]
) => {
    return [
        ...entitySources(entityTypes.LANDING_ZONE, mission), ...entitySources(entityTypes.WPT, mission)
    ]
}

export { sources }

