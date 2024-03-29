import { max, min } from "mathjs";
import { Dialog, LandingZoneProps, WptProps } from "../types/DialogTypes";
import { useDispatch } from "react-redux";
import { entityTypes } from "../types/EntityTypes";


const useCreateDialog = () => {
    // const dispatch = useDispatch();
    const CreateDialog = (dialog: LandingZoneProps | WptProps):Dialog => {
        console.log(typeof(dialog))
        let newDialog: Dialog;
        if(dialog.type === entityTypes.LANDING_ZONE)
        {
            const landingZoneProps = dialog as LandingZoneProps;
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
                    value: min(...landingZoneProps.elevationsArr)
                },
                {
                    label: "גובה מקסימלי",
                    id: "MaxHeight",
                    value: max(...landingZoneProps.elevationsArr),
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
                        label: "שם הנקודה",
                        id: "WptName",
                        value: WptProps.name
                    },
                    {
                        label: "גובה הנקודה",
                        id: "Height",
                        value: WptProps.PointElevation
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

    return {CreateDialog};
}

export default useCreateDialog