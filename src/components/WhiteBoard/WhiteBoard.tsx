import {useRef} from "react";
import Box from "@mui/material/Box";
import {getCursor} from "../../cursor/Cursor";
import {CANVAS_SIZE} from "../../constants/constants";
import {useColorDetector} from "./hooks/useColorDetector";
import {useColorChooser} from "./hooks/useColorChooser";
import {useImageSelector} from "./hooks/useImageSelector";

import "./WhiteBoard.css";

const WhiteBoard = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { hoveredColor, colors } = useColorDetector(canvasRef.current);
    const { selectedColor } = useColorChooser(canvasRef.current);
    const cursorString = getCursor(selectedColor, colors);
    useImageSelector(canvasRef.current);

    return (
        <Box className="whiteBoard-container">
            <canvas
                style={{
                    backgroundColor: "#fff",
                    cursor: `url("${cursorString}") 64 64, default`,
                    width: `${CANVAS_SIZE}px`,
                    height: `${CANVAS_SIZE}px`,
                }}
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
            />
            <Box className={"hovered-color"}
                 style={{
                     backgroundColor: hoveredColor,
                     borderColor: selectedColor,
                 }}
            >
                {hoveredColor}
            </Box>
        </Box>
    );
};

export default WhiteBoard;
