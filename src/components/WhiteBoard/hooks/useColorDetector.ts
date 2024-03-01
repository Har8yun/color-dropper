import {RefObject, useContext, useEffect, useState} from "react";
import {pickColor} from "../../../utils/colorHelper";
import {ImageContext} from "../../../context/ImageContextProvider";

type TrackColor = {
    hoveredColor: string,
    colors: string[],
}

export const useColorDetector = (canvasRef: RefObject<HTMLCanvasElement>, canvasDropperRef: RefObject<HTMLCanvasElement>) => {
    const [{hoveredColor, colors}, setHoveredColor] = useState<TrackColor>({hoveredColor: "", colors: []});
    const {isColorDropperActive} = useContext(ImageContext);

    useEffect(() => {
        const handler = (ev: MouseEvent) => {
            if (canvasRef.current) {
                const {centerColor, colorsSet} = pickColor(ev, canvasRef.current);
                setHoveredColor({hoveredColor: centerColor, colors: colorsSet});
            }
        };

        const canvasDropper = canvasDropperRef.current;
        if (canvasDropper && (isColorDropperActive)) {
            canvasDropper.addEventListener("mousemove", handler);
        }

        return () => {
            canvasDropper?.removeEventListener("mousemove", handler);
        }
    }, [isColorDropperActive, canvasRef, canvasDropperRef])

    return {
        hoveredColor,
        colors,
    }
}