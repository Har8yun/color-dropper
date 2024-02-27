import {useContext, useMemo} from "react";
import {getCursor} from "../../../cursor/Cursor";
import {ImageContext} from "../../../context/ImageContextProvider";

export const useCursorBuilder = (selectedColor: string, colors: string[]) => {
    const {isColorDropperActive} = useContext(ImageContext);

    return useMemo(() => {
        if (isColorDropperActive) {
            const svgStr = getCursor(selectedColor, colors);
            return `url("${svgStr}") 64 64, default`;
        }

        return "default";
    }, [colors, isColorDropperActive, selectedColor]);
}