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
import { Layer, Source } from "react-map-gl";


// export const getEntities = () => {
//     const ents = {
//         landingZones: [],

        
//     }
// }

const EntityLoader = ({point, lz_dialog_handler}:any) => {

    // console.log(lngLat);
    // const [PointsArr, setPointsArr] = useState<FeatureCollection[]>([])
    const [PointsArr, setPointsArr] = useState<Feature[]>([])
    const [LandingZoneLine, SetLandingZone] = useState<Geometry>({type: 'LineString', coordinates: []})
    useEffect(() => {
        if(point)
        {
            if(PointsArr.length > 0)
                setPointsArr([PointsArr[PointsArr.length - 1], {type: 'Feature', geometry:{type: 'Point', coordinates: [point.lng, point.lat]}, properties: {}}])
            else
                setPointsArr([{type: 'Feature', geometry:{type: 'Point', coordinates: [point.lng, point.lat]}, properties: {}}])
            console.log(point);
        }
    }, [point]) // מוסיף נקודה למסך דרך המערך

    useEffect(() => {
        if(PointsArr.length >= 2)
        {
            const length = PointsArr.length
            const Point1 = PointsArr[length - 2];
            const Point2 = PointsArr[length - 1];
            if(Point1.geometry.type === 'Point' && Point2.geometry.type === 'Point')
            {
                const P1_Coordinates = Point1.geometry.coordinates
                const P2_Coordinates = Point2.geometry.coordinates
                console.log(`P1: ${P1_Coordinates}\nP2: ${P2_Coordinates}`)
                if(P1_Coordinates !== P2_Coordinates)
                    SetLandingZone({type: 'LineString', coordinates: [P1_Coordinates, P2_Coordinates]})
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
            'circle-radius': 6,
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
            'line-width': 6
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