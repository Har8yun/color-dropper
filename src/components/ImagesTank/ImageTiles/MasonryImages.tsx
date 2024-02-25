import {ImagePexelsType} from "./types";
import Box from "@mui/material/Box";
import {useContext} from "react";
import {ImageContext} from "../../../context/ImageContextProvider";

type MasonryImagesTypes = {
    images: ImagePexelsType[]
};

const MasonryImages = ({images}: MasonryImagesTypes) => {
    const thirdIndex = Math.ceil(images.length / 3);
    const firstGroup = images.slice(0, thirdIndex);
    const secondIndex = 2 * thirdIndex;
    const secondGroup = images.slice(thirdIndex, secondIndex);
    const thirdGroup = images.slice(secondIndex);

    const {setSelectedImage} = useContext(ImageContext);

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
                            onClick={() => setSelectedImage(image.src.original)}
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
                            onClick={() => setSelectedImage(image.src.original)}
                        />
                    );
                })}
            </Box>
            <Box className="masonry-column">
                {thirdGroup.map(image => {
                    return (
                        <img
                            loading="lazy"
                            className="image-thumb"
                            alt={image.alt}
                            key={image.id}
                            src={image.src.medium}
                            onClick={() => setSelectedImage(image.src.original)}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default MasonryImages;
