import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import StraightIcon from '@mui/icons-material/Straight';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { useEffect, useState } from 'react';

export default function EntitiesMenu({Entity, DecreaseMenuesCounter}:any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(true) 

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget); // יתן את המקום הנוכחי של האובייקט
  };
  const handleClose = () => {
    setOpen(false);
    DecreaseMenuesCounter()
    // setOpenMenu(false)
  };

  useEffect(() => {
    console.log(Entity)
  }, [])
  return (
    <Box>
        <Box>
          <Menu
            id="account-menu"
            open={open}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{ top: Entity.y, left: Entity.x }}
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
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                  <ZoomOutMapIcon fontSize="small" />
              </ListItemIcon>
              הרחבת נתונים
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                  <StraightIcon fontSize="small" />
              </ListItemIcon>
              Direct
            </MenuItem>
          </Menu>
        </Box>
    </Box>
  );
}