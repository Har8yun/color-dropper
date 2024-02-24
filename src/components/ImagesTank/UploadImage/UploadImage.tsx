import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadImage = () => {
    return (
        <Box sx={{marginBottom: "1rem"}}>
            <Button
                onClick={() => alert("TODO: upload image")}
                fullWidth
                color="error"
                variant="contained"
                startIcon={<CloudUploadIcon />}
            >
                Upload Image
            </Button>
        </Box>
    );
};

export default UploadImage;
