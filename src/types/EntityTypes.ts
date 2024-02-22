import { GeoCoordinate } from "../Component/GeoCoordinate";

export const entityTypes = {
    WPT: 'wpt',
    LANDING_ZONE: 'landingZone'

} as const;

export interface BaseEntity {
    id: string,
    name: string,
    entityType: EntityType,
    isVisible: boolean,
    note: string;
};

export interface Wpt extends BaseEntity {
    position: GeoCoordinate,
    altitude: number;
};

export interface LandingZone extends BaseEntity {
    endPosition: GeoCoordinate,
    centerPosition: GeoCoordinate,
    // type: string,
    // altitude: number;
}

export type Entity =
    | Wpt
    | LandingZone;


export type EntityType = (typeof entityTypes)[keyof typeof entityTypes]

export const externalMapEntitiesType = {
    SelectedEntity: 'selectedEntity',
    RULER: 'ruler',
    PLANE: 'plane'
} as const;

export type ExternalMapEntitiesType = (typeof externalMapEntitiesType)[keyof typeof externalMapEntitiesType];

export type MapEntityTypes = EntityType | ExternalMapEntitiesType;