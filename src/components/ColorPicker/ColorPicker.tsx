import ToolWrapper from "../ToolWrapper/ToolWrapper";
import Typography from "@mui/material/Typography";
import DefaultColorPicker from "./DefaultColorPicker";
import SelectedColor from "./SelectedColor";
import ProColorPicker from "./ProColorPicker";
import {useContext, useEffect} from "react";
import {ImageContext} from "../../context/ImageContextProvider";
import AdvancedDropper from "./AdvancedDropper";

const ColorPicker = () => {
    const {setIsColorDropperActive} = useContext(ImageContext);
    useEffect(() => {
        return () => {
            setIsColorDropperActive(false);
        }
    }, [setIsColorDropperActive])

    return (
        <ToolWrapper>
            <Typography variant="h6" sx={{textAlign: "center"}}>
                Color Dropper
            </Typography>

            <DefaultColorPicker/>

            <ProColorPicker/>

            <AdvancedDropper />

            <SelectedColor/>
        </ToolWrapper>
    );
};

export default ColorPicker;