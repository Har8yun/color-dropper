import {RefObject, useContext, useEffect} from "react";
import {pickColor} from "../../../utils/colorHelper";
import {ImageContext} from "../../../context/ImageContextProvider";

export const useColorChooser = (canvasRef: RefObject<HTMLCanvasElement>, canvasDropperRef: RefObject<HTMLCanvasElement>) => {
    const {selectedColor, setSelectedColor, isColorDropperActive, isAdvancedDropper} = useContext(ImageContext);

    useEffect(() => {
        const handler = (ev: MouseEvent) => {
            if (canvasRef.current) {
                const {centerColor} = pickColor(ev, canvasRef.current);
                setSelectedColor(centerColor);
            }
        }

        const canvasDropper = canvasDropperRef.current;
        if (canvasDropper && (isColorDropperActive || isAdvancedDropper)) {
            canvasDropper.addEventListener("click", handler);
        }
        return () => {
            canvasDropper?.removeEventListener("click", handler);
        }
    }, [canvasDropperRef, canvasRef, isAdvancedDropper, isColorDropperActive, setSelectedColor])

    return {
        selectedColor
    }
}