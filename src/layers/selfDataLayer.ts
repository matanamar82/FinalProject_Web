import { SymbolLayer } from "mapbox-gl";

export const selfDataLayer: SymbolLayer = {
    id: "selfData",
    type: "symbol",
    source: "selfData",
    layout: {
      "icon-allow-overlap": true,
      "icon-rotation-alignment": "map",
      "icon-rotate": ["get", "trueTrack"],
      "icon-image": 'selfPlane',
      "icon-size": 0.02,
      
    },

};