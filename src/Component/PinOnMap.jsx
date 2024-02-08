import { useEffect, useState } from "react";
import { Source, Layer, useMap } from "react-map-gl";

export function PinLocation()
{

    const [pointFeature, setPointFeature] = useState({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: []
        }
    });

    const { current: currMap } = useMap();

    const geojson = {
        type: 'FeatureCollection',
        features: []
    };
    // const [pointFeature, SetPoint] = useState();
    // Used to draw a line between points
    const [LandingZoneLine, SetLandingZoneLine] = useState({
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': [],
        }
    });
    //                     layers
    const [landingZoneLayer, setLandingZoneLayer] = useState({
        id: "landingZone",
        type: "line",
        source: "geojson",
        layout: {
            "line-cap": "round",
            "line-join": "round",
        },
        paint: {
            "line-color": "#FFFFFF",
            "line-width": 4,
        },
    });

    const [PointsLayer, SetPointsLayer] = useState({
        id: 'Points',
        type: 'circle',
        source: 'geojson',
        paint: {
            'circle-radius': 5,
            'circle-color': 'lightgreen'
        },
        filter: ['in', '$type', 'Point'],
    });

    const newPointFeature = {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [e.lngLat.lng, e.lngLat.lat]
        },
        'properties': {
            'id': String(new Date().getTime())
        }
    };

    // Update state to include the new point feature
    setPointFeature(newPointFeature);

    return (
        <>
            <Source id="landingZone" type="geojson" data={LandingZoneLine}>
                <Layer {...landingZoneLayer} />
            </Source>
            <Source id="Points" type="geojson" data={pointFeature}>
                <Layer {...PointsLayer} />
            </Source>
        </>);
}