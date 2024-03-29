import { Position } from "geojson";

export type LandingZoneTextFieldsTypes = 
{
    label:string,
    id:string,
    value: string | number
};

export type LandingZoneDialogPropsType = {
    id: string,
    elevationsArr: number[],
    distancesArr: number[],
    distance: number,
    selfCoordinates:Position,
    destCoordinates:Position
}