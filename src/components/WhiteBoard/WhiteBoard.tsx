import {useRef} from "react";
import Box from "@mui/material/Box";
import {CANVAS_SIZE, CANVAS_WIDTH} from "../../constants/constants";
import {useColorDetector} from "./hooks/useColorDetector";
import {useColorChooser} from "./hooks/useColorChooser";
import {useImageSelector} from "./hooks/useImageSelector";
import {useCursorBuilder} from "./hooks/useCursorBuilder";

import "./WhiteBoard.css";

const WhiteBoard = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { hoveredColor, colors } = useColorDetector(canvasRef.current);
    const { selectedColor } = useColorChooser(canvasRef.current);
    const cursorString = useCursorBuilder(selectedColor, colors)
    useImageSelector(canvasRef.current);

    return (
        <Box className="whiteBoard-container">
            <canvas
                style={{
                    backgroundColor: "#fff",
                    cursor: cursorString,
                    width: `${CANVAS_WIDTH}px`,
                    height: `${CANVAS_WIDTH}px`,
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
