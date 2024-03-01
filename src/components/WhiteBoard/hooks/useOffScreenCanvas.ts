import {useContext, useEffect, useRef, useState} from "react";
import offScreenPointer from "../../../workers/offScreenPointer";
import WorkerFactory from "../../../workers/WorkerFactory";
import {CANVAS_RATIO} from "../../../constants/constants";
import {pickColor} from "../../../utils/colorHelper";
import {ImageContext} from "../../../context/ImageContextProvider";

/**
 *  IMPLEMENTS OFF SCREEN CANVAS WITH WEB WORKER
 *  **/
export const useOffScreenCanvas = (canvasOff: HTMLCanvasElement | null, canvasBoard: HTMLCanvasElement | null) => {
    const {isOffScreenDropper} = useContext(ImageContext);
    const offScreenWorker = useRef<WorkerFactory>();
    const [selectedColor, setSelectedColor] = useState("");
    const [hoveredColor, setHoveredColor] = useState("");

    useEffect(() => {
        if (canvasOff && isOffScreenDropper && !offScreenWorker.current) {
            offScreenWorker.current = new WorkerFactory(offScreenPointer);

            const canvasWorker = canvasOff.transferControlToOffscreen();
            // @ts-ignore
            offScreenWorker.current.onmessage = function (event: MessageEvent) {
            };

            // @ts-ignore
            offScreenWorker.current.postMessage({
                canvas: canvasWorker,
                x: 0,
                y: 0
            }, [canvasWorker]);

            return () => {
                // @ts-ignore
                offScreenWorker.current.terminate();
            };
        }
    }, [canvasOff, isOffScreenDropper]);

    useEffect(() => {
        if (isOffScreenDropper) {
            const handler = (ev: MouseEvent) => {
                if (canvasOff && canvasBoard) {
                    const bounding = canvasOff.getBoundingClientRect();
                    const x = ~~((ev.clientX - bounding.left) * CANVAS_RATIO);
                    const y = ~~((ev.clientY - bounding.top) * CANVAS_RATIO);
                    const {centerColor, colorsSet} = pickColor(ev, canvasBoard);
                    // @ts-ignore
                    offScreenWorker.current.postMessage({coordinates: {x, y}, centerColor, colorsSet});

                    setHoveredColor(centerColor);
                }
            };


            const outHandler = () => {
                // @ts-ignore
                offScreenWorker.current.postMessage({clear: true});
            }



            if (canvasOff) {
                canvasOff.addEventListener("mousemove", handler);
                canvasOff.addEventListener("mouseout", outHandler);

            }

            return () => {
                canvasOff?.removeEventListener("mousemove", handler);
                canvasOff?.removeEventListener("mouseout", outHandler);
            }
        }
    }, [canvasBoard, canvasOff, isOffScreenDropper]);
    
    
    useEffect(() => {
        const handler = (ev: MouseEvent) => {
            if (canvasOff && canvasBoard) {
                const {centerColor} = pickColor(ev, canvasBoard);
                setSelectedColor(centerColor);
            }
        }

        if (canvasOff && isOffScreenDropper) {
            canvasOff.addEventListener("click", handler);
        }
        return () => {
            canvasOff?.removeEventListener("click", handler);
        }
    }, [canvasBoard, canvasOff, isOffScreenDropper])

    return {
        isOffScreenDropper,
        selectedColor,
        hoveredColor,
    };
}
