import {useContext, useRef} from "react";
import Box from "@mui/material/Box";
import {CANVAS_SIZE, CANVAS_WIDTH} from "../../constants/constants";
import {useColorDetector} from "./hooks/useColorDetector";
import {useColorChooser} from "./hooks/useColorChooser";
import {useImageSelector} from "./hooks/useImageSelector";
import {useCursorBuilder} from "./hooks/useCursorBuilder";
import {useAdvancedDropper} from "./hooks/useAdvancedDropper";
import {ImageContext} from "../../context/ImageContextProvider";
import "./WhiteBoard.css";

const WhiteBoard = () => {
    const { isAdvancedDropper } = useContext(ImageContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasDropperRef = useRef<HTMLCanvasElement>(null);
    const {hoveredColor, colors} = useColorDetector(canvasRef.current, canvasDropperRef.current);
    const {selectedColor} = useColorChooser(canvasRef.current, canvasDropperRef.current);
    const cursorString = useCursorBuilder(selectedColor, colors)
    useImageSelector(canvasRef.current);
    useAdvancedDropper(canvasRef.current, canvasDropperRef.current)

    return (
        <Box className="whiteBoard-container">
            <Box className="hovered-color"
                 style={{
                     backgroundColor: hoveredColor,
                     borderColor: selectedColor,
                 }}
            >
                {hoveredColor}
            </Box>
            <Box className="canvas-container">
                <canvas
                    id="canvas-board"
                    style={{
                        cursor: cursorString,
                        width: `${CANVAS_WIDTH}px`,
                        height: `${CANVAS_WIDTH}px`,
                    }}
                    ref={canvasRef}
                    width={CANVAS_SIZE}
                    height={CANVAS_SIZE}
                />
                <canvas
                    id="canvas-dropper"
                    style={{
                        cursor: isAdvancedDropper ? "none" : cursorString,
                        width: `${CANVAS_WIDTH}px`,
                        height: `${CANVAS_WIDTH}px`,
                    }}
                    ref={canvasDropperRef}
                    width={CANVAS_SIZE}
                    height={CANVAS_SIZE}
                />
            </Box>
        </Box>
    );
};

export default WhiteBoard;
