import { LineLayer } from "mapbox-gl";

export const directLayer:LineLayer = {
    id:'direct',
    type:'line',
    source: 'direct',
    layout: {
        "line-cap": "round",
        "line-join": "round",
    },
    paint: {
        "line-color": 'red',
        "line-width": 4,
    },
}