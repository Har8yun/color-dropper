import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, {useContext} from "react";
import {ImageContext} from "../../../context/ImageContextProvider";

const UploadImage = () => {
    const { setSelectedImage, PhotoIndexedDBInstance } = useContext(ImageContext);

    const handleImage = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = function(event: ProgressEvent<FileReader>){
            if (event?.target?.result) {
                setSelectedImage(event.target.result as string);
            }
        }

        if (ev.target.files) {
            reader.readAsDataURL(ev.target.files[0]);
            PhotoIndexedDBInstance.addPhoto(ev.target.files[0]);
        }
    }

    return (
        <Box sx={{marginBottom: "1rem"}}>
            <Button
                component="label"
                fullWidth
                color="error"
                variant="contained"
                startIcon={<CloudUploadIcon />}
            >
                Upload Image
                <input
                    style={{display: "none"}}
                    type="file"
                    id="image"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={handleImage}
                />
            </Button>
        </Box>
    );
};

export default UploadImage;
