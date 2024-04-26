import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Dialog } from "../../types/DialogTypes";
import FlightLegDialog from "./FlightLegDialog";
import WptDialog from "./WptDialog";

function DialogComponent({ dialog }: { dialog: Dialog }) {
    const [draggablePosition, setDraggablePosition] = useState<{ x: number, y: number }>({ x: 300, y: 230 })
    const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
        setDraggablePosition({ x: Math.min(data.x), y: data.y })
    }
    // useEffect(() => {
    //     console.log(dialog)
    // }, [])
    return (
        
        <Draggable
            axis="both"
            defaultPosition={draggablePosition}
            onDrag={handleDrag}
            bounds={{ left: -window.innerWidth, right: window.innerWidth, top: -window.innerHeight, bottom: window.innerHeight }}
        >
            {(dialog.properties.type == 'Point' ? 
                <Box
                    className='WptCard'
                    borderRadius={5}
                    sx={{ backgroundColor: 'wheat' }}
                >
                    <WptDialog dialog={dialog}/>
                </Box>
                : (dialog.properties.type == 'LineString') ?
                <Box
                    className='FlightLegCard'
                    borderRadius={5}
                    sx={{ backgroundColor: 'wheat' }}
                >
                    <FlightLegDialog dialog={dialog}/>
                </Box>
                :
                <>
                </>    
            )}
        </Draggable>
    )
}

export default DialogComponent;