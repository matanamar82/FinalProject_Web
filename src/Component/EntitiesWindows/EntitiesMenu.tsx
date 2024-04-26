import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import StraightIcon from '@mui/icons-material/Straight';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ClearIcon from '@mui/icons-material/Clear';

import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { OpenDialog } from '../../state/slices/DialogsSlice';
import HeightIcon from '@mui/icons-material/Height';
import { Noodle } from '../Noodle';
import { GeoCoordinate } from '../GeoCoordinate';
import { RootState } from '../../state/stores/Store';
import { getRhumbLineBearing } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types';


export default function EntitiesMenu({ EntityPoint, DecreaseMenuesCounter, Entity }: any) {
  const [open, setOpen] = useState(true)
  const selfData = useSelector((state: RootState) => state.selfData.selfData);
  const dispatch = useDispatch();
  const { FindShortestPath } = Noodle()

  const handleClose = () => {
    setOpen(false);
    DecreaseMenuesCounter()
  };

  const handleDialog = () => {
    dispatch(OpenDialog(Entity));
    handleClose();
  }

  const handleDirect = () => {
    console.log(selfData)
    // console.log(Entity.geometry.coordinates)
    const target: GeoCoordinate = { latitude: Entity.geometry.coordinates[1], longitude: Entity.geometry.coordinates[0] }
    const SelfPosition:GeolibInputCoordinates = {latitude: selfData.Position.Latitude, longitude: selfData.Position.Longitude}
    // console.log(getRhumbLineBearing(SelfPosition, target))

    // console.log(getRhumbLineBearing({latitude: selfData.Position.Latitude, longitude: selfData.Position.Longitude}, target))
    console.log(FindShortestPath(target, selfData))
    handleClose()
  }

  return (
    <Menu
      id="account-menu"
      open={open}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: EntityPoint.y, left: EntityPoint.x }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&::before': {
            content: '""',
            display: 'block',
            // position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    // transformOrigin={{ horizontal: 'left', vertical: 'top' }}
    // anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    >
      <Box className='closeBtn'>
        <IconButton onClick={handleClose}>
          <ClearIcon fontSize='small' />
        </IconButton>
      </Box>
      <MenuItem onClick={handleDialog}>
        <ListItemIcon>
          <ZoomOutMapIcon fontSize="small" />
        </ListItemIcon>
        הרחבת נתונים - דיאלוג
      </MenuItem>
      {
        Entity.geometry.type === 'Point' && [
          <MenuItem key="direct" onClick={handleDirect}>
            <ListItemIcon>
              <StraightIcon fontSize="small" />
            </ListItemIcon>
            Direct
          </MenuItem>,
          <MenuItem key="height">
            <ListItemIcon>
              <HeightIcon fontSize="small" />
            </ListItemIcon>
            חשב גובה הצנחה
          </MenuItem>
        ]
      }


    </Menu>
  );
}