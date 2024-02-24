import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./ImageTiles.css";

type ImagePexelsType = {
    id: number,
    alt: string,
    src: {
        medium: string,
        small: string,
        tiny: string,
    }
};

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
                    images.map(image => {
                        return (
                            <img
                                loading="lazy"
                                className="image-thumb"
                                alt={image.alt}
                                key={image.id}
                                src={image.src.medium}
                            />
                        );
                    })
                }
            </Box>
        </Box>
    );
};

export default ImageTiles;
