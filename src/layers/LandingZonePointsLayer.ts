import { CircleLayer } from "mapbox-gl";

export const landingZonePointsLayer: CircleLayer = {
    id: 'landing-zone-point',
    type: 'circle',
    paint: {
        'circle-radius': 5,
        'circle-color': 'black'
    }
};