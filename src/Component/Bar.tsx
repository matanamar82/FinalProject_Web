import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { 
  Divider, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  Collapse, 
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import FlightIcon from '@mui/icons-material/Flight';
import CalculateIcon from '@mui/icons-material/Calculate';
import HeightIcon from '@mui/icons-material/Height';
import '../styles/Bar.css';
import { useMap } from "react-map-gl";
import { useState, useRef, useEffect } from 'react';
import { enterPinMode } from './PinModes/PinModeManager';
import { entityTypes } from '../types/EntityTypes';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import PinDropIcon from '@mui/icons-material/PinDrop';

const drawerWidth = 240;

export const Bar = ({DialogMod, ShowHeightMod}:any) => {
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
          {/* <IconButton sx={{color:'white'}} onClick={() => {MenuStatus()}}>
            <MenuIcon />
          </IconButton> */}
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
                <IconButton onClick={ShowOption}>
                  <FlightLandIcon sx={{fontSize:'40px'}}/>
                </IconButton>
              </Tooltip>  
            </ListItem>
            <Divider />
            <ListItem sx={{justifyContent:'center'}}>
              <Tooltip title="בחר נקודת הצנחה" placement='left'>
                <IconButton>
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
