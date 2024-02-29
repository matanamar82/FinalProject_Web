import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { 
  Divider, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText,
  Collapse, 
  Tooltip
} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import FlightIcon from '@mui/icons-material/Flight';
import '../styles/Bar.css';
import { useState } from 'react';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import PinDropIcon from '@mui/icons-material/PinDrop';

export const Bar = ({DialogMod, ShowHeightMod, barHandler}:any) => {
  const [Menu, SetMenu] = useState<boolean>(false);
  // function MenuStatus(){
  //   SetMenu(!Menu);
  //   SetShow(false);
  //   SetShowOption(false);
  // }
  const [ShowPlane, SetShow] = useState<boolean>(false)
  function HandleShow(){
    SetShow(!ShowPlane);
  }
  const [ShowPathOptions, SetShowOption] = useState<boolean>(false);
  function ShowOption(){
    SetShowOption(!ShowPathOptions);
  }

  return (
    <Box>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{justifyContent:'space-between'}}>
          <Typography variant='h5'>map</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="right"
        open={Menu}
        sx={{
            '& .MuiDrawer-paper': {
              width: 200,
            },  
          }}
          
      >
          <Toolbar />
          <List sx={{overflowY:'auto'}}>
            <ListItem sx={{justifyContent:'center'}}>
              <Tooltip title="הצג מטוס" placement='left'>
                <IconButton onClick={HandleShow}>
                  <FlightIcon sx={{fontSize:'40px'}}/>
                </IconButton>
              </Tooltip>
            </ListItem>
            <Collapse in={ShowPlane}>
              <List disablePadding>
                <ListItem>
                  <ListItemText primary="מטוס שמשון" className='center' sx={{color:'blue'}}/>
                </ListItem>
              </List>
            </Collapse>
            <Divider />
            <ListItem sx={{justifyContent:'center'}}>
              <Tooltip title="בחר מסלול נחיתה" placement='left'>
                <IconButton onClick={() => barHandler('LandingZone')}>
                  <FlightLandIcon sx={{fontSize:'40px'}}/>
                </IconButton>
              </Tooltip>  
            </ListItem>
            <Divider />
            <ListItem sx={{justifyContent:'center'}}>
              <Tooltip title="בחר נקודת הצנחה" placement='left'>
                <IconButton onClick={() => barHandler('Wpt')}>
                  <PinDropIcon sx={{fontSize:'40px'}}/>
                </IconButton>
              </Tooltip>             
            </ListItem>
            <Divider />
          </List>
      </Drawer>
    </Box>
    
  );
};
