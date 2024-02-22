import { MapMouseEvent, useMap } from "react-map-gl"
import { useMapEventHandler } from "./useMapEventHandler"
import { EffectCallback, useCallback, useEffect } from "react"
import { EventTypes, eventTypes } from "../types/EventTypes"
import { EventData } from "mapbox-gl"

export const useMapEventListener = () => {
    const {current: map} = useMap()
    const {onMapClicked} = useMapEventHandler()
    const handleMapEvent = useCallback(
        (mouseEvent: EventTypes, callback: (ev: MapMouseEvent & EventData) => void): EffectCallback => 
            () => {
                if (map) {
                    map.on(mouseEvent, callback);
                    return () => {
                        map.off(mouseEvent, callback)
                    };
                }
                return;
            },
        [map]
    );

    const handleMapCanvasEventListener = useCallback(
        (event: keyof HTMLElementEventMap, callback:any): EffectCallback => 
            () => {
                if (map) {
                    map.getCanvas().addEventListener(event, callback);
                    return () => {
                        map.getCanvas().removeEventListener(event, callback);
                    };
                }
                return;
            },
        [map]
    );
    useEffect(handleMapEvent(eventTypes.CLICK, onMapClicked), [handleMapEvent, onMapClicked])
}