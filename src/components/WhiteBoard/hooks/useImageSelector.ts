import {useContext, useEffect} from "react";
import {ImageContext} from "../../../context/ImageContextProvider";

export const useImageSelector = (canvas: HTMLCanvasElement | null) => {
    const {selectedImage} = useContext(ImageContext);

    useEffect(() => {
        if (selectedImage) {
            const img = new Image();
            img.setAttribute('crossOrigin', 'anonymous');
            img.src = selectedImage;

            img.onload = () => {
                if (canvas) {
                    const ctx = canvas.getContext("2d");
                    if (ctx !== null) {
                        // TODO - image calculations for ratio and fit
                        const startX = 0;
                        const startY = 0;
                        const shrinkPercent = 1;
                        const width = img.width * shrinkPercent;
                        const height = img.height * shrinkPercent;
                        ctx.drawImage(img, startX, startY, width, height)
                    }
                }
            }
        }
    }, [canvas, selectedImage])
}