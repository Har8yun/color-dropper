import FormControl from "@mui/material/FormControl";
import {TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TagIcon from "@mui/icons-material/Tag";
import {memo, useContext} from "react";
import {ImageContext} from "../../context/ImageContextProvider";
import Box from "@mui/material/Box";

import "./SelectedColor.css";

const SelectedColor = memo(() => {
    const { selectedColor } = useContext(ImageContext);

    return (
        <FormControl size="small" variant="filled" fullWidth>
            <TextField
                value={selectedColor}
                id="current-color"
                type="text"

                label="Current Color"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <TagIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="start">
                            <Box className="selected-color" sx={{ backgroundColor: selectedColor}} />
                        </InputAdornment>
                    ),
                }}
            />
        </FormControl>
    );
});

export default SelectedColor;
