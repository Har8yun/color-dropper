import {CENTER_INDEX, CIRCLE_R, CIRCLE_RECT_R, PICKER_SIZE, RECT_SIZE} from "../constants/constants";

export const getCursor = (fill = "#efefef", colors: string[] = []) => {
    let allRects = "";
    let i = 0;
    let centerRect = ""
    for (let y = 0; y < PICKER_SIZE; y += RECT_SIZE) {
        for (let x = 0; x < PICKER_SIZE; x += RECT_SIZE) {
            const isCenter = x === y && x === CENTER_INDEX;
            const stroke =  isCenter ? "black" : "grey";
            const strokeWidth =  isCenter ? 2 : 1;
            const visibleRectCurrentR = ((CENTER_INDEX - x)**2 + (CENTER_INDEX - y)**2)**(1/2);
            const visibility = visibleRectCurrentR <= CIRCLE_RECT_R ? "visible" : "hidden";

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
            <circle r="84" cx="${CIRCLE_R}" cy="${CIRCLE_R}" stroke="${fill}" stroke-width="${RECT_SIZE}" fill="transparent" />
            <circle r="79" cx="${CIRCLE_R}" cy="${CIRCLE_R}" stroke="#efefef" stroke-width="2" fill="transparent" />
            <circle r="89" cx="${CIRCLE_R}" cy="${CIRCLE_R}" stroke="#efefef" stroke-width="2" fill="transparent" />
        </svg>`
    );

    return "data:image/svg+xml;base64," + btoa(svg);
};
