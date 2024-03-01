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
    const x = ~~((ev.clientX - bounding.left) * canvasRatio);
    const y = ~~((ev.clientY - bounding.top) * canvasRatio);
    const ctx = canvas.getContext("2d", { willReadFrequently : true });

    if (ctx) {
        const pixelRect = ctx.getImageData(x, y, colorsSize, colorsSize);

        const colors = [];
        const {data: rectData} = pixelRect;

        const hexColors = []
        if (colorFormat === ColorFormats.RGBA) {
            for (let i = 0; i < rectData.length; i += 4) {
                // todo convert color to hex
                const currentColor = `rgb(${rectData[i]} ${rectData[i + 1]} ${rectData[i + 2]} / ${rectData[3]})`;

                const hex = rgbToHex(rectData[0], rectData[1], rectData[2]);

                colors.push(currentColor);
                hexColors.push(hex);
            }
        } else if(colorFormat === ColorFormats.HEX) {
            //TODO - do converting here
        }
        // console.log("gexxxxx", hexColors)
        return {
            colorsSet: hexColors,
            centerColor: hexColors[Math.floor(colors.length / 2)]
        };
    }

    return {
        colorsSet: [],
        centerColor: ""
    };
}

export const rgbToHex = function rgbToHex(r: number, g: number, b: number) {
    if (r > 255 || g > 255 || b > 255) {
        throw Error("Invalid color component");
    }

    // TODO - check hex values
    const rr = (r << 16)
    console.log("rr", rr)

    return `#${((r << 16) | (g << 8) | b).toString(16)}`;
}