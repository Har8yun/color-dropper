import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useContext} from "react";
import {ImageContext} from "../../context/ImageContextProvider";
import BoltIcon from '@mui/icons-material/Bolt';

const OffScreenDropper = () => {
    const {isOffScreenDropper, setIsOffScreenDropper} = useContext(ImageContext);
    const clickHandler = () => setIsOffScreenDropper(!isOffScreenDropper);

    return (
        <Box sx={{marginBottom: "1rem"}}>
            <Tooltip title="Using offscreen canvas and webworker">
                <Button
                    color={isOffScreenDropper ? "error" : "success"}
                    variant={isOffScreenDropper ? "contained" : "outlined"}
                    aria-label="Off screen dropper"
                    onClick={clickHandler}
                    startIcon={<BoltIcon/>}
                    endIcon={<BoltIcon/>}
                >
                    Off screen dropper
                </Button>
            </Tooltip>
            <Typography variant="caption" display="block" gutterBottom>
                Off Screen button activates offscreen and web-workers mode
            </Typography>
        </Box>
    );
};

export default OffScreenDropper;
