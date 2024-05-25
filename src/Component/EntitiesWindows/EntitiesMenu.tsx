import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import StraightIcon from '@mui/icons-material/Straight';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ClearIcon from '@mui/icons-material/Clear';

import { useState } from 'react';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { OpenDialog } from '../../state/slices/DialogsSlice';
import HeightIcon from '@mui/icons-material/Height';
import { Noodle } from '../Noodle';
import { GeolibCoordinate } from '../../types/GeoCoordinate';
import { RootState } from '../../state/stores/Store';
import { setDirect } from '../../state/slices/NoodleSlice';


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
    const target: GeolibCoordinate = { latitude: Entity.geometry.coordinates[1], longitude: Entity.geometry.coordinates[0] }
    if ((selfData.Position.Latitude != 0) && (selfData.Position.Longitude != 0))
      dispatch(setDirect(FindShortestPath(target, selfData)))
    else
      alert("לא התקבלו עדיין נתונים על המיקום הנוכחי של המטוס, נסה שנית מאוחר יותר")
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
        הרחבת נתונים
      </MenuItem>
      {
        Entity.geometry.type === 'Point' && [
          <MenuItem key="direct" onClick={handleDirect}>
            <ListItemIcon>
              <StraightIcon fontSize="small" />
            </ListItemIcon>
            Direct
          </MenuItem>,
        ]
      }


    </Menu>
  );
}