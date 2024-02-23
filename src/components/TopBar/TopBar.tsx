import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Box from "@mui/material/Box";

const TopBar = () => {
    return (
        <Box position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Photo Editor
                </Typography>

                <Button onClick={() => alert("TODO: export image")} color="error" variant="contained" startIcon={<CloudDownloadIcon />}>
                    Export
                </Button>
            </Toolbar>
        </Box>
    );
};

export default TopBar;
