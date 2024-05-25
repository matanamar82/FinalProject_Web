import { Box, IconButton, Select, TextField, Checkbox, MenuItem, InputLabel, FormControl, FormControlLabel } from "@mui/material"
import { LineChart } from "@mui/x-charts"
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from "react-redux";
import { CloseDialog } from "../../state/slices/DialogsSlice";
import { Dialog, FlightLegProps } from "../../types/DialogTypes";
import { useEffect, useState } from "react";
import { CreateSegmentsPointsArr } from "../../FlightSection/CreateSegment";
import { FlightSectionSegmentPoints } from "../../types/FlightSectionTypes";
import { CreateFlightSection } from "../../FlightSection/CreateFlightSection";

function checkDistance(distance: number): boolean {
    return (distance >= 1000 && distance <= 3000)
}

const FlightLegDialog = ({ dialog } : { dialog: Dialog }) => {
    const dispatch = useDispatch();
    const FeetToMeter = 0.3048;  

    const properties = dialog.properties as FlightLegProps;
    const TextFields = dialog.dialog;
    const [SafeElevation, setSafeElevation] = useState<number | undefined>(undefined);
    const [ShowSelect, setShowSelect] = useState<Boolean>(false);
    const SafeElevationArr = properties.elevationsArr.map(() => 
        (Number(properties.maxElevation) + 300*FeetToMeter))
    const [FlightSectionArr, SetFlightSectionArr] = useState<any[]>(SafeElevationArr);
    const FlightSectionPoints:FlightSectionSegmentPoints[] = CreateSegmentsPointsArr(properties);

    let stop = false
    useEffect(() => {
        if(ShowSelect === false)
        {
            SetFlightSectionArr(SafeElevationArr)
            setSafeElevation(undefined)
        }
    },[ShowSelect])

    useEffect(() => {
        if(SafeElevation)
        {
            let FlightSection = CreateFlightSection(FlightSectionPoints, SafeElevation*FeetToMeter)
            SetFlightSectionArr(FlightSection)
        }
    }, [SafeElevation])

    useEffect(() => {
        if(!stop)
        {
            console.log(FlightSectionPoints)
            stop = true;
        }
    }, [])

    function HandleSafeElevation(elevation:string | undefined)
    {
        setSafeElevation(Number(elevation))
    }
    return(
        <>
            <Box className='closeBtn' sx={{ height: '15%', marginRight: '3%' }}>
                <IconButton onClick={() => dispatch(CloseDialog())}><ClearIcon /></IconButton>
            </Box>
            <Box
                display={'flex'}
                height={'85%'}
            >
                <Box>
                    <LineChart
                        sx={{marginLeft: '5%'}}

                        xAxis={[{ 
                            data: properties.distancesArr,
                            label: "Distance from start (meters)"
                        }]}
                        yAxis={[{
                            label: "Height (meters)",
                        }]}
                        series={[
                            {
                                data: properties.elevationsArr,
                                area: true,
                                showMark: false,  
                            },
                            {
                                data: properties.elevationsArr.map(elevation => 
                                    (elevation === Math.max(...properties.elevationsArr) || elevation === Math.min(...properties.elevationsArr)) ? elevation : null),
                                color: 'orange',
                            },
                            {
                                data: FlightSectionArr,
                                showMark: false,
                                connectNulls: true,                                
                            }
                        ]}
                        width={350}
                        height={350}
                    />
                </Box>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {TextFields.map((Field, i) => {
                            return <TextField
                                key={i}
                                className="TextField"
                                variant="filled"
                                sx={{ margin: '1.5%', backgroundColor: 'snow', direction: 'rtl' }}
                                label={Field.label}
                                id={Field.id}
                                color={Field.id === 'FlightLegLength' ? (checkDistance(Number(Field.value)) ? 'success' : 'error') : 'success'}
                                value={Field.moreDetails}
                                focused

                            />
                        })}
                        <TextField
                            label="הערות"
                            id="Comments"
                            sx={{ width: '18.75vw', margin: '2%', backgroundColor: 'snow', direction: 'rtl' }}
                            variant="filled"

                        />
                        <Box flexDirection={'row'} display={'flex'} margin={1}>
                            <FormControl>
                                <InputLabel id="Safe-Elevation-label">גובה ביטחון</InputLabel>
                                <Select
                                    disabled={!ShowSelect}
                                    id="Safe Elevation"
                                    label='גובה ביטחון'
                                    labelId="Safe-Elevation-label"
                                    className="TextField"
                                    dir="rtl"
                                    onChange={(evt) => HandleSafeElevation(evt.target.value)}
                                    sx={{marginRight:'1vw'}}
                                    value={SafeElevation?.toString() || ''}
                                >
                                    <MenuItem value={300} dir="rtl">90 מטרים (300 רגל)</MenuItem>
                                    <MenuItem value={500} dir="rtl">150 מטרים (500 רגל)</MenuItem>
                                    <MenuItem value={1000} dir="rtl">300 מטרים (1000 רגל)</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox onChange={() => setShowSelect(!ShowSelect)}/>}
                                label="בקרת גלישה"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default FlightLegDialog