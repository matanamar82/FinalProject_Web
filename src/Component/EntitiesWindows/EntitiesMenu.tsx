import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import StraightIcon from '@mui/icons-material/Straight';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ClearIcon from '@mui/icons-material/Clear';

import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { OpenDialog } from '../../state/slices/DialogsSlice';
import { MapboxGeoJSONFeature } from 'mapbox-gl';

export default function EntitiesMenu({EntityPoint, DecreaseMenuesCounter, Entity}:any) {
  const [open, setOpen] = useState(true) 
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    DecreaseMenuesCounter()
    // setOpenMenu(false)
  };

  const handleDialog = () => {
    dispatch(OpenDialog(Entity));
    handleClose();
  }
  useEffect(() => {
    console.log(EntityPoint)
    console.log(Entity)
  }, [])
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
          <ClearIcon fontSize='small'/>
        </IconButton>
      </Box>
      <MenuItem onClick={handleDialog}>
        <ListItemIcon>
          <ZoomOutMapIcon fontSize="small" />
        </ListItemIcon>
        הרחבת נתונים - דיאלוג
      </MenuItem>
      
      <MenuItem>
        <ListItemIcon>
          <StraightIcon fontSize="small" />
        </ListItemIcon>
        Direct
      </MenuItem>
    </Menu>
  );
}