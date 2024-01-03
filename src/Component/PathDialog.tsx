import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'

export function PathDialog({Open, DialogMod, setPoints}:any){
    function pointsHandle(){
        var src_dest = document.querySelectorAll('input')
        setPoints(src_dest[0].value, src_dest[1].value, src_dest[2].value, src_dest[3].value)
    }
    return(
        <Dialog open={Open} className='center'>
            <DialogTitle textAlign={'center'}>מסלול טיסה</DialogTitle>
            <DialogContent className='center' sx={{flexDirection:'column'}}>
                <DialogContentText>
                    :הכנס נקודת מוצא
                </DialogContentText>
                <input type='number' min={'0'} max={'10'} style={{width:'90%'}} name='src_lat' placeholder='latitude'/>
                <input type='number' min={'0'} max={'10'} style={{width:'90%'}} name='src_lon' placeholder='longitude'/>
                <DialogContentText>
                    :הכנס נקודת יעד
                </DialogContentText>
                <input type='number' min={'0'} max={'10'} style={{width:'90%'}} name='dest_lat' placeholder='latitude'/>
                <input type='number' min={'0'} max={'10'} style={{width:'90%'}} name='dest_lon' placeholder='longitude'/>
            </DialogContent>
            <DialogActions>
                <Button onClick={pointsHandle}>הצג מסלול</Button>
                <Button onClick={DialogMod}>סגור</Button>
            </DialogActions>
        </Dialog>
    )
}