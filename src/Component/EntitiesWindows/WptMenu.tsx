import { ListItemIcon, MenuItem } from "@mui/material"
import StraightIcon from '@mui/icons-material/Straight';
import HeightIcon from '@mui/icons-material/Height';

export const WptMenu = () => {
    return (
        <>
            <MenuItem>
                <ListItemIcon>
                    <StraightIcon fontSize="small" />
                </ListItemIcon>
                Direct
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <HeightIcon fontSize="small" />
                </ListItemIcon>
                חשב גובה הצנחה
            </MenuItem>
        </>
    )
}