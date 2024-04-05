import { CircleLayer } from "mapbox-gl";

export const FlightLegPointsLayer: CircleLayer = {
    id: 'FlightLeg-point',
    type: 'circle',
    paint: {
        'circle-radius': 5,
        'circle-color': 'black'
    }
};