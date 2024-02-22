import { useDispatch } from "react-redux";
import { usePinMode } from "./usePinMode";
import { GeoCoordinate } from "../Component/GeoCoordinate";
import { Entity, EntityType } from "../types/EntityTypes";
import { addEntity } from "../state/reducers/SandBoxReducer";
import { PinModeActions } from "../Component/PinModes/PinAction";
import store from "../state/store";
import { defaultEntity } from "../DefaultEntity";


export const useMapDraw = () => {
    const dispatch = useDispatch();
    const { pinMode, exitPinMode, setPinModeAction } = usePinMode();

    const addNewEntity = (entityType: EntityType, coordinate: GeoCoordinate): void => {
        const newEntity: Entity = defaultEntity(coordinate)[entityType];
        dispatch(addEntity(newEntity));
    };

    const draw = (entityType: EntityType, coordinate: GeoCoordinate): void => {
        switch (pinMode.action) {
            case PinModeActions.CREATE:
                addNewEntity(entityType, coordinate);
                setPinModeAction(PinModeActions.INSERT);
                break;
            default:
                throw Error(`can't draw with '${pinMode.action}' pin mode`);
        };
    };
    return { draw };
}

