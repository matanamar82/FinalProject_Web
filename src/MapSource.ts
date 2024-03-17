import { AnyLayer } from "react-map-gl";
import { MapEntityTypes, entityTypes } from "./types/EntityTypes";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { landingZoneLayer } from "./LandingZone";

export interface Source {
    id: MapEntityTypes;
    layers: AnyLayer;
    source?: Feature<Geometry, GeoJsonProperties>[];
}

export const entitySources = (mission?: Feature<Geometry, GeoJsonProperties>[]): Source[] => {
    return [
        {
            source: mission,
            id: entityTypes.LANDING_ZONE,
            layers: landingZoneLayer
        }
    ]
};

const sources = (
    mission?: Feature<Geometry, GeoJsonProperties>[]
) => {
    return [
        ...entitySources(mission)
    ]
}

export {sources}

