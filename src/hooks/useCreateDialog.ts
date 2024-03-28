import { max, min } from "mathjs";
import { LandingZoneDialogPropsType } from "../types/LandingZoneDialogTypes";
import { WptDialogPropsType } from "../types/WptDialogPropsType";

const useCreateDialog = () => {
    const CreateDialog = (dialog: LandingZoneDialogPropsType | WptDialogPropsType) => {
        console.log(typeof(dialog))
        // if(type === 'LandingZone')
        // {
        //     const newDialog = [
        //     {
        //         "label": "אורך המנחת",
        //         "id": "LandingZoneLength",
        //         "value": dialog.distance
        //     },
        //     {
        //         "label": "שם המנחת",
        //         "id": "LandingZoneName",
        //         "value": "LZ-1"
        //     },
        //     {
        //         "label": "גובה מינימלי",
        //         "id": "MinHeight",
        //         "value": min(...dialog.elevationsArr)
        //     },
        //     {
        //         "label": "גובה מקסימלי",
        //         "id": "MaxHeight",
        //         "value": max(...dialog.elevationsArr),
        //     },
        //     {
        //         "label": "נקודת התחלה - lat",
        //         "id": "endPoint",
        //         "value": dialog.destCoordinates[1]
        //     },
        //     {
        //         "label": "נקודת התחלה - lng",
        //         "id": "startPoint",
        //         "value": dialog.selfCoordinates[0]
        //     },
        //     {
        //         "label": "נקודת סיום - lat",
        //         "id": "endPoint",
        //         "value": dialog.destCoordinates[1]
        //     },
        //     {
        //         "label": "נקודת סיום - lng",
        //         "id": "startPoint",
        //         "value": dialog.selfCoordinates[0]
        //     }]
        // }
        // else
        // {
            
        // // }
    }

    return {CreateDialog};
}

export default useCreateDialog