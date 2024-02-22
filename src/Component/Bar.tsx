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
  ListItemIcon, 
  ListItemText,
  Collapse, 
  Button,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import DirectionsIcon from '@mui/icons-material/Directions';
import FlightIcon from '@mui/icons-material/Flight';
import CalculateIcon from '@mui/icons-material/Calculate';
import HeightIcon from '@mui/icons-material/Height';
import '../styles/Bar.css';
import Map, { useMap } from "react-map-gl";
import { useState, useRef, useEffect } from 'react';
import FetchSelfData from './FetchSelfData';
import maplibregl from 'maplibre-gl';
import CenterMapBtn from './CenterMapBtn';
import { enterPinMode } from './PinModes/PinModeManager';
import { map } from 'mathjs';
import { entityTypes } from '../types/EntityTypes';

const drawerWidth = 240;

export const Bar = ({DialogMod, ShowHeightMod}:any) => {
  const {current: map} = useMap();
  const [viewState, setViewState] = useState({
    longitude: 35,
    latitude: 32,
    zoom: 5,
    pitch: 0,
  });
  const [Menu, SetMenu] = useState<boolean>(false);
  function MenuStatus(){
    SetMenu(!Menu);
    SetShow(false);
    SetShowOption(false);
  }
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
          <IconButton sx={{color:'white'}} onClick={() => {MenuStatus()}}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="right"
        open={Menu}
        sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth
            },
            
          }}
          
      >

          <Toolbar />
          <List sx={{overflowY:'auto'}}>
            <ListItem sx={{justifyContent:'center'}}>
              <Tooltip title="בחר מסלול טיסה" placement='left'>
                <IconButton size='large' onClick={ShowOption}>
                  <DirectionsIcon sx={{fontSize:'50px'}}/>
                </IconButton>
              </Tooltip>  
            </ListItem>
            <Collapse in={ShowPathOptions}>
                <List>
                  <ListItemButton onClick={() => enterPinMode(map, entityTypes.LANDING_ZONE)}>
                    <ListItemText className='center' primary="לפי נ.צ ידועות"/>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText className='center' primary="סמן נקודות על המפה"/>
                  </ListItemButton>
                </List>
            </Collapse>
            <Divider />
            <ListItem sx={{justifyContent:'center'}}>
              <Tooltip title="הצג מטוס" placement='left'>
                <IconButton onClick={HandleShow}>
                  <FlightIcon sx={{fontSize:'50px'}}/>
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
              <Tooltip title="חישוב גובה הצנחה" placement='left'>
                <IconButton>
                  <CalculateIcon sx={{fontSize:'50px'}}/>
                </IconButton>
              </Tooltip>             
            </ListItem>
            <Divider />
            <ListItem sx={{justifyContent:'center'}}>
              <Tooltip title="מפת גבהים" placement='left'>
                <IconButton>
                  <HeightIcon sx={{fontSize:'50px'}}/>
                </IconButton>
              </Tooltip>
            </ListItem> 
          </List>
      </Drawer>
    </Box>
    
  );
};
