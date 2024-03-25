import { CircleLayer } from "mapbox-gl";

export const WptPointsLayer: CircleLayer = {
    id: 'wpt-layer',
    type: 'circle',
    paint: {
        'circle-radius': 5,
        'circle-color': 'black'
    }
};