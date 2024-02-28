import {useContext, useEffect} from "react";
import {pickColor} from "../../../utils/colorHelper";
import {ImageContext} from "../../../context/ImageContextProvider";

export const useColorChooser = (canvas: HTMLCanvasElement | null, canvasDropper: HTMLCanvasElement | null) => {
    const {selectedColor, setSelectedColor, isColorDropperActive, isAdvancedDropper} = useContext(ImageContext);

    useEffect(() => {
        const handler = (ev: MouseEvent) => {
            if (canvas) {
                const {centerColor} = pickColor(ev, canvas);
                setSelectedColor(centerColor);
            }
        }

        if (canvasDropper && (isColorDropperActive || isAdvancedDropper)) {
            canvasDropper.addEventListener("click", handler);
        }
        return () => {
            canvasDropper?.removeEventListener("click", handler);
        }
    }, [canvasDropper, isColorDropperActive, isAdvancedDropper, setSelectedColor, canvas])
    
    
    return {
        selectedColor
    }
}