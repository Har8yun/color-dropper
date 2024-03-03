import {CANVAS_RATIO, RECT_COUNT} from "../constants/constants";

export function pickColor(
    ev: MouseEvent,
    canvas: HTMLCanvasElement,
    colorsSize = RECT_COUNT,
    canvasRatio = CANVAS_RATIO,
) {
    const bounding = canvas.getBoundingClientRect();
    const x = ~~((ev.clientX - bounding.left) * canvasRatio);
    const y = ~~((ev.clientY - bounding.top) * canvasRatio);
    const ctx = canvas.getContext("2d", { willReadFrequently : true });

    if (ctx) {
        const pixelRect = ctx.getImageData(x, y, colorsSize, colorsSize);
        const {data: rectData} = pixelRect;
        const hexColors = [];
        for (let i = 0; i < rectData.length; i += 4) {
            const hex = rgbToHex(rectData[i], rectData[i+1], rectData[i+2]);
            hexColors.push(hex);
        }

        return {
            colorsSet: hexColors,
            centerColor: hexColors[Math.floor(hexColors.length / 2)]
        };
    }

    return {
        colorsSet: [],
        centerColor: ""
    };
}

export const rgbToHex = function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}