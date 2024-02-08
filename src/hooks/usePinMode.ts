import { useState } from "react";
import { useMap } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";

import { openEntityDialog } from 'state/reducers/BrowserReducer';
import {
    selectPinMode,
    setActionMode,
    setEntityMode,
    startPinMode,
    stopPinMode
} from 'state/reducers/PinModeReducer';
import { unselectEntity } from 'state/reducers/SelectedEntityReducer';

import { EventTypes } from 'map/events/EventTypes';
import { CURSOR_STYLE, PinModeActions } from 'map/pinModes/PinAction';
import { EntityType, MapEntityTypes, externalMapEntitiesType } from 'map/types/mission/EntityTypes';
import { LngLatLike, MapMouseEvent } from "mapbox-gl";

import { useMapCursor} from './useMapCursor';

import { GeoCoordinate } from 'models/GeoCoordinate';

export const usePinMode = () => {
    const [clickedCoordinate, setClickedCoordinate] = useState<GeoCoordinate>();
    const dispatch = useDispatch();
    const {setMapCursor} = useMapCursor();
    const pinMode = useSelector(selectPinMode);
    const { current: map } = useMap();

    const setPinModeAction = (action: PinModeActions) =>  {
        dispatch(setActionMode(action));
    };

    const enterPinMode = (entity: MapEntityTypes) => {
        setMapCursor(CURSOR_STYLE.CROSSHAIR);
        dispatch(unselectEntity());
        dispatch(startPinMode(entity));
    };

    const enterPinMode = (entity: )
}
