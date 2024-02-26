import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useContext} from "react";
import Typography from "@mui/material/Typography";
import {ImageContext} from "../../context/ImageContextProvider";

const DefaultColorPicker = () => {
    const {setSelectedColor} = useContext(ImageContext);

    const handleEye = () => {
        const eyeDropper = new window.EyeDropper();

        eyeDropper.open()
            .then((result: { sRGBHex: string; }) => {
                setSelectedColor(result.sRGBHex);
            })
            .catch((error: Error) => {
                // todo - better catch
                console.log("[EyeDropper]: Something went wrong", error)
            });
    }

    return (
        <Box sx={{margin: "1rem auto"}}>
            {window.EyeDropper
                ?
                <Button
                    onClick={handleEye}
                    id="start-button"
                    color="primary"
                    variant="outlined"
                >
                    Easy picker
                </Button>
                :
                <Typography>
                    Your browser does not support the EyeDropper API
                </Typography>
            }
        </Box>
    );
};

export default DefaultColorPicker;