import { Box, IconButton, TextField } from "@mui/material"
import { LineChart } from "@mui/x-charts"
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from "react-redux";
import { CloseDialog } from "../../state/slices/DialogsSlice";
import { Dialog, FlightLegProps } from "../../types/DialogTypes";

function checkDistance(distance: number): boolean {
    return (distance >= 1000 && distance <= 3000)
}

const FlightLegDialog = ({ dialog } : { dialog: Dialog }) => {
    const dispatch = useDispatch();
    const properties = dialog.properties as FlightLegProps;
    const TextFields = dialog.dialog;
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
                        // ציר x = המרחקים
                        xAxis={[{ data: properties.distancesArr }]}
                        series={[
                            {
                                // ציר y = הגבהים
                                data: properties.elevationsArr,
                                area: true,
                                showMark: false,                                
                            },
                            {
                                data: properties.elevationsArr.map(elevation => 
                                    (elevation === properties.maxElevation || elevation === properties.minElevation) ? elevation : null),
                                color: 'orange'
                            }
                        ]}
                        width={350}
                        height={300}
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
                            // console.log(Filed)
                            return <TextField
                                key={i}
                                className="TextField"
                                variant="filled"
                                sx={{ margin: '1.5%', backgroundColor: 'snow', direction: 'rtl' }}
                                label={Field.label}
                                id={Field.id}
                                color={Field.id === 'FlightLegLength' ? (checkDistance(Number(Field.value)) ? 'success' : 'error') : 'success'}
                                value={Field.value}
                                // onChange={(e) => handleFieldChange(e, Field.id)}
                                focused

                            />
                        })}
                        <TextField
                            label="הערות"
                            id="Comments"
                            sx={{ width: '18.75vw', margin: '2%', backgroundColor: 'snow', direction: 'rtl' }}
                            variant="filled"

                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default FlightLegDialog