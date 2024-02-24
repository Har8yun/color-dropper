import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./ImageTiles.css";
import {ImagePexelsType} from "./types";
import MasonryImages from "./MasonryImages";
import {CircularProgress} from "@mui/material";

const ImageTiles = ({images, isLoading}: { images: ImagePexelsType[], isLoading: Boolean }) => {
    return (
        <Box className="image-tiles">
            <Typography variant="h6">
                Library
            </Typography>
            {isLoading
                ?
                <Box sx={{textAlign: "center"}}>
                    <CircularProgress  color="secondary" />
                </Box>
                :
                <MasonryImages images={images} />
            }
        </Box>
    );
};

export default ImageTiles;
