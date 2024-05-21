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
import { useDispatch } from 'react-redux';
import { FlightLeg, Wpt } from '../state/slices/PinModeSlice';

export const Bar = () => {
  const dispatch = useDispatch();
  const [ShowPlane, SetShow] = useState<boolean>(false)
  function HandleShow() {
    SetShow(!ShowPlane);
  }

  return (
    <Box>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h5'>map</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          '& .MuiDrawer-paper': {
            width: 100,
          },
        }}

      >
        <Toolbar />
        <List sx={{ overflowY: 'auto' }}>
          {/* <ListItem sx={{ justifyContent: 'center' }}>
            <Tooltip title="הצג מטוס" placement='left'>
              <IconButton onClick={HandleShow}>
                <FlightIcon sx={{ fontSize: '40px' }} />
              </IconButton>
            </Tooltip>
          </ListItem>
          <Collapse in={ShowPlane}>
            <List disablePadding>
              <ListItem>
                <ListItemText primary="מטוס שמשון" className='center' sx={{ color: 'blue' }} />
              </ListItem>
            </List>
          </Collapse>
          <Divider /> */}
          <ListItem sx={{ justifyContent: 'center' }}>
            <Tooltip title="בחר לג טיסה" placement='left'>
              <IconButton onClick={() => dispatch(FlightLeg())}>
                <FlightLandIcon sx={{ fontSize: '40px' }} />
              </IconButton>
            </Tooltip>
          </ListItem>
          <Divider />
          <ListItem sx={{ justifyContent: 'center' }}>
            <Tooltip title="בחר נקודת ניווט" placement='left'>
              <IconButton onClick={() => dispatch(Wpt())}>
                <PinDropIcon sx={{ fontSize: '40px' }} />
              </IconButton>
            </Tooltip>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </Box>

  );
};
