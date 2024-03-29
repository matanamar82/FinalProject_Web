import { LineLayer } from "mapbox-gl";

export const landingZoneLayer: LineLayer = {
    id: 'landingzone-layer',
    type: 'line',
    layout:  {
        'line-cap': 'round',
        "line-join": 'round'
    },
    paint: {
        'line-color': 'black',
        'line-width': 1.5,
        'line-offset': -4
    },
    // filter: [
    //     'all',
    //     ['==', ['geometry-type'], 'LineString'],
    //     ['==', ['get', 'entityType'],'landingZone']
    // ]
}