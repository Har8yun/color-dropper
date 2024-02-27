import {useContext, useEffect} from "react";
import {pickColor} from "../../../utils/colorHelper";
import {ImageContext} from "../../../context/ImageContextProvider";

export const useColorChooser = (canvas: HTMLCanvasElement | null) => {
    const {selectedColor, setSelectedColor} = useContext(ImageContext);
    
    useEffect(() => {
        if (canvas) {
            canvas.addEventListener("click", (ev: MouseEvent) => {
                const {centerColor} = pickColor(ev, canvas);
                setSelectedColor(centerColor);
            });
        }
    }, [canvas, setSelectedColor])
    
    
    return {
        selectedColor
    }
}