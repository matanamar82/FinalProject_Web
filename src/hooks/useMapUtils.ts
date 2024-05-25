import { MapboxGeoJSONFeature, PointLike } from "mapbox-gl";
import { MapRef } from "react-map-gl"
import { sources } from "../Component/MapSource";

export const useMapUtils = () => {
    const getFeaturesAroundPoint = (map: MapRef, point: mapboxgl.Point): MapboxGeoJSONFeature[] => {

        const bbox: [PointLike, PointLike] = [
            [point.x - 5, point.y - 5],
            [point.x + 5, point.y + 5]
        ];

        if (map === undefined) throw Error;

        const features: MapboxGeoJSONFeature[] = map.queryRenderedFeatures(bbox, {
            layers: sources().map(src => src.layers.id)
        });

        return features;
    };

    return { getFeaturesAroundPoint };
};