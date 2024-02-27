import {useEffect, useState} from "react";
import {pickColor} from "../../../utils/colorHelper";

export const useColorDetector = (canvas: HTMLCanvasElement | null) => {
    const [hoveredColor, setHoveredColor] = useState("");
    const [colors, setColors] = useState<string[]>([]);

    useEffect(() => {
        if (canvas) {
            canvas.addEventListener("mousemove", (ev: MouseEvent) => {
                const {centerColor, colorsSet} = pickColor(ev, canvas);
                setHoveredColor(centerColor);
                setColors(colorsSet);
            });
        }
    }, [canvas])

    return {
        hoveredColor,
        colors,
    }
}