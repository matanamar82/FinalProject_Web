import {
    Box,
    IconButton,
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { LandingZoneTextFieldsTypes } from "../../types/LandingZoneDialogTypes";
import { Dialog } from "../../types/DialogTypes";
import LandingZoneDialog from "./LandingZoneDialog";
import { entityTypes } from "../../types/EntityTypes";
import WptDialog from "./WptDialog";


function checkDistance(distance: number): boolean {
    return (distance >= 1000 && distance <= 3000)
}

function DialogComponent({ dialog }: { dialog: Dialog }) {
    const [TextFields, setTextField] = useState<LandingZoneTextFieldsTypes[]>([])
    const [type, SetType] = useState<string>(dialog.properties.type)
    const [draggablePosition, setDraggablePosition] = useState<{ x: number, y: number }>({ x: 300, y: 230 })
    const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
        setDraggablePosition({ x: Math.min(data.x), y: data.y })
    }
    useEffect(() => {
        console.log(dialog)
    }, [])
    return (
        
        <Draggable
            axis="both"
            defaultPosition={draggablePosition}
            onDrag={handleDrag}
            bounds={{ left: -window.innerWidth, right: window.innerWidth, top: -window.innerHeight, bottom: window.innerHeight }}
        >
            {(dialog.properties.type == entityTypes.WPT ? 
                <Box
                    className='WptCard'
                    borderRadius={5}
                    sx={{ backgroundColor: 'wheat' }}
                >
                    <WptDialog dialog={dialog}/>
                </Box>
                : (dialog.properties.type == entityTypes.LANDING_ZONE) ?
                <Box
                    className='LandingZoneCard'
                    borderRadius={5}
                    sx={{ backgroundColor: 'wheat' }}
                >
                    <LandingZoneDialog dialog={dialog}/>
                </Box>
                :
                <>
                </>    
            )}
            {/* {(dialog.properties.type == entityTypes.LANDING_ZONE) &&
                <Box
                    className='LandingZoneCard'
                    borderRadius={5}
                    sx={{ backgroundColor: 'wheat' }}
                >
                    <LandingZoneDialog dialog={dialog}/>
                </Box>
            }
             */}
        </Draggable>
    )
}

export default DialogComponent;