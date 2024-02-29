import {useCallback, useContext, useEffect, useMemo} from "react";
import {ImageContext} from "../../../context/ImageContextProvider";
import {CANVAS_RATIO} from "../../../constants/constants";
import {pickColor} from "../../../utils/colorHelper";
import {CanvasAdvancedCursor} from "../CanvasAdvancedCursor";

export const useAdvancedDropper = (canvas: HTMLCanvasElement | null, canvasDropper: HTMLCanvasElement | null) => {
    const {isAdvancedDropper} = useContext(ImageContext);
    const canvasDrawer = useMemo(() => canvasDropper && new CanvasAdvancedCursor(canvasDropper), [canvasDropper]);

    const outHandler = useCallback(() => {
        canvasDrawer?.clear()
    }, [canvasDrawer])

    const handler = useCallback((ev: MouseEvent) => {
        if (canvasDrawer && canvas) {
            const bounding = canvasDrawer.canvas.getBoundingClientRect();
            canvasDrawer.x = ~~((ev.clientX - bounding.left) * CANVAS_RATIO);
            canvasDrawer.y = ~~((ev.clientY - bounding.top) * CANVAS_RATIO);
            const {centerColor, colorsSet} = pickColor(ev, canvas);
            canvasDrawer.draw(centerColor, colorsSet);
        }
    }, [canvas, canvasDrawer])

    useEffect(() => {
        if (canvasDropper && isAdvancedDropper) {
            canvasDropper.addEventListener("mousemove", handler);
            canvasDropper.addEventListener("mouseout", outHandler);
        }

        return () => {
            if (canvasDropper) {
                canvasDropper.removeEventListener("mousemove", handler);
                canvasDropper.addEventListener("mouseout", outHandler);
            }
        }
    }, [canvasDropper, handler, isAdvancedDropper, outHandler]);
};