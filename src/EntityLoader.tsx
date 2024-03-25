import { FeatureCollection } from "geojson";
import { CircleLayer } from "mapbox-gl";
import { useEffect } from "react";
import { Layer, Source, useMap } from "react-map-gl";
import { useLandingZoneCalc } from "./hooks/useLandingZoneCalc";
import { useDispatch } from "react-redux";
import { Init, DecreaseClicks } from "./state/slices/PinModeSlice";
import { AddLandingZone, AddWpt } from "./state/slices/EntitySlice";
import usePinModeSlice from "./hooks/usePinModeSlice";
import useEnities from "./hooks/useEntities";
import { landingZoneLayer } from "./layers/LandingZoneLayer";
import { WptPointsLayer } from "./layers/WptLayer";
import { landingZonePointsLayer } from "./layers/LandingZonePointsLayer";

const EntityLoader = ({ point, showDialog }: any) => {
    const { getElevations } = useLandingZoneCalc();
    const dispatch = useDispatch();
    const { Option, ClicksAmount, points } = usePinModeSlice();
    const { Wpts, LandingZones } = useEnities();
    const { current: map } = useMap();

    useEffect(() => {
        console.log(map)
        if (point && ClicksAmount !== 0) {
            if (Option != '') {
                // console.log(`LZarr.length = ${points.length}`)
                // console.log(`WPTarr.length = ${wptPointsArr.length}`)
                if (Option === 'Wpt') {
                    dispatch(AddWpt({ type: 'Feature', geometry: { type: 'Point', coordinates: [point.lng, point.lat] }, properties: {} }))
                    dispatch(Init());
                }
                else if (ClicksAmount > 0 && Option === 'LandingZone') {
                    dispatch(DecreaseClicks({
                        option: Option,
                        numberOfClicks: ClicksAmount,
                        points: [...points, { type: 'Feature', geometry: { type: 'Point', coordinates: [point.lng, point.lat] }, properties: {} }]
                    }))
                }
                // console.log(point);
            }
        }
    }, [point]) // מוסיף נקודה למסך דרך המערך

    useEffect(() => {
        if (points.length == 2) {
            const length = points.length
            const SelfPosition = points[length - 2];
            const DestinationPosition = points[length - 1];
            if (SelfPosition.geometry.type === 'Point' && DestinationPosition.geometry.type === 'Point') {
                const Self_Coordinates = SelfPosition.geometry.coordinates
                const Dest_Coordinates = DestinationPosition.geometry.coordinates

                const result = getElevations(Self_Coordinates, Dest_Coordinates)
                showDialog(result, Self_Coordinates, Dest_Coordinates)

                if (Self_Coordinates !== Dest_Coordinates) {
                    dispatch(AddLandingZone({ type: 'Feature', geometry: { type: 'LineString', coordinates: [Self_Coordinates, Dest_Coordinates] }, properties: {} }))
                }
            }
            dispatch(Init())
        }
    }, [points]) // מוסיף קו המחבר בין 2 הנקודות, אשר מסמנות את מסלול הנחיתה 

    const geojsonLZ: FeatureCollection = {
        type: 'FeatureCollection',
        features: points
    };
    const geojsonWpt: FeatureCollection = {
        type: 'FeatureCollection',
        features: Wpts
    };

    const LandingZoneLine: FeatureCollection = {
        type: 'FeatureCollection',
        features: LandingZones
    }


    return (
        <>
            <Source id="WptPoints" type="geojson" data={geojsonWpt}>
                <Layer {...WptPointsLayer} />
            </Source>
            <Source id="landingZonePoints" type="geojson" data={geojsonLZ}>
                <Layer {...landingZonePointsLayer} />
            </Source>
            <Source id="landingZoneLine" type="geojson" data={LandingZoneLine}>
                <Layer {...landingZoneLayer} />
            </Source>
        </>
    )
}

export default EntityLoader