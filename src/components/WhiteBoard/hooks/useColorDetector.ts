import {useContext, useEffect, useState} from "react";
import {pickColor} from "../../../utils/colorHelper";
import {ImageContext} from "../../../context/ImageContextProvider";

export const useColorDetector = (canvas: HTMLCanvasElement | null, canvasDropper: HTMLCanvasElement | null) => {
    const [hoveredColor, setHoveredColor] = useState("");
    const {isColorDropperActive, isAdvancedDropper} = useContext(ImageContext);
    const [colors, setColors] = useState<string[]>([]);

    useEffect(() => {
        const handler = (ev: MouseEvent) => {
            if (canvas) {
                const {centerColor, colorsSet} = pickColor(ev, canvas);
                setHoveredColor(centerColor);
                setColors(colorsSet);
            }
        };

        if (canvasDropper && (isColorDropperActive || isAdvancedDropper)) {
            canvasDropper.addEventListener("mousemove", handler);
        }

        return () => {
            canvasDropper?.removeEventListener("mousemove", handler);
        }
    }, [canvas, canvasDropper, isColorDropperActive, isAdvancedDropper])

    return {
        hoveredColor,
        colors,
    }
}