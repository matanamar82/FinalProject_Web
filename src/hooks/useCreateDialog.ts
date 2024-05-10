import { max, min } from "mathjs";
import { Dialog, FlightLegProps, WptProps } from "../types/DialogTypes";
import { useDispatch } from "react-redux";
import { AddDialog } from "../state/slices/DialogsSlice";


const useCreateDialog = () => {
    const dispatch = useDispatch();
    const CreateDialog = (dialog: FlightLegProps | WptProps):Dialog => {
        let newDialog: Dialog;
        if(dialog.type === 'LineString')
        {
            const FlightLegProps = dialog as FlightLegProps;
            let elevation = min(...FlightLegProps.elevationsArr)
            let minElevation = elevation < 0 ? `${Math.abs(elevation)}-` : elevation.toString();
            elevation = max(...FlightLegProps.elevationsArr);
            let maxElevation = elevation < 0 ? `${Math.abs(elevation)}-` : elevation.toString();
            newDialog = {
                id: FlightLegProps.id,
                properties: FlightLegProps,
                dialog: [{
                    label: "אורך המנחת",
                    id: "FlightLegLength",
                    value: FlightLegProps.distance,
                    moreDetails: `${FlightLegProps.distance} מטרים`
                },
                {
                    label: "שם המנחת",
                    id: "FlightLegName",
                    value: FlightLegProps.name,
                    moreDetails: FlightLegProps.name
                },
                {
                    label: "גובה מינימלי",
                    id: "MinHeight",
                    value: min(...FlightLegProps.elevationsArr),
                    moreDetails: `${minElevation} מטרים`
                },
                {
                    label: "גובה מקסימלי",
                    id: "MaxHeight",
                    value: max(...FlightLegProps.elevationsArr),
                    moreDetails: `${maxElevation} מטרים`
                },
                {
                    label: "נקודת התחלה - lat",
                    id: "startPointLat",
                    value: FlightLegProps.selfCoordinates[1].toFixed(5),
                    moreDetails: FlightLegProps.selfCoordinates[1].toFixed(5)
                },
                {
                    label: "נקודת התחלה - lng",
                    id: "startPointLng",
                    value: FlightLegProps.selfCoordinates[0].toFixed(5),
                    moreDetails: FlightLegProps.selfCoordinates[0].toFixed(5)
                },
                {
                    label: "נקודת סיום - lat",
                    id: "endPointLat",
                    value: FlightLegProps.destCoordinates[1].toFixed(5),
                    moreDetails: FlightLegProps.destCoordinates[1].toFixed(5)
                },
                {
                    label: "נקודת סיום - lng",
                    id: "endPointLng",
                    value: FlightLegProps.destCoordinates[0].toFixed(5),
                    moreDetails: FlightLegProps.destCoordinates[0].toFixed(5)
                }]
            }
            
        }
        else
        {
            const WptProps = dialog as WptProps;
            const PointElevation = WptProps.PointElevation < 0 ? `${Math.abs(WptProps.PointElevation)}-` : WptProps.PointElevation.toString();
            newDialog = {
                id: WptProps.id,
                properties: WptProps,
                dialog: [
                    {
                        label: "גובה הנקודה",
                        id: "Height",
                        value: PointElevation,
                        moreDetails: `${PointElevation} מטרים`
                    },
                    {
                        label: "שם הנקודה",
                        id: "WptName",
                        value: WptProps.name,
                        moreDetails: WptProps.name
                    },
                    {
                        label: "הנקודה - lat",
                        id: "Point",
                        value: WptProps.selfCoordinates[1].toFixed(5),
                        moreDetails: WptProps.selfCoordinates[1].toFixed(5)
                    },
                    {
                        label: "הנקודה - lng",
                        id: "Point",
                        value: WptProps.selfCoordinates[0].toFixed(5),
                        moreDetails: WptProps.selfCoordinates[0].toFixed(5)
                    }
                ]
            }
        }
        return newDialog
    }

    function showDialog(dialog: any) 
    {
        console.log(dialog)
        const Dialog:Dialog = CreateDialog(dialog)
            dispatch(AddDialog(Dialog))
    };
    return {showDialog};
}

export default useCreateDialog