import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import {useContext} from "react";
import {ImageContext} from "../../context/ImageContextProvider";

const AdvancedDropper = () => {
    const {isAdvancedDropper, setIsAdvancedDropper} = useContext(ImageContext);
    const clickHandler = () => setIsAdvancedDropper(isActive => !isActive);

    return (
        <Box sx={{marginBottom: "1rem"}}>
            <Button
                color={isAdvancedDropper ? "error" : "success"}
                variant={isAdvancedDropper ? "contained" : "outlined"}
                aria-label="advanced dropper"
                onClick={clickHandler}
                startIcon={<FormatColorFillIcon/>}
            >
                Advanced dropper
            </Button>
        </Box>
    );
};

export default AdvancedDropper;
