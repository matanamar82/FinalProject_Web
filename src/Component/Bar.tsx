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
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import DirectionsIcon from '@mui/icons-material/Directions';
import FlightIcon from '@mui/icons-material/Flight';
import CalculateIcon from '@mui/icons-material/Calculate';
import '../styles/Bar.css';
import Map from "react-map-gl";
import { useState, useRef, useEffect } from 'react';
import FetchSelfData from './FetchSelfData';
import maplibregl from 'maplibre-gl';
import CenterMapBtn from './CenterMapBtn';

const drawerWidth = 240;

export const Bar = ({DialogMod, ShowHeightMod}:any) => {
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
            <ListItemButton onClick={ShowOption}>
              <ListItemIcon>
                <DirectionsIcon />
              </ListItemIcon>
              <ListItemText primary="בחר מסלול טיסה" primaryTypographyProps={{textAlign:'end'}}/>
            </ListItemButton>
            <Collapse in={ShowPathOptions}>
                <List>
                  <ListItemButton onClick={DialogMod}>
                    <ListItemText className='center' primary="לפי נ.צ ידועות"/>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText className='center' primary="סמן נקודות על המפה"/>
                  </ListItemButton>
                </List>
              </Collapse>
            <Divider />
            <ListItemButton onClick={HandleShow}>
              <ListItemIcon>
                <FlightIcon />
              </ListItemIcon>
              <ListItemText primary="הצג מטוס" primaryTypographyProps={{textAlign:'end'}}/>
            </ListItemButton>
            <Collapse in={ShowPlane}>
              <List disablePadding>
                <ListItem>
                  <ListItemText primary="מטוס שמשון" className='center' sx={{color:'blue'}}/>
                </ListItem>
              </List>
            </Collapse>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <CalculateIcon />
              </ListItemIcon>
              <ListItemText primary="חישוב גובה הצנחה" primaryTypographyProps={{textAlign:'end'}}/>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemText primary="הצג מפת גבהים" primaryTypographyProps={{textAlign:'end'}} onClick={ShowHeightMod}/>
            </ListItemButton>
          </List>
      </Drawer>
      {/* <Map
        mapLib={maplibregl}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        ref={mapRef}
        initialViewState={{
          longitude: 35,
          latitude: 31,
          zoom: 9,
        }}
        style={{ position: "absolute", height: "100%", width: "100vw" }}
        mapStyle="http://localhost:3650/api/maps/israel_1/style.json"
      >
        <FetchSelfData
          isCenter={isCentered}
          center={(lat, lon, zoom, pitch, rot) => {
            setViewState({
              longitude: lon,
              latitude: lat,
              zoom: zoom,
              pitch: pitch,
              bearing: rot,
            });
          }}
          fetchCoordinate={fetchNewData}
          setIsConnect={setIsConnect}
          IsLoaded={isLoaded}
        />
        <CenterMapBtn
          isCenter={isCentered}
          setIsCenter={(value) => setIsCentered(value)}
        />
      </Map> */}

    </Box>
    
  );
};
