import { useCallback } from "react";
import { useMap } from "react-map-gl";
import { CURSOR_STYLE } from "../Component/PinModes/PinAction";

export const useMapCursor = () => {
    const {current: map} = useMap();
    const mapCursor = map?.getCanvas().style.cursor as CURSOR_STYLE;
    const setMapCursor = useCallback(
        (cursor: CURSOR_STYLE) => {
            if(map) {
                map.getCanvas().style.cursor = cursor;
            }
        },
        [map]
    );

    return {setMapCursor, mapCursor};
}