import { Position } from "geojson";

export type DialogPropsTypes = {
    DialogProps: FlightLegProps | WptProps
};
export type TextFieldsTypes = 
{
    label:string,
    id:string,
    value: string | number
};
export type Dialog = {
    id: number,
    properties: FlightLegProps | WptProps
    dialog: TextFieldsTypes[]
}

interface baseDialogProps {
    id:number,
    type: 'Point' | 'LineString',
    name: string,
    selfCoordinates:Position,
}

export interface FlightLegProps extends baseDialogProps {
    elevationsArr: number[],
    distancesArr: number[],
    distance: number,
    destCoordinates:Position,
    maxElevation: number | string,
    minElevation: number | string
}

export interface WptProps extends baseDialogProps {
    PointElevation: number
}


