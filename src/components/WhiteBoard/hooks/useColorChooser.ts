import {useContext, useEffect} from "react";
import {pickColor} from "../../../utils/colorHelper";
import {ImageContext} from "../../../context/ImageContextProvider";

export const useColorChooser = (canvas: HTMLCanvasElement | null) => {
    const {selectedColor, setSelectedColor, isColorDropperActive} = useContext(ImageContext);

    useEffect(() => {
        const handler = (ev: MouseEvent) => {
            if (canvas) {
                const {centerColor} = pickColor(ev, canvas);
                setSelectedColor(centerColor);
            }
        }

        if (canvas && isColorDropperActive) {
            canvas.addEventListener("click", handler);
        }
        return () => {
            canvas?.removeEventListener("click", handler);
        }
    }, [canvas, isColorDropperActive, setSelectedColor])
    
    
    return {
        selectedColor
    }
}