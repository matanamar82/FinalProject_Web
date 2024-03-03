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
import { computeDestinationPoint, getDistance, getGreatCircleBearing, getRhumbLineBearing } from "geolib";
import { CircleLayer, LineLayer } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { Layer, Source, useMap } from "react-map-gl";
import { useLandingZoneCalc } from "./hooks/useLandingZoneCalc";

// export const getEntities = () => {
//     const ents = {
//         landingZones: [],

        
//     }
// }
const EntityLoader = ({point, barOption, stopMap}:any) => {
    const map = useMap()
    const [PointsArr, setPointsArr] = useState<Feature[]>([])
    const [LandingZoneLine, SetLandingZone] = useState<Geometry>({type: 'LineString', coordinates: []})
    const {getElevations} = useLandingZoneCalc();
    useEffect(() => {
        if(point)
        {
            if(barOption != '')
            {
                console.log(`PointsArr.length = ${PointsArr.length}`)
                if(PointsArr.length === 0 && barOption === 'Wpt')
                {
                    setPointsArr([{type: 'Feature', geometry:{type: 'Point', coordinates: [point.lng, point.lat]}, properties: {}}])
                    // stopMap();
                }
                else if(PointsArr.length === 0)
                    setPointsArr([{type: 'Feature', geometry:{type: 'Point', coordinates: [point.lng, point.lat]}, properties: {}}])
                else if((PointsArr.length + 1) === 2 && barOption === 'LandingZone')
                {
                    setPointsArr([PointsArr[PointsArr.length - 1], {type: 'Feature', geometry:{type: 'Point', coordinates: [point.lng, point.lat]}, properties: {}}])   
                }
                else if(barOption === 'Wpt')
                    setPointsArr([{type: 'Feature', geometry:{type: 'Point', coordinates: [point.lng, point.lat]}, properties: {}}])
                console.log(point);
            }
            else
                alert('על מנת לדקור על המפה יש לבחור משימה קודם!')   
        }
    }, [point]) // מוסיף נקודה למסך דרך המערך

    useEffect(() => {
        if(PointsArr.length == 2)
        {
            const length = PointsArr.length
            const SelfPosition = PointsArr[length - 2];
            const DestinationPosition = PointsArr[length - 1];
            if(SelfPosition.geometry.type === 'Point' && DestinationPosition.geometry.type === 'Point')
            {
                const Self_Coordinates = SelfPosition.geometry.coordinates
                const Dest_Coordinates = DestinationPosition.geometry.coordinates

                const result = getElevations(Self_Coordinates, Dest_Coordinates).then(res => console.log(res))
                // console.log("the avg elevations are: ")
                // console.log(result)

                if(Self_Coordinates !== Dest_Coordinates)
                {
                    SetLandingZone({type: 'LineString', coordinates: [Self_Coordinates, Dest_Coordinates]})
                    // setPointsArr([]);
                }
            }
        }
    }, [PointsArr]) // מוסיף קו המחבר בין 2 הנקודות, אשר מסמנות את מסלול הנחיתה 
    // useEffect(() => {
    //     if(LandingZoneLine)
    //         lz_dialog_handler(LandingZoneLine) // מעביר לפונקציה שפותחת את הדיאלוג את נקודת ההתחלה ונקודת הסיום
    // },[LandingZoneLine])
    const geojson: FeatureCollection = {
        type: 'FeatureCollection',
        features: PointsArr
    };

    const pointsLayer: CircleLayer = {
        id:'point',
        type: 'circle',
        paint: {
            'circle-radius': 5,
            'circle-color': 'black'
        }
    }

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
    // const sandBoxEntities = useSelector(selectSandboxEntities);
    // useMapEventListener();

    // const addSelectedLayer = (sources: Source[]) => {
    //     const SourceOfSelectd = sources?.filter(
    //         src => src.source?.filter(ent => (ent.properties ? ent.properties.selected : false)).length
    //     )[0];

    //     if(SourceOfSelectd){
    //         sources = [
    //             {
    //                 id: externalMapEntitiesType.SelectedEntity,
    //                 source: SourceOfSelectd.source?.filter(src => 
    //                     src.properties ? src.properties.selected : false
    //                 ),
    //                 layers: SourceOfSelectd.layers.map(lay => ({
    //                     ...lay,
    //                     id: lay.id + '-selected'
    //                 })) 
    //             },
    //             ...sources
    //         ];
    //     }

    //     return sources;
    // };

    // const mapSource = useMemo(
    //     () => 
    //         addSelectedLayer(
    //             sources(
    //                 sandBoxEntities
    //             )
    //         ).map(source => (
    //             <Source
    //                 key={source.id}
    //                 id={source.id}
    //                 generateId
    //                 type='geojson'
    //                 data={{
    //                     type: GeoJsonTypes.FeatureCollection,
    //                     features: source.source as Feature<Geometry, GeoJsonProperties>[]
    //                 }}>
    //             </Source>
    //         ))
    // )


    return (
        <>
            <Source id="points" type="geojson" data={geojson}>
                <Layer {...pointsLayer} />
            </Source>
            <Source id="landingZone" type="geojson" data={LandingZone}>
                <Layer {...LandingZoneLayer} />
            </Source>
        </>
    )

    // return (<div style={{position: 'absolute', right : 300, top: 300, zIndex: 999}}>Hello world</div>)
}

export default EntityLoader