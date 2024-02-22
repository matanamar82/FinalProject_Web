import { useState } from "react";
import { LngLatLike, MapMouseEvent, useMap } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { GeoCoordinate } from "../Component/GeoCoordinate";
import { selectPinMode, setActionMode, setEntityMode, startPinMode, stopPinMode } from "../state/reducers/PinModeReducer";
import { CURSOR_STYLE, PinModeActions } from "../Component/PinModes/PinAction";
import { EntityType, MapEntityTypes, externalMapEntitiesType } from "../types/EntityTypes";
import { useMapCursor } from "./useMapCursor";
import { eventTypes } from "../types/EventTypes"


export const usePinMode = () => {
    const [clickedCoordinate, setClickedCoordinate] = useState<GeoCoordinate>();
    const dispatch = useDispatch();
    const { setMapCursor } = useMapCursor();
    const pinMode = useSelector(selectPinMode);
    const { current: map } = useMap();

    const setPinModeAction = (action: PinModeActions) => {
        dispatch(setActionMode(action));
    };

    const enterPinMode = (entity: MapEntityTypes) => {
        setMapCursor(CURSOR_STYLE.CROSSHAIR);
        dispatch(startPinMode(entity));
    };

    const startModifyPinMode = () => {
        setMapCursor(CURSOR_STYLE.CROSSHAIR);
        setPinModeAction(PinModeActions.BLOCK);
    };

    const defaultPinMode = () => {
        setMapCursor(CURSOR_STYLE.DEFAULT);
        dispatch(stopPinMode());
    };

    const blockPinMode = () => {
        setMapCursor(CURSOR_STYLE.BLOCK);
        setPinModeAction(PinModeActions.BLOCK);
    };

    const enterInsertMode = (entity?: EntityType) => {
        setMapCursor(CURSOR_STYLE.CROSSHAIR);
        dispatch(
            setEntityMode({
                action: PinModeActions.INSERT,
                entity: entity ?? pinMode.entity
            })
        );
    };
    const exitPinMode = () => {
        if ((pinMode.entity as MapEntityTypes) === externalMapEntitiesType.RULER) {
            dispatch(stopPinMode());
        }
        else {
            // dispatch(openEntityDialog(pinMode.entity as EntityType));
            dispatch(stopPinMode());
        }
        setMapCursor(CURSOR_STYLE.DEFAULT);
    };

    const startListenerForUserPin = () => {
        startModifyPinMode();
        map?.once(eventTypes.CLICK, getUserPinnedCoordinate);
    };

    const getUserPinnedCoordinate = (event: MapMouseEvent) => {
        const coordinate: LngLatLike = [event.lngLat.lng, event.lngLat.lat];
        setClickedCoordinate({
            longitude: coordinate[0],
            latitude: coordinate[1]
        });

        blockPinMode();
    };

    return {
        enterPinMode,
        startModifyPinMode,
        defaultPinMode,
        blockPinMode,
        exitPinMode,
        setPinModeAction,
        enterInsertMode,
        startListenerForUserPin,
        clickedCoordinate,
        pinMode
    };
};
