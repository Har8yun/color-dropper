import {RefObject, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import offScreenPointer from "../../../workers/offScreenPointer";
import WorkerFactory from "../../../workers/WorkerFactory";
import {CANVAS_RATIO} from "../../../constants/constants";
import {pickColor} from "../../../utils/colorHelper";
import {ImageContext} from "../../../context/ImageContextProvider";

/**
 *  IMPLEMENTS OFF SCREEN CANVAS WITH WEB WORKER
 *  **/
export const useOffScreenCanvas = (canvasBoardRef: RefObject<HTMLCanvasElement>, canvasOffRef: RefObject<HTMLCanvasElement>) => {
    const {isOffScreenDropper, selectedColor, setSelectedColor} = useContext(ImageContext);
    const offScreenWorker = useRef<WorkerFactory>();
    const [hoveredColor, setHoveredColor] = useState("");
    const canvasWorker = useMemo(() => {
        if (canvasOffRef.current) {
            return canvasOffRef.current.transferControlToOffscreen();
        }
    }, [canvasOffRef])

    useEffect(() => {
        if (canvasOffRef.current && isOffScreenDropper && !offScreenWorker.current) {
            offScreenWorker.current = new WorkerFactory(offScreenPointer);

            const canvasWorker = canvasOffRef.current.transferControlToOffscreen();
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
                // offScreenWorker.current.terminate();
            };
        }
    }, [canvasOffRef, canvasWorker, isOffScreenDropper]);

    useEffect(() => {
        if (isOffScreenDropper) {
            const canvasOff = canvasOffRef.current;

            const handler = (ev: MouseEvent) => {
                if (canvasOff && canvasBoardRef.current) {
                    const bounding = canvasOff.getBoundingClientRect();
                    const x = ~~((ev.clientX - bounding.left) * CANVAS_RATIO);
                    const y = ~~((ev.clientY - bounding.top) * CANVAS_RATIO);
                    const {centerColor, colorsSet} = pickColor(ev, canvasBoardRef.current);
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
    }, [canvasBoardRef, canvasOffRef, isOffScreenDropper]);

    const clickHandler = useCallback((ev: MouseEvent) => {
        if (canvasOffRef.current && canvasBoardRef.current) {
            // const {centerColor} = pickColor(ev, canvasBoardRef.current);
            setSelectedColor(hoveredColor);
        }
    }, [canvasBoardRef, canvasOffRef, hoveredColor, setSelectedColor])

    useEffect(() => {
        const canvasOff = canvasOffRef.current;

        if (canvasOff && isOffScreenDropper) {
            canvasOff.addEventListener("click", clickHandler);
        }

        return () => {
            canvasOff?.removeEventListener("click", clickHandler);
        }
    }, [canvasOffRef, clickHandler, isOffScreenDropper])

    return {
        isOffScreenDropper,
        offSelectedColor: selectedColor,
        offHoveredColor: hoveredColor,
    };
}
