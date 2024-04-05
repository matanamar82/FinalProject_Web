import { Position } from "geojson";

export type FlightLegTextFieldsTypes = 
{
    label:string,
    id:string,
    value: string | number
};

export type FlightLegDialogPropsType = {
    id: string,
    elevationsArr: number[],
    distancesArr: number[],
    distance: number,
    selfCoordinates:Position,
    destCoordinates:Position
}