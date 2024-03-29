import { MapboxGeoJSONFeature, PointLike } from "mapbox-gl";
import { MapRef } from "react-map-gl"
import { sources } from "../MapSource";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/stores/Store";

export const useMapUtils = () => {
    const lzones = useSelector((state: RootState) => state.Entity.LandingZones);
    const getFeaturesAroundPoint = (map: MapRef, point: mapboxgl.Point): MapboxGeoJSONFeature[] => {
        console.log(map);

        const bbox: [PointLike, PointLike] = [
            [point.x - 5, point.y - 5],
            [point.x + 5, point.y + 5]
        ];

        if (map === undefined) throw Error;
    
        const features: MapboxGeoJSONFeature[] = map.queryRenderedFeatures(bbox, {
            layers: sources().map(src => src.layers.id)
        });

        console.log(features[0])
        // const uniqueFeatures: MapboxGeoJSONFeature[] = features.filter(
        //     (value: MapboxGeoJSONFeature, index: number, array: MapboxGeoJSONFeature[]) => 
        //         array.findIndex((item: MapboxGeoJSONFeature) => item.id === value.id) === index
        // );

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