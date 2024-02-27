import {CENTER_INDEX, PICKER_SIZE, RECT_SIZE} from "../constants/constants";

// TODO - hide rects out of circle
export const getCursor = (fill = "#efefef", colors: string[] = []) => {
    console.log("fill", fill)
    let allRects = "";
    let i = 0;
    let centerRect = ""
    for (let y = 0; y < PICKER_SIZE; y += RECT_SIZE) {
        for (let x = 0; x < PICKER_SIZE; x += RECT_SIZE) {
            const isCenter = x === y && x === CENTER_INDEX;
            const stroke =  isCenter ? "black" : "grey";
            const strokeWidth =  isCenter ? 2 : 1;
            const visibility = x === 0 || y === 0 || x === (PICKER_SIZE - RECT_SIZE) || y === (PICKER_SIZE - RECT_SIZE) ? "hidden" : "visible";

            if (isCenter) {
                centerRect +=`<rect x="${x}" y="${y}" stroke-width="${strokeWidth}" stroke="${stroke}" width="${RECT_SIZE}" height="${RECT_SIZE}" fill="${colors[i] ?? 'transparent'}" />`;
            } else {
                allRects +=`<rect visibility="${visibility}" x="${x}" y="${y}" stroke-width="${strokeWidth}" stroke="${stroke}" width="${RECT_SIZE}" height="${RECT_SIZE}" fill="${colors[i] ?? 'transparent'}" />`;
            }
            i++;
        }
    }

    const svg = (
        `<svg
            width="128"
            height="128"
            viewBox="0 0 ${PICKER_SIZE} ${PICKER_SIZE}"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            ${allRects}
            ${centerRect}
            <circle r="80" cx="90" cy="90" stroke="${fill}" stroke-width="20" fill="transparent" />
            <circle r="72" cx="90" cy="90" stroke="#efefef" stroke-width="4" fill="transparent" />
            <circle r="88" cx="90" cy="90" stroke="#efefef" stroke-width="4" fill="transparent" />
        </svg>`
    );

    return "data:image/svg+xml;base64," + btoa(svg);
};
