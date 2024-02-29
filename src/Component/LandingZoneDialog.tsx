import { 
    Box, 
    IconButton, 
    TextField 
} from "@mui/material";
import { useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { LineChart } from '@mui/x-charts';
import ClearIcon from '@mui/icons-material/Clear';

const TextFields = [
    {
        "label": "אורך המנחת",
        "id": "LandingZoneLength"
    },
    {
        "label":"שם המנחת",
        "id":"LandingZoneLength"
    },
    {
        "label":"גובה מינימלי",
        "id":"MinHeight"
    },
    {
        "label":"גובה מקסימלי",
        "id":"MaxHeight"
    },
    {
        "label":"נקודת סיום",
        "id":"landingZonePoint"
    },
    {
        "label":"נקודת התחלה",
        "id":"startPoint"
    }
]

function LandingZoneDialog() {
    const [draggablePosition, setDraggablePosition] = useState<{ x: number, y: number }>({ x: 300, y: 230 })
    const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
        setDraggablePosition({ x: Math.min(data.x), y: data.y })
    }

    return (
        <Draggable
            axis="both"
            defaultPosition={draggablePosition}
            onDrag={handleDrag}
            bounds={{ left: -window.innerWidth, right: window.innerWidth, top: -window.innerHeight, bottom: window.innerHeight }}
        >
            <Box
                className='Card'
                borderRadius={5}
                sx={{backgroundColor:'wheat'}}
            >
                <Box className='closeBtn' sx={{height:'15%', marginRight:'3%'}}>
                    <IconButton><ClearIcon /></IconButton>
                </Box>
                <Box 
                    display={'flex'}
                    height={'85%'}
                >
                    <Box>
                        <LineChart
                            
                            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                            series={[
                                {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                                area: true,
                                },
                            ]}
                            width={370}
                            height={300}
                        />
                    </Box>
                    <Box>
                        <Box 
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignItems:'center',
                                // backgroundColor:'wheat'
                            }}
                        >
                            {TextFields.map((Filed, i) => {
                                console.log(Filed)
                                return <TextField 
                                    key={i} 
                                    className="TextField"
                                    variant="filled"
                                    sx={{ margin: '1.5%', backgroundColor: 'snow'}}
                                    style={{direction: 'rtl'}}
                                    label={Filed.label} 
                                    id={Filed.id}
                                    color='success'
                                    
                                />
                            })}
                            <TextField 
                                label="הערות"
                                id="Comments"
                                sx={{width: '84%', margin:'2%', backgroundColor: 'snow'}}
                                variant="filled"
                                dir="rtl"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Draggable>
    )
}

export default LandingZoneDialog;