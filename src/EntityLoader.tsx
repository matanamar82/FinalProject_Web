// import { AnyLayer } from "mapbox-gl";
// import { Entity, MapEntityTypes, entityTypes, externalMapEntitiesType } from "./types/EntityTypes";
// import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
// import { useSelector } from "react-redux";
// import { selectSandboxEntities } from "./state/reducers/SandBoxReducer";
// import { useMapEventListener } from "./hooks/useMapEventListener";
// import { useMemo } from "react";
// import { GeoJsonTypes } from "./geojson/Constant";
// import { Layer, Source } from "react-map-gl";

import { Feature, FeatureCollection, Geometry } from "geojson";
import { CircleLayer, LineLayer } from "mapbox-gl";
import { useEffect, useState } from "react";
import { Layer, Source} from "react-map-gl";
import { useLandingZoneCalc } from "./hooks/useLandingZoneCalc";

const EntityLoader = ({point, barOption, showDialog, barHandler}:any) => {
    const [landingZonePointsArr, setLandingZonePointsArr] = useState<Feature[]>([])
    const [wptPointsArr, setWptPointsArr] = useState<Feature[]>([])
    const [LandingZoneLine, SetLandingZone] = useState<Geometry>({type: 'LineString', coordinates: []})
    const {getElevations} = useLandingZoneCalc();
    useEffect(() => {
        if(point)
        {
            if(barOption != '')
            {
                console.log(`LZArr.length = ${landingZonePointsArr.length}`)
                console.log(`WPTArr.length = ${wptPointsArr.length}`)
                if(wptPointsArr.length === 0 && barOption === 'Wpt')
                {
                    setWptPointsArr([{type: 'Feature', geometry:{type: 'Point', coordinates: [point.lng, point.lat]}, properties: {}}])
                    barHandler('')
                }
                else if(wptPointsArr.length === 1 && barOption === 'Wpt')
                    setWptPointsArr([{type: 'Feature', geometry:{type: 'Point', coordinates: [point.lng, point.lat]}, properties: {}}])
                else if(landingZonePointsArr.length === 0 && barOption === 'LandingZone')
                    setLandingZonePointsArr([{type: 'Feature', geometry:{type: 'Point', coordinates: [point.lng, point.lat]}, properties: {}}])
                else if(landingZonePointsArr.length === 1 && barOption === 'LandingZone')
                {
                    setLandingZonePointsArr([landingZonePointsArr[landingZonePointsArr.length - 1], {type: 'Feature', geometry:{type: 'Point', coordinates: [point.lng, point.lat]}, properties: {}}])   
                    barHandler('');
                }
                else if(landingZonePointsArr.length === 2 && barOption === 'LandingZone')
                {
                    setLandingZonePointsArr([{type: 'Feature', geometry:{type: 'Point', coordinates: [point.lng, point.lat]}, properties: {}}])
                    SetLandingZone({type: 'LineString', coordinates: []})
                }
                console.log(point);
            }
            else
                alert('על מנת לדקור על המפה יש לבחור משימה קודם!')   
        }
    }, [point]) // מוסיף נקודה למסך דרך המערך

    useEffect(() => {
        if(landingZonePointsArr.length == 2)
        {
            const length = landingZonePointsArr.length
            const SelfPosition = landingZonePointsArr[length - 2];
            const DestinationPosition = landingZonePointsArr[length - 1];
            if(SelfPosition.geometry.type === 'Point' && DestinationPosition.geometry.type === 'Point')
            {
                const Self_Coordinates = SelfPosition.geometry.coordinates
                const Dest_Coordinates = DestinationPosition.geometry.coordinates

                const result = getElevations(Self_Coordinates, Dest_Coordinates)
                showDialog(result, Self_Coordinates, Dest_Coordinates)

                if(Self_Coordinates !== Dest_Coordinates)
                {
                    SetLandingZone({type: 'LineString', coordinates: [Self_Coordinates, Dest_Coordinates]})
                }
            }
        }
    }, [landingZonePointsArr]) // מוסיף קו המחבר בין 2 הנקודות, אשר מסמנות את מסלול הנחיתה 

    const geojsonLZ: FeatureCollection = {
        type: 'FeatureCollection',
        features: landingZonePointsArr
    };
    const geojsonWpt: FeatureCollection = {
        type: 'FeatureCollection',
        features: wptPointsArr
    };
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

    const LandingZone: Feature = {
        type: 'Feature',
        properties: {},
        geometry: LandingZoneLine
    }
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
            <Source id="landingZoneLine" type="geojson" data={LandingZone}>
                <Layer {...LandingZoneLayer} />
            </Source>
        </>
    )
}

export default EntityLoader