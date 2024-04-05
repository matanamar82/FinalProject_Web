import { max, min } from "mathjs";
import { Dialog, FlightLegProps, WptProps } from "../types/DialogTypes";
import { useDispatch } from "react-redux";
import { AddDialog } from "../state/slices/DialogsSlice";


const useCreateDialog = () => {
    const dispatch = useDispatch();
    const CreateDialog = (dialog: FlightLegProps | WptProps):Dialog => {
        console.log(typeof(dialog))
        let newDialog: Dialog;
        if(dialog.type === 'LineString')
        {
            const FlightLegProps = dialog as FlightLegProps;
            let elevation = min(...FlightLegProps.elevationsArr)
            let minElevation = elevation < 0 ? `${Math.abs(elevation)}-` : elevation;
            elevation = max(...FlightLegProps.elevationsArr);
            let maxElevation = elevation < 0 ? `${Math.abs(elevation)}-` : elevation;
            newDialog = {
                id: FlightLegProps.id,
                properties: FlightLegProps,
                dialog: [{
                    label: "אורך המנחת",
                    id: "FlightLegLength",
                    value: FlightLegProps.distance
                },
                {
                    label: "שם המנחת",
                    id: "FlightLegName",
                    value: FlightLegProps.name
                },
                {
                    label: "גובה מינימלי",
                    id: "MinHeight",
                    value: minElevation
                },
                {
                    label: "גובה מקסימלי",
                    id: "MaxHeight",
                    value: maxElevation,
                },
                {
                    label: "נקודת התחלה - lat",
                    id: "startPointLat",
                    value: FlightLegProps.selfCoordinates[1].toFixed(5)
                },
                {
                    label: "נקודת התחלה - lng",
                    id: "startPointLng",
                    value: FlightLegProps.selfCoordinates[0].toFixed(5)
                },
                {
                    label: "נקודת סיום - lat",
                    id: "endPointLat",
                    value: FlightLegProps.destCoordinates[1].toFixed(5)
                },
                {
                    label: "נקודת סיום - lng",
                    id: "endPointLng",
                    value: FlightLegProps.destCoordinates[0].toFixed(5)
                }]
            }
            
        }
        else
        {
            const WptProps = dialog as WptProps;
            newDialog = {
                id: WptProps.id,
                properties: WptProps,
                dialog: [
                    {
                        label: "גובה הנקודה",
                        id: "Height",
                        value: WptProps.PointElevation
                    },
                    {
                        label: "שם הנקודה",
                        id: "WptName",
                        value: WptProps.name
                    },
                    {
                        label: "הנקודה - lat",
                        id: "Point",
                        value: WptProps.selfCoordinates[1].toFixed(5)
                    },
                    {
                        label: "הנקודה - lng",
                        id: "Point",
                        value: WptProps.selfCoordinates[0].toFixed(5)
                    }
                ]
            }
        }
        return newDialog
    }

    function showDialog(dialog: any) 
    {
        dialog.then((res: any) => {
            console.log(res)
            const Dialog:Dialog = CreateDialog(res)
            dispatch(AddDialog(Dialog))
        })
    };
    return {showDialog};
}

export default useCreateDialog