import {RefObject, useContext, useEffect, useState} from "react";
import {ImageContext} from "../../../context/ImageContextProvider";
import {CANVAS_RATIO} from "../../../constants/constants";
import {pickColor} from "../../../utils/colorHelper";
import {CanvasAdvancedCursor} from "../CanvasAdvancedCursor";

export const useAdvancedDropper = (canvasRef: RefObject<HTMLCanvasElement>, canvasDropperRef: RefObject<HTMLCanvasElement>) => {
    const {isAdvancedDropper} = useContext(ImageContext);
    const [hoveredColor, setHoveredColor] = useState("");

    useEffect(() => {
        const canvasDropper = canvasDropperRef.current;

        if (canvasDropper) {
            const canvasDrawer = new CanvasAdvancedCursor(canvasDropper)

            const outHandler = () => {
                canvasDrawer?.clear()
            };

            const handler = (ev: MouseEvent) => {
                if (canvasDropper && canvasRef.current) {
                    const bounding = canvasDrawer.canvas.getBoundingClientRect();
                    canvasDrawer.x = ~~((ev.clientX - bounding.left) * CANVAS_RATIO);
                    canvasDrawer.y = ~~((ev.clientY - bounding.top) * CANVAS_RATIO);
                    const {centerColor, colorsSet} = pickColor(ev, canvasRef.current);
                    canvasDrawer.draw(centerColor, colorsSet);
                    setHoveredColor(centerColor);
                }
            }

            if (isAdvancedDropper) {
                canvasDropper.addEventListener("mousemove", handler);
                canvasDropper.addEventListener("mouseout", outHandler);
            }

            return () => {
                if (canvasDropper) {
                    canvasDropper.removeEventListener("mousemove", handler);
                    canvasDropper.addEventListener("mouseout", outHandler);
                }
            }
        }

    }, [canvasDropperRef, canvasRef, isAdvancedDropper]);

    return {
        advancedHoverColor: hoveredColor,
    }
};