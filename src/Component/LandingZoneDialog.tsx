import { 
    Box, 
    FormControl, 
    IconButton, 
    InputAdornment, 
    OutlinedInput, 
    TextField 
} from "@mui/material";
import { useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { LineChart } from '@mui/x-charts';
import ClearIcon from '@mui/icons-material/Clear';
import { max, min } from "mathjs";
import { LandingZoneDialogTypes } from "../types/LandingZoneDialogTypes";
import { Position } from "geojson";
import { createTheme, ThemeProvider } from "@mui/material";
import { jssPreset, StylesProvider } from "@mui/styles";


type Props = {
    elevationsArr: number[],
    distancesArr: number[],
    distance: number,
    selfCoordinates:Position,
    destCoordinates:Position,
    DialogMod: (mod: boolean) => void
}

function checkDistance(distance: number):boolean{
    return (distance <= 3000)
}

function LandingZoneDialog({elevationsArr, distancesArr, distance, selfCoordinates, destCoordinates, DialogMod}:Props) {
    const [TextFields, setTextField] = useState<LandingZoneDialogTypes[]>([])
    const [draggablePosition, setDraggablePosition] = useState<{ x: number, y: number }>({ x: 300, y: 230 })
    const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
        setDraggablePosition({ x: Math.min(data.x), y: data.y })
    }
    useEffect(() => {
        setTextField([
            {
                "label": "אורך המנחת",
                "id": "LandingZoneLength",
                "value": distance
            },
            {
                "label":"שם המנחת",
                "id":"LandingZoneName",
                "value": "LZ-1"
            },
            {
                "label":"גובה מינימלי",
                "id":"MinHeight",
                "value": min(...elevationsArr)
            },
            {
                "label":"גובה מקסימלי",
                "id":"MaxHeight",
                "value": max(...elevationsArr),
            },
            {
                "label":"נקודת התחלה - lat",
                "id":"endPoint",
                "value": destCoordinates[1]
            },
            {
                "label":"נקודת התחלה - lng",
                "id":"startPoint",
                "value": selfCoordinates[0]
            },
            {
                "label":"נקודת סיום - lat",
                "id":"endPoint",
                "value": destCoordinates[1]
            },
            {
                "label":"נקודת התחלה - lng",
                "id":"startPoint",
                "value": selfCoordinates[0]
            }
        ])
    },[elevationsArr])
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
                    <IconButton onClick={() => DialogMod(false)}><ClearIcon /></IconButton>
                </Box>
                <Box 
                    display={'flex'}
                    height={'85%'}
                >
                    <Box>
                        <LineChart
                            // ציר x = המרחקים
                            xAxis={[{ data: distancesArr }]}
                            series={[
                                {
                                    // ציר y = הגבהים
                                data: elevationsArr,
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
                            }}
                        >
                            {TextFields.map((Filed, i) => {
                                console.log(Filed)
                                return <TextField 
                                    key={i} 
                                    className="TextField"
                                    variant="filled"
                                    sx={{ margin: '1.5%', backgroundColor: 'snow', direction: 'rtl'}}
                                    label={Filed.label} 
                                    id={Filed.id}
                                    color={Filed.id === 'LandingZoneLength' ? (checkDistance(Number(Filed.value)) ? 'success' : 'error') : 'success'}
                                    value={Filed.value}
                                    focused
                                    
                                />
                            })}
                            <TextField 
                                label="הערות"
                                id="Comments"
                                sx={{width: '94%', margin:'2%', backgroundColor: 'snow', direction: 'rtl'}}
                                variant="filled"
                                
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Draggable>
    )
}

export default LandingZoneDialog;