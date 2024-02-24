import {ImagePexelsType} from "./types";
import Box from "@mui/material/Box";

type MasonryImagesTypes = {
    images: ImagePexelsType[]
};

const MasonryImages = ({images}: MasonryImagesTypes) => {
    const halfIndex = Math.ceil(images.length / 2);
    const firstGroup = images.slice(0, halfIndex);
    const secondGroup = images.slice(halfIndex);

    return (
        <Box className="simple-masonry">
            <Box className="masonry-column">
                {firstGroup.map(image => {
                    return (
                        <img
                            loading="lazy"
                            className="image-thumb"
                            alt={image.alt}
                            key={image.id}
                            src={image.src.medium}
                        />
                    );
                })}
            </Box>
            <Box className="masonry-column">
                {secondGroup.map(image => {
                    return (
                        <img
                            loading="lazy"
                            className="image-thumb"
                            alt={image.alt}
                            key={image.id}
                            src={image.src.medium}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default MasonryImages;
