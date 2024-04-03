import { max, min } from "mathjs";
import { Dialog, LandingZoneProps, WptProps } from "../types/DialogTypes";
import { useDispatch } from "react-redux";
import { AddDialog } from "../state/slices/DialogsSlice";


const useCreateDialog = () => {
    const dispatch = useDispatch();
    const CreateDialog = (dialog: LandingZoneProps | WptProps):Dialog => {
        console.log(typeof(dialog))
        let newDialog: Dialog;
        if(dialog.type === 'LineString')
        {
            const landingZoneProps = dialog as LandingZoneProps;
            let elevation = min(...landingZoneProps.elevationsArr)
            let minElevation = elevation < 0 ? `${Math.abs(elevation)}-` : elevation;
            elevation = max(...landingZoneProps.elevationsArr);
            let maxElevation = elevation < 0 ? `${Math.abs(elevation)}-` : elevation;
            newDialog = {
                id: landingZoneProps.id,
                properties: landingZoneProps,
                dialog: [{
                    label: "אורך המנחת",
                    id: "LandingZoneLength",
                    value: landingZoneProps.distance
                },
                {
                    label: "שם המנחת",
                    id: "LandingZoneName",
                    value: landingZoneProps.name
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
                    value: landingZoneProps.selfCoordinates[1].toFixed(5)
                },
                {
                    label: "נקודת התחלה - lng",
                    id: "startPointLng",
                    value: landingZoneProps.selfCoordinates[0].toFixed(5)
                },
                {
                    label: "נקודת סיום - lat",
                    id: "endPointLat",
                    value: landingZoneProps.destCoordinates[1].toFixed(5)
                },
                {
                    label: "נקודת סיום - lng",
                    id: "endPointLng",
                    value: landingZoneProps.destCoordinates[0].toFixed(5)
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
    return {CreateDialog};
}

export default useCreateDialog