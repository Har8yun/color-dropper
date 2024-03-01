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
import {useOffScreenCanvas} from "./hooks/useOffScreenCanvas";
import {useInitCanvas} from "./hooks/useInitCanvas";

const WhiteBoard = () => {
    const { isAdvancedDropper, selectedColor } = useContext(ImageContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useInitCanvas(canvasRef);
    const canvasDropperRef = useRef<HTMLCanvasElement>(null);
    const canvasOffRef = useRef<HTMLCanvasElement>(null);
    const {hoveredColor, colors} = useColorDetector(canvasRef, canvasDropperRef);
    useColorChooser(canvasRef, canvasDropperRef);
    const cursorString = useCursorBuilder(selectedColor, colors);
    useImageSelector(canvasRef.current);
    useAdvancedDropper(canvasRef.current, canvasDropperRef.current);
    /** IMPLEMENTS OFF SCREEN CANVAS WITH WEB WORKER **/
    const {
        isOffScreenDropper,
        selectedColor: offScreenSelectedColor,
        hoveredColor: offScreenHoveredColor,
    } = useOffScreenCanvas(canvasOffRef.current, canvasRef.current)

    const centerColor = isOffScreenDropper ? offScreenSelectedColor : (isAdvancedDropper ? selectedColor : "");
    const movementColor = isOffScreenDropper ? offScreenHoveredColor : (isAdvancedDropper ? hoveredColor : hoveredColor);

    return (
        <Box className="whiteBoard-container">
            <Box className="hovered-color"
                 style={{
                     backgroundColor: movementColor,
                     borderColor: centerColor,
                 }}
            >
                {movementColor}
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
                    id="canvas-off"
                    style={{
                        width: `${CANVAS_WIDTH}px`,
                        height: `${CANVAS_WIDTH}px`,
                        zIndex: isOffScreenDropper ? 9999 : 5,
                    }}
                    ref={canvasOffRef}
                    width={CANVAS_SIZE}
                    height={CANVAS_SIZE}
                />
                <canvas
                    id="canvas-dropper"
                    style={{
                        cursor: isAdvancedDropper ? "none" : cursorString,
                        width: `${CANVAS_WIDTH}px`,
                        height: `${CANVAS_WIDTH}px`,
                        zIndex: isAdvancedDropper ? 9999 : 5,
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
