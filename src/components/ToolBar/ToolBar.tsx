import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ImageIcon from "@mui/icons-material/Image";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import {useNavigate} from "react-router-dom";
import {APP_ROUTER} from "../../context/constants";
import HomeIcon from '@mui/icons-material/Home';
import Box from "@mui/material/Box";
import "./ToolBar.css";
import {Paper} from "@mui/material";

const ToolBar = () => {
    const navigate = useNavigate();
    const goHome = () => navigate(APP_ROUTER.HOME);
    const goImages = () => navigate(APP_ROUTER.IMAGES_TANK);
    const goColorPicker = () => navigate(APP_ROUTER.COLOR_PICKER);

    return (
        <Paper elevation={2} className="app-toolbar">
            <Divider/>
            <List>
                <ListItem disablePadding sx={{display: 'block'}}>
                    <ListItemButton onClick={goHome} sx={{minHeight: 48, justifyContent: 'center', px: 2.5,}}>
                        <ListItemIcon sx={{minWidth: 0, mr: 'auto', justifyContent: 'center',}}>
                            <HomeIcon/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{display: 'block'}}>
                    <ListItemButton onClick={goImages} sx={{minHeight: 48, justifyContent: 'center', px: 2.5,}}>
                        <ListItemIcon sx={{minWidth: 0, mr: 'auto', justifyContent: 'center',}}>
                            <ImageIcon/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem onClick={goColorPicker} disablePadding sx={{display: 'block'}}>
                    <ListItemButton sx={{minHeight: 48, justifyContent: 'center', px: 2.5,}}>
                        <ListItemIcon sx={{minWidth: 0, mr: 'auto', justifyContent: 'center',}}>
                            <ColorLensIcon/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
        </Paper>
    );
};

export default ToolBar;