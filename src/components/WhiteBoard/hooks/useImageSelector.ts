import {useContext, useEffect} from "react";
import {ImageContext} from "../../../context/ImageContextProvider";
import {CANVAS_SIZE} from "../../../constants/constants";

export const useImageSelector = (canvas: HTMLCanvasElement | null) => {
    const {selectedImage} = useContext(ImageContext);

    useEffect(() => {
        if (selectedImage) {
            const img = new Image();
            img.setAttribute('crossOrigin', 'anonymous');
            img.src = selectedImage;

            img.onload = () => {
                if (canvas) {
                    const ctx = canvas.getContext("2d", { willReadFrequently : true });
                    if (ctx !== null) {
                        const startX = 0;
                        const startY = 0;

                        let shrink = 1
                        if (img.width > img.height) {
                            if (img.width > CANVAS_SIZE) {
                                shrink = CANVAS_SIZE / img.width;
                            }
                        } else if (img.height > CANVAS_SIZE) {
                            shrink = CANVAS_SIZE / img.height;
                        }

                        img.height = img.height * shrink;
                        img.width = img.width * shrink;

                        const width = img.width;
                        const height = img.height;
                        ctx.drawImage(img, startX, startY, width, height)
                    }
                }
            }
        }
    }, [canvas, selectedImage])
}