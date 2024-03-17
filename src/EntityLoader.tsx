import { Feature, FeatureCollection } from "geojson";
import { CircleLayer, LineLayer } from "mapbox-gl";
import { useEffect, useState } from "react";
import { Layer, Source } from "react-map-gl";
import { useLandingZoneCalc } from "./hooks/useLandingZoneCalc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/stores/Store";
import { Init, DecreaseClicks } from "./state/pinModeSlice/pinModeSlice";

const EntityLoader = ({ point, showDialog }: any) => {
    const [wptPointsArr, setWptPointsArr] = useState<Feature[]>([])
    const [LandingZoneLineArr, SetLandingZone] = useState<Feature[]>([])
    const { getElevations } = useLandingZoneCalc();
    const Option = useSelector((state: RootState) => state.pinMode.option);
    const ClicksAmount = useSelector((state: RootState) => state.pinMode.numberOfClicks);
    const points = useSelector((state: RootState) => state.pinMode.points)
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (point && ClicksAmount !== 0) {
            if (Option != '') {
                // console.log(`LZarr.length = ${points.length}`)
                // console.log(`WPTarr.length = ${wptPointsArr.length}`)
                if (Option === 'Wpt') {
                    setWptPointsArr([{ type: 'Feature', geometry: { type: 'Point', coordinates: [point.lng, point.lat] }, properties: {} }])
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
                    SetLandingZone([...LandingZoneLineArr, { type: 'Feature', geometry: { type: 'LineString', coordinates: [Self_Coordinates, Dest_Coordinates] }, properties: {} }])
                }
            }
            dispatch(Init())
            //setLandingZonePointsArr([])
        }
    }, [points]) // מוסיף קו המחבר בין 2 הנקודות, אשר מסמנות את מסלול הנחיתה 

    const geojsonLZ: FeatureCollection = {
        type: 'FeatureCollection',
        features: points
    };
    const geojsonWpt: FeatureCollection = {
        type: 'FeatureCollection',
        features: wptPointsArr
    };

    const LandingZoneLine: FeatureCollection = {
        type: 'FeatureCollection',
        features: LandingZoneLineArr
    }
    
    const wptPointsLayer: CircleLayer = {
        id: 'wpt-point',
        type: 'circle',
        paint: {
            'circle-radius': 5,
            'circle-color': 'black'
        }
    };

    const landingZonePointsLayer: CircleLayer = {
        id: 'landing-zone-point',
        type: 'circle',
        paint: {
            'circle-radius': 5,
            'circle-color': 'black'
        }
    };

    const LandingZoneLayer: LineLayer = {
        'id': 'landing-zone',
        'type': 'line',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': 'black',
            'line-width': 10
        }
    }

    return (
        <>
            <Source id="WptPoints" type="geojson" data={geojsonWpt}>
                <Layer {...wptPointsLayer} />
            </Source>
            <Source id="landingZonePoints" type="geojson" data={geojsonLZ}>
                <Layer {...landingZonePointsLayer} />
            </Source>
            <Source id="landingZoneLine" type="geojson" data={LandingZoneLine}>
                <Layer {...LandingZoneLayer} />
            </Source>
        </>
    )
}

export default EntityLoader