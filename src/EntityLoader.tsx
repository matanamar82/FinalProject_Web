import { FeatureCollection, Position } from "geojson";
import { useEffect } from "react";
import { Layer, Source, useMap } from "react-map-gl";
import { useFlightLegCalc } from "./hooks/useFlightLegCalc";
import { useDispatch } from "react-redux";
import { Init, DecreaseClicks } from "./state/slices/PinModeSlice";
import { AddFlightLeg, AddWpt } from "./state/slices/EntitySlice";
import usePinModeSlice from "./hooks/usePinModeSlice";
import useEnities from "./hooks/useEntities";
import { FlightLegLayer } from "./layers/FlightLegLayer";
import { WptPointsLayer } from "./layers/WptLayer";
import { FlightLegPointsLayer } from "./layers/FlightLegPointsLayer";
import { entityTypes } from "./types/EntityTypes";
import getElevations from "./Component/GetElevations";
import { FlightLegProps, WptProps } from "./types/DialogTypes";
import useCreateDialog from "./hooks/useCreateDialog";
import { max, min } from "mathjs";

const EntityLoader = ({ point }: any) => {
    const { getFlightLegElevations } = useFlightLegCalc();
    const dispatch = useDispatch();
    const { Option, ClicksAmount, points } = usePinModeSlice();
    const { Wpts, FlightLegs } = useEnities();
    const {showDialog} = useCreateDialog();


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
                else if (ClicksAmount > 0 && Option === 'FlightLeg') {
                    console.log(FlightLegs.length)
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
                const id:number = FlightLegs.length

                if (Self_Coordinates !== Dest_Coordinates) {
                    dispatch(AddFlightLeg({ 
                        type: 'Feature', 
                        geometry: { 
                            type: 'LineString', 
                            coordinates: [Self_Coordinates, Dest_Coordinates] 
                        }, 
                        properties: {}, 
                        id: id
                    }))
                }
                const name:string = `FlightLeg-${FlightLegs.length}`
                const result = CreateFlightLegDialog(Self_Coordinates, Dest_Coordinates, name, id)
                showDialog(result)
            }
            dispatch(Init())
        }
    }, [points]) // מוסיף קו המחבר בין 2 הנקודות, אשר מסמנות את חתך הטיסה 

    const CreateFlightLegDialog = async(Self_Coordinates:Position, Dest_Coordinates:Position, name:string, id:number) => {
        const Result = await getFlightLegElevations(Self_Coordinates, Dest_Coordinates)
        const dialog: FlightLegProps = {
            id: id,
            type: 'LineString',
            name: name,
            elevationsArr: Result.avgArr,
            distancesArr: Result.distanceArr,
            distance: Result.longDistance,
            selfCoordinates: Self_Coordinates,
            destCoordinates: Dest_Coordinates,
            maxElevation: max(...Result.avgArr),
            minElevation: min(...Result.avgArr)
        }
        return dialog;
    }

    const CreateWptDialog = async(point:any, id:number, name:string) => {
        const elevation = await getElevations([`${point.lat},${point.lng}`])
        const dialog: WptProps = {
            id: id,
            type: 'Point',
            name: name,
            PointElevation: elevation[0].elevation,
            selfCoordinates: [point.lng, point.lat]
        }
        return dialog; 
    }

    const geojsonFL: FeatureCollection = {
        type: 'FeatureCollection',
        features: points
    };
    const geojsonWpt: FeatureCollection = {
        type: 'FeatureCollection',
        features: Wpts
    };

    const FlightLegLine: FeatureCollection = {
        type: 'FeatureCollection',
        features: FlightLegs
    }


    return (
        <>
            <Source id="WptPoints" type="geojson" data={geojsonWpt}>
                <Layer {...WptPointsLayer} />
            </Source>
            <Source id="FlightLegPoints" type="geojson" data={geojsonFL}>
                <Layer {...FlightLegPointsLayer} />
            </Source>
            <Source id="FlightLegLine" type="geojson" data={FlightLegLine}>
                <Layer {...FlightLegLayer} />
            </Source>
        </>
    )
}

export default EntityLoader