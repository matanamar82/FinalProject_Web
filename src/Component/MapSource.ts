import { AnyLayer } from "react-map-gl";
import { MapEntityTypes, entityTypes } from "../types/EntityTypes";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { FlightLegLayer } from "../layers/FlightLegLayer";
import { WptPointsLayer } from "../layers/WptLayer";

export interface Source {
    id: MapEntityTypes;
    layers: AnyLayer;
    source?: Feature<Geometry, GeoJsonProperties>[];
}

const getEntity = (entityType: string, mission?: Feature<Geometry, GeoJsonProperties>[]): Source[] => {
    switch (entityType) {
        case entityTypes.FlightLeg:
            return [
                {
                    id: entityTypes.FlightLeg,
                    layers: FlightLegLayer,
                    source: mission
                }
            ];
        case entityTypes.WPT:
            return [
                {
                    id: entityTypes.WPT,
                    layers: WptPointsLayer,
                    source: mission
                }
            ];
        default:
            return [
                {
                    id: entityTypes.WPT,
                    layers: WptPointsLayer,
                    source: mission
                }
            ]
    }
}
export const entitySources = (entityType: string, mission?: Feature<Geometry, GeoJsonProperties>[]): Source[] => {
    // console.log(mission)
    return getEntity(entityType, mission)

};

const sources = (
    mission?: Feature<Geometry, GeoJsonProperties>[]
) => {
    return [
        ...entitySources(entityTypes.FlightLeg, mission), ...entitySources(entityTypes.WPT, mission)
    ]
}

export { sources }

