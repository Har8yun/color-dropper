import {useEffect, RefObject} from "react";
import {CANVAS_BACK_COLOR} from "../../../constants/constants";

export const useInitCanvas = (canvasRef: RefObject<HTMLCanvasElement>) => {

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                ctx.beginPath();
                ctx.fillStyle = CANVAS_BACK_COLOR;
                ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.closePath();
            }
        }
    }, [canvasRef]);
}