import { Position } from "geojson";

export type DialogPropsTypes = {
    DialogProps: LandingZoneProps | WptProps
};
export type TextFieldsTypes = 
{
    label:string,
    id:string,
    value: string | number
};
export type Dialog = {
    id: number,
    properties: LandingZoneProps | WptProps
    dialog: TextFieldsTypes[]
}

interface baseDialogProps {
    id:number,
    type: 'Point' | 'LineString',
    name: string,
    selfCoordinates:Position,
}

export interface LandingZoneProps extends baseDialogProps {
    elevationsArr: number[],
    distancesArr: number[],
    distance: number,
    destCoordinates:Position
}

export interface WptProps extends baseDialogProps {
    PointElevation: number
}


