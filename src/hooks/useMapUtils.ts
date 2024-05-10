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

    // const findPositionCoordinateIndex = (coordinates: LineStringPoint[], position: Position) => {
    //     return coordinates.findIndex(
    //         point => 
    //             point.coordinate.longitude.toFixed(2) === position[0].toFixed(2) && 
    //             point.coordinate.latitude.toFixed(2) === position[1].toFixed(2)
    //     );
    // };

    // const generateNewPoint = (
    //     entityType: EntityType,
    //     lnglat: LngLat
    // ): LineStringPoint | RoutePoint => {
    //     const newPoint = {
    //         id: Math.round(Math.random() * 100000000).toString(),
    //         coordinate: {
    //             longitude: lnglat.lng,
    //             latitude: lnglat.lat
    //         }
    //     };

    //     return entityType !== entityTypes.ROUTE ? newPoint: {...newPoint, name: 'POINT_NAME'};
    // };

    return { getFeaturesAroundPoint };
};