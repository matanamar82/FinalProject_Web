import { MapEntityTypes } from "../../types/EntityTypes";
import { PinAction } from "./PinAction";

export interface PinMode {
    action: PinAction,
    entity: MapEntityTypes | 'none'
}