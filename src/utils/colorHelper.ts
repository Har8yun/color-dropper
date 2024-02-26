import {rgbToHex} from "../cursor/helpers";

enum ColorFormats {
    HEX,
    RGBA
}

export function pickColor(ev: MouseEvent, canvas: HTMLCanvasElement, colorFormat = ColorFormats.RGBA) {
    const bounding = canvas.getBoundingClientRect();
    const x = ev.clientX - bounding.left;
    const y = ev.clientY - bounding.top;
    const ctx = canvas.getContext("2d");

    if (ctx) {
        const pixel = ctx.getImageData(x, y, 1, 1);
        const data = pixel.data;

        if (colorFormat === ColorFormats.RGBA) {
            return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        }

        if (colorFormat === ColorFormats.HEX) {
            return rgbToHex(data[0], data[1], data[2]);
        }
    }

    return "";
}