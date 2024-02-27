import {useMemo} from "react";
import {getCursor} from "../../../cursor/Cursor";

export const useCursorBuilder = (isColorDropperActive: boolean, selectedColor: string, colors: string[]) => {
    return useMemo(() => {
        if (isColorDropperActive) {
            const svgStr = getCursor(selectedColor, colors);
            return `url("${svgStr}") 64 64, default`;

        }

        return "default";
    }, [colors, isColorDropperActive, selectedColor]);
}