import { LineLayer } from "mapbox-gl";

export const noodleLayer:LineLayer = {
    id: "noodle",
    type: "line",
    source: "noodle",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": 'black',
      "line-width": 4,
    },
};