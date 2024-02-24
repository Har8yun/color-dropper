import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./ImageTiles.css";
import {ImagePexelsType} from "./types";
import MasonryImages from "./MasonryImages";

const ImageTiles = ({images, isLoading}: { images: ImagePexelsType[], isLoading: Boolean }) => {
    return (
        <Box className="image-tiles">
            <Typography variant="h6">
                Library
            </Typography>
            <Box>
                {isLoading
                    ?
                    "...Images are Loading"
                    :
                    <MasonryImages images={images} />
                }
            </Box>
        </Box>
    );
};

export default ImageTiles;
