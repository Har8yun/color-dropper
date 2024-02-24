import {useContext, useEffect, useRef} from "react";
import Box from "@mui/material/Box";
import {ImageContext} from "../../context/ImageContextProvider";

import "./WhiteBoard.css";

const WhiteBoard = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {selectedImage} = useContext(ImageContext);

    useEffect(() => {
        if (selectedImage) {
            const img = new Image();
            img.src = selectedImage;

            img.onload = () => {
                if (canvasRef.current) {
                    const ctx = canvasRef.current.getContext("2d");
                    if (ctx !== null) {
                        ctx.drawImage(img, 20, 20, img.width+20, img.height+20)
                    }
                }
            }
        }
    }, [selectedImage])

    return (
        <Box className="whiteBoard-container">
            <canvas style={{backgroundColor: "#fff"}} ref={canvasRef} width={700} height={700} />
        </Box>
    );
};

export default WhiteBoard;