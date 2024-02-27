import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ColorizeIcon from "@mui/icons-material/Colorize";
import {useContext} from "react";
import {ImageContext} from "../../context/ImageContextProvider";

const ProColorPicker = () => {
    const {isColorDropperActive, setIsColorDropperActive} = useContext(ImageContext);
    const iconClickHandler = () => setIsColorDropperActive(isActive => !isActive);

    return (
        <Box sx={{marginBottom: "1rem"}}>
            <Button
                color={isColorDropperActive ? "error" : "primary"}
                variant={isColorDropperActive ? "contained" : "outlined"}
                aria-label="color dropper"
                onClick={iconClickHandler}
            >
                <ColorizeIcon/> Pro Color Picker
            </Button>
        </Box>
    );
};

export default ProColorPicker;
