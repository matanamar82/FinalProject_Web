import { useDispatch } from "react-redux";
import { useMapDraw } from "./useMapDraw";
import { usePinMode } from "./usePinMode";
import { useCallback, useState } from "react";
import { CURSOR_STYLE, PinModeActions } from "../Component/PinModes/PinAction";
import { LngLatLike, MapGeoJSONFeature, MapLayerMouseEvent, MapLayerTouchEvent, MapMouseEvent, useMap } from "react-map-gl";
import { Entity, EntityType, MapEntityTypes, externalMapEntitiesType } from "../types/EntityTypes";
import { Layer } from "mapbox-gl";
import { modifyEntity } from "../state/reducers/SandBoxReducer";
import { useMapCursor } from "./useMapCursor";
import { useMapUtils } from "./useMapUtils";

export interface AttachedLineStringEntity {
    id: string;
    index: number;
    expand: boolean;
}

export const useMapEventHandler = () => {
    // const { getFeaturesAroundPoint} = useMapUtils();
    const { setMapCursor, mapCursor } = useMapCursor();
    const { pinMode } = usePinMode();
    const { draw } = useMapDraw();
    const dispatch = useDispatch();
    const [previousCursor, setPreviousCursor] = useState<CURSOR_STYLE>(CURSOR_STYLE.DEFAULT);
    const { current: map } = useMap();

    // const selectMapEntity = (point: mapboxgl.Point): boolean => {
    //     // const closeFeatures = getFeaturesAroundPoint(point);
    //     if (!closeFeatures.length) {
    //         return false;
    //     }
    //     return true;
    // };

    const onMapClicked = useCallback(
        (e: MapMouseEvent) => {
            const currentPinMode = pinMode.action;
            if (currentPinMode === PinModeActions.MODIFY || currentPinMode === PinModeActions.BLOCK)
                return;
            if (currentPinMode !== PinModeActions.NONE) {
                const coordinate: LngLatLike = [e.lngLat.lng, e.lngLat.lat];
                draw(pinMode.entity as EntityType, {
                    longitude: coordinate[0],
                    latitude: coordinate[1]
                });
                return;
            }
            // const closeFeatures = getFeaturesAroundPoint()
            //selectMapEntity(e.point);
        },
        [pinMode]
    );

    return {
        onMapClicked,
        //selectMapEntity,
    };
}