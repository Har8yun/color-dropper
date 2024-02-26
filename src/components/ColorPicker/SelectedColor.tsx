import FormControl from "@mui/material/FormControl";
import {TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TagIcon from "@mui/icons-material/Tag";
import React, {memo, useContext} from "react";
import {ImageContext} from "../../context/ImageContextProvider";
import Box from "@mui/material/Box";

import "./SelectedColor.css";
import Typography from "@mui/material/Typography";

const SelectedColor = memo(() => {
    const {selectedColor} = useContext(ImageContext);

    return (
        <Box className="selected-color-container">

            <FormControl size="small" variant="filled" fullWidth>
                <TextField
                    value={selectedColor}
                    id="current-color"
                    type="text"
                    label="Current Color"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TagIcon/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="start">
                                <Box className="selected-color" sx={{backgroundColor: selectedColor}}/>
                            </InputAdornment>
                        ),
                    }}
                />
            </FormControl>

            <Typography variant="h6" className="selected-color-title">
                Text example with current color
            </Typography>
            <Typography className="selected-color-text" style={{color: selectedColor}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed nec imperdiet urna, sit amet ultricies massa. Suspendisse
                tempus ornare dui. Aliquam erat volutpat. Vivamus porttitor maximus laoreet.
                Integer quis interdum tortor.
            </Typography>
        </Box>
    );
});

export default SelectedColor;
