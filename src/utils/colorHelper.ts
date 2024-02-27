import {CANVAS_RATIO, RECT_COUNT} from "../constants/constants";

enum ColorFormats {
    HEX,
    RGBA
}

export function pickColor(ev: MouseEvent, canvas: HTMLCanvasElement, canvasRatio = CANVAS_RATIO, colorFormat = ColorFormats.RGBA) {
    const bounding = canvas.getBoundingClientRect();
    const x = (ev.clientX - bounding.left) * canvasRatio;
    const y = (ev.clientY - bounding.top) * canvasRatio;
    const ctx = canvas.getContext("2d");

    if (ctx) {
        const pixelRect = ctx.getImageData(x, y, RECT_COUNT, RECT_COUNT);

        const colors = [];
        const {data: rectData} = pixelRect;
        for (let i = 0; i < rectData.length; i +=4) {
            const currentColor = `rgba(${rectData[i]}, ${rectData[i+1]}, ${rectData[i+2]}, ${rectData[i+3] / 255})`;
            colors.push(currentColor);
        }

        return {
            colorsSet: colors,
            centerColor: colors[Math.floor(colors.length / 2)]
        };
    }

    return {
        colorsSet: [],
        centerColor: ""
    };
}