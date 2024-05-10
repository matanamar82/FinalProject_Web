import { GeolibCoordinate } from "./GeoCoordinate";

export const entityTypes = {
    WPT: 'wpt',
    FlightLeg: 'FlightLeg'

} as const;

export interface BaseEntity {
    id: string,
    name: string,
    entityType: EntityType,
    isVisible: boolean,
    note: string;
};

export interface Wpt extends BaseEntity {
    position: GeolibCoordinate,
    altitude: number;
};

export interface FlightLeg extends BaseEntity {
    endPosition: GeolibCoordinate,
    centerPosition: GeolibCoordinate,
}

export type Entity =
    | Wpt
    | FlightLeg;


export type EntityType = (typeof entityTypes)[keyof typeof entityTypes]

export const externalMapEntitiesType = {
    SelectedEntity: 'selectedEntity',
    RULER: 'ruler',
    PLANE: 'plane'
} as const;

export type ExternalMapEntitiesType = (typeof externalMapEntitiesType)[keyof typeof externalMapEntitiesType];

export type MapEntityTypes = EntityType | ExternalMapEntitiesType;