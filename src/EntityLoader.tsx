import { FeatureCollection, Position } from "geojson";
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
import { entityTypes } from "./types/EntityTypes";
import getElevations from "./Component/GetElevations";
import { LandingZoneProps, WptProps } from "./types/DialogTypes";

const EntityLoader = ({ point, showDialog }: any) => {
    const { getLandingZoneElevations } = useLandingZoneCalc();
    const dispatch = useDispatch();
    const { Option, ClicksAmount, points } = usePinModeSlice();
    const { Wpts, LandingZones } = useEnities();

    useEffect(() => {
        if (point && ClicksAmount !== 0) {
            if (Option != '') {
                // console.log(`LZarr.length = ${points.length}`)
                // console.log(`WPTarr.length = ${wptPointsArr.length}`)
                if (Option === 'Wpt') {
                    const id:number = Wpts.length
                    dispatch(AddWpt({ 
                        type: 'Feature', 
                        geometry: { 
                            type: 'Point', 
                            coordinates: [point.lng, point.lat] 
                        }, 
                        properties: {}, 
                        id: id
                    }))
                    dispatch(Init());
                    const name:string = `${entityTypes.WPT}-${Wpts.length}`
                    const result = CreateWptDialog(point, id, name).then((res:any) => res)
                    showDialog(result)
                    // console.log(result)
                }
                else if (ClicksAmount > 0 && Option === 'LandingZone') {
                    console.log(LandingZones.length)
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
            if (SelfPosition.geometry.type === 'Point' && DestinationPosition.geometry.type === 'Point') 
            {
                const Self_Coordinates = SelfPosition.geometry.coordinates
                const Dest_Coordinates = DestinationPosition.geometry.coordinates
                const id:number = LandingZones.length

                if (Self_Coordinates !== Dest_Coordinates) {
                    dispatch(AddLandingZone({ 
                        type: 'Feature', 
                        geometry: { 
                            type: 'LineString', 
                            coordinates: [Self_Coordinates, Dest_Coordinates] 
                        }, 
                        properties: {}, 
                        id: id
                    }))
                }
                const name:string = `${entityTypes.LANDING_ZONE}-${LandingZones.length}`
                const result = CreateLandingZoneDialog(Self_Coordinates, Dest_Coordinates, name, id)
                showDialog(result)
            }
            dispatch(Init())
        }
    }, [points]) // מוסיף קו המחבר בין 2 הנקודות, אשר מסמנות את מסלול הנחיתה 

    const CreateLandingZoneDialog = async(Self_Coordinates:Position, Dest_Coordinates:Position, name:string, id:number) => {
        const Result = await getLandingZoneElevations(Self_Coordinates, Dest_Coordinates)
        const dialog: LandingZoneProps = {
            id: id,
            type: entityTypes.LANDING_ZONE,
            name: name,
            elevationsArr: Result.avgArr,
            distancesArr: Result.distanceArr,
            distance: Result.longDistance,
            selfCoordinates: Self_Coordinates,
            destCoordinates: Dest_Coordinates
        }
        return dialog;
    }

    const CreateWptDialog = async(point:any, id:number, name:string) => {
        const elevation = await getElevations([`${point.lat},${point.lng}`])
        const dialog: WptProps = {
            id: id,
            type: entityTypes.WPT,
            name: name,
            PointElevation: elevation[0].elevation,
            selfCoordinates: [point.lng, point.lat]
        }
        return dialog; 
    }

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