import ToolWrapper from "../ToolWrapper/ToolWrapper";
import Typography from "@mui/material/Typography";
import DefaultColorPicker from "./DefaultColorPicker";
import SelectedColor from "./SelectedColor";
import ProColorPicker from "./ProColorPicker";
import AdvancedDropper from "./AdvancedDropper";

const ColorPicker = () => {
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