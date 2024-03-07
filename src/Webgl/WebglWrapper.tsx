import Box from "@mui/material/Box";
import {useWebgl} from "./useWebgl";
import "./WebglWrapper.css";

const WebglWrapper = () => {
    const {canvasRef} = useWebgl();
    return (
        <Box className="webgl-container">
            <canvas ref={canvasRef} id="glcanvas" width="640" height="480"></canvas>
        </Box>
    );
};

export default WebglWrapper;