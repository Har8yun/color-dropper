import {useEffect, useState} from "react";
import {pickColor} from "../../../utils/colorHelper";

export const useColorDetector = (canvas: HTMLCanvasElement | null) => {
    const [hoveredColor, setHoveredColor] = useState("");

    useEffect(() => {
        if (canvas) {
            canvas.addEventListener("mousemove", (ev: MouseEvent) => {
                const rgbColor = pickColor(ev, canvas);
                setHoveredColor(rgbColor);
            });
        }
    }, [canvas])

    return {
        hoveredColor
    }
}