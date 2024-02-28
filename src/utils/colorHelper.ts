import {CANVAS_RATIO, RECT_COUNT} from "../constants/constants";

enum ColorFormats {
    HEX,
    RGBA
}

export function pickColor(
    ev: MouseEvent,
    canvas: HTMLCanvasElement,
    colorsSize = RECT_COUNT,
    colorFormat = ColorFormats.RGBA,
    canvasRatio = CANVAS_RATIO,
) {
    const bounding = canvas.getBoundingClientRect();
    const x = (ev.clientX - bounding.left) * canvasRatio;
    const y = (ev.clientY - bounding.top) * canvasRatio;
    const ctx = canvas.getContext("2d");

    if (ctx) {
        const pixelRect = ctx.getImageData(x, y, colorsSize, colorsSize);

        const colors = [];
        const {data: rectData} = pixelRect;

        if (colorFormat === ColorFormats.RGBA) {
            for (let i = 0; i < rectData.length; i += 4) {
                const currentColor = `rgb(${rectData[i]}, ${rectData[i + 1]}, ${rectData[i + 2]})`;
                colors.push(currentColor);
            }
        } else if(colorFormat === ColorFormats.HEX) {
            //TODO - do converting here
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