import {useContext, useEffect} from "react";
import {pickColor} from "../../../utils/colorHelper";
import {ImageContext} from "../../../context/ImageContextProvider";

export const useColorChooser = (canvas: HTMLCanvasElement | null) => {
    const {selectedColor, setSelectedColor} = useContext(ImageContext);
    
    useEffect(() => {
        if (canvas) {
            canvas.addEventListener("click", (ev: MouseEvent) => {
                const rgbColor = pickColor(ev, canvas);
                setSelectedColor(rgbColor);
            });
        }
    }, [canvas, setSelectedColor])
    
    
    return {
        selectedColor
    }
}