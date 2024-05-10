import { useDispatch } from "react-redux";
import { Dialog, WptProps } from "../../types/DialogTypes"
import { Box, IconButton, TextField } from "@mui/material";
import { CloseDialog } from "../../state/slices/DialogsSlice";
import ClearIcon from '@mui/icons-material/Clear';


const WptDialog = ({ dialog }: { dialog: Dialog }) => {
    const dispatch = useDispatch();
    const properties = dialog.properties as WptProps;
    const TextFields = dialog.dialog;    
    return (
        <>
            <Box className='closeBtn' sx={{ height: '15%', marginRight: '3%' }}>
                <IconButton onClick={() => dispatch(CloseDialog())}><ClearIcon /></IconButton>
            </Box>
            <Box
                display={'flex'}
                height={'85%'}
            >
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
                                color={'success'}
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
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default WptDialog