import {useEffect, useRef} from "react";
import {main} from "./webgl-demo";

export const useWebgl = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        main(canvasRef.current);
    }, [])

    return {
        canvasRef,
    }
};
