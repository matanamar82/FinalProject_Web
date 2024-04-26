import store from "../../state/store";

import { setActionMode, setEntityMode, startPinMode, stopPinMode } from "../../state/reducers/PinModeReducer";
import { MapRef } from "react-map-gl";
import { CURSOR_STYLE, PinModeActions } from "./PinAction";
import { EntityType, MapEntityTypes, externalMapEntitiesType } from "../../types/EntityTypes";

const enterPinMode = (map: MapRef | undefined, entity: MapEntityTypes) => {
    // console.log(entity)
    if (map !== undefined) map.getCanvas().style.cursor = CURSOR_STYLE.CROSSHAIR;
    store.dispatch(startPinMode(entity));
};

const enterInsertMode = (map: MapRef | undefined, entity?: EntityType) => {
    if (map !== undefined) map.getCanvas().style.cursor = CURSOR_STYLE.CROSSHAIR;
    store.dispatch(
        setEntityMode({
            action: PinModeActions.INSERT,
            entity: entity ?? store.getState().pinMode.entity
        })
    );
};

const startModifyPinMode = (map: MapRef | undefined) => {
    if (map !== undefined) map.getCanvas().style.cursor = CURSOR_STYLE.CROSSHAIR;
    store.dispatch(setActionMode(PinModeActions.MODIFY));
};

const defaultPinMode = (map: MapRef | undefined) => {
    if (map !== undefined) map.getCanvas().style.cursor = CURSOR_STYLE.DEFAULT;
    store.dispatch(stopPinMode());
};

const blockPinMode = (map: MapRef | undefined) => {
    if (map !== undefined) map.getCanvas().style.cursor = CURSOR_STYLE.BLOCK;
    store.dispatch(setActionMode(PinModeActions.BLOCK));
};

const exitPinMode = (map: MapRef | undefined) => {
    if (store.getState().pinMode.entity as MapEntityTypes === externalMapEntitiesType.RULER) {
        store.dispatch(stopPinMode());
    }
    else {
        store.dispatch(stopPinMode());
    }
    if (map !== undefined) map.getCanvas().style.cursor = CURSOR_STYLE.DEFAULT;
};

export {
    enterPinMode,
    enterInsertMode,
    exitPinMode,
    startModifyPinMode,
    defaultPinMode,
    blockPinMode
};

