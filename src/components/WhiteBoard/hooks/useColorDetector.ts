import {useContext, useEffect, useState} from "react";
import {pickColor} from "../../../utils/colorHelper";
import {ImageContext} from "../../../context/ImageContextProvider";

type TrackColor = {
    hoveredColor: string,
    colors: string[],
}

export const useColorDetector = (canvas: HTMLCanvasElement | null, canvasDropper: HTMLCanvasElement | null) => {
    const [{hoveredColor, colors}, setHoveredColor] = useState<TrackColor>({hoveredColor: "", colors: []});
    const {isColorDropperActive} = useContext(ImageContext);

    useEffect(() => {
        const handler = (ev: MouseEvent) => {
            if (canvas) {
                const {centerColor, colorsSet} = pickColor(ev, canvas);
                setHoveredColor({hoveredColor: centerColor, colors: colorsSet});
            }
        };

        if (canvasDropper && (isColorDropperActive)) {
            canvasDropper.addEventListener("mousemove", handler);
        }

        return () => {
            canvasDropper?.removeEventListener("mousemove", handler);
        }
    }, [canvas, canvasDropper, isColorDropperActive])

    return {
        hoveredColor,
        colors,
    }
}