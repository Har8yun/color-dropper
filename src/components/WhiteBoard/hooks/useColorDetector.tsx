import {useContext, useEffect, useState} from "react";
import {pickColor} from "../../../utils/colorHelper";
import {ImageContext} from "../../../context/ImageContextProvider";

export const useColorDetector = (canvas: HTMLCanvasElement | null) => {
    const [hoveredColor, setHoveredColor] = useState("");
    const {isColorDropperActive} = useContext(ImageContext);
    const [colors, setColors] = useState<string[]>([]);

    useEffect(() => {
        const handler = (ev: MouseEvent) => {
            if (canvas) {
                const {centerColor, colorsSet} = pickColor(ev, canvas);
                setHoveredColor(centerColor);
                setColors(colorsSet);
            }
        };

        if (canvas && isColorDropperActive) {
            canvas.addEventListener("mousemove", handler);
        }

        return () => {
            canvas?.removeEventListener("mousemove", handler);
        }
    }, [canvas, isColorDropperActive])

    return {
        hoveredColor,
        colors,
    }
}