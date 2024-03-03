type Coordinates = {
    x: number;
    y: number
}
const offScreenPointer = function () {
    const CanvasAdvancedCursor = class CanvasAdvancedCursor {
        constructor(canvas: HTMLCanvasElement | null) {
            if (canvas) {
                this.canvas = canvas;
                this.ctx = canvas.getContext("2d", {willReadFrequently: true});
            } else {
                throw Error("Canvas is Required")
            }
        }

        canvas;
        ctx;
        x = 0;
        y = 0;
        vx = 0;
        vy = 0;
        radius = 360;
        borderWidth = 40;
        centerSquareColor = "#000";
        borderOuter = this.radius + this.borderWidth / 2;
        borderOuterWidth = 10;
        borderInnerWidth = 10;
        borderInner = 335;
        rectSize = 40;
        strokeColor = "#efefef";

        /**
         * Draw Inner border
         * */
        drawInnerBorder() {
            if (this.ctx) {
                this.ctx.beginPath();
                this.ctx.lineWidth = this.borderInnerWidth;
                this.ctx.strokeStyle = this.strokeColor;
                this.ctx.arc(this.x, this.y, this.borderInner, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }

        /**
         * Draw Middle colorful arc with hovered color
         * */
        drawMiddleBorder(color: string) {
            if (this.ctx) {
                this.ctx.beginPath();
                this.ctx.lineWidth = this.borderWidth;
                this.ctx.strokeStyle = color ?? this.strokeColor;
                this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI);
                this.ctx.stroke();
                this.ctx.closePath();
                this.ctx.beginPath();
                this.ctx.lineWidth = this.borderWidth;
                this.ctx.strokeStyle = this.strokeColor;
                this.ctx.arc(this.x, this.y, this.radius, Math.PI, 0);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }

        /**
         * Draw Inner border
         * */
        drawOuterBorder() {
            if (this.ctx) {
                this.ctx.beginPath();
                this.ctx.lineWidth = this.borderOuterWidth;
                this.ctx.strokeStyle = this.strokeColor;
                this.ctx.arc(this.x, this.y, this.borderOuter, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }

        drawBall(color: string, colorsSet: string[]) {
            if (this.ctx) {
                let i = 0;
                const drawSize = (this.radius + this.borderWidth / 2);
                const startX = this.x - drawSize;
                const endX = startX + 2 * drawSize;
                const startY = this.y - drawSize;
                const endY = startY + 2 * drawSize;

                this.ctx.beginPath();
                for (let y = startY; y < endY; y += this.rectSize) {
                    for (let x = startX; x < endX; x += this.rectSize) {
                        const currentSize = ((this.x - this.rectSize / 2 - x) ** 2 + (this.y - this.rectSize / 2 - y) ** 2) ** (1 / 2);
                        if (currentSize <= this.radius) {
                            this.ctx.fillStyle = colorsSet[i];
                            this.ctx.fillRect(x, y, this.rectSize, this.rectSize);
                            this.ctx.strokeStyle = this.strokeColor;
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeRect(x, y, this.rectSize-1, this.rectSize-1);
                        }
                        i++;
                    }
                }
                this.ctx.closePath();

                //------ center square
                const centerX = this.x - this.rectSize / 2;
                const centerY = this.y - this.rectSize / 2;
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.centerSquareColor;
                this.ctx.lineWidth = 6;
                this.ctx.strokeRect(centerX, centerY, this.rectSize, this.rectSize);
                this.ctx.closePath();
                //------ center square

                this.drawInnerBorder();
                this.drawMiddleBorder(color);
                this.drawOuterBorder();
            }
        }

        clear() {
            if (this.ctx) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }

        draw(color: string, colorsSet: string[], x: number, y: number) {
            const render = () => {
                this.clear();
                this.drawBall(color, colorsSet);
                this.x = x;
                this.y = y;
            }

            render()
        }
    };

    let canvasDrawer: any;
    onmessage = (ev: MessageEvent) => {
        const {
            coordinates,
            canvas: passedCanvas,
            centerColor,
            colorsSet,
            clear,
        }: { coordinates: Coordinates, canvas: HTMLCanvasElement, centerColor: string, colorsSet: string[], clear: boolean } = ev.data;
        if (!canvasDrawer) {
            canvasDrawer = new CanvasAdvancedCursor(passedCanvas);
        }

        if (clear) {
            canvasDrawer.clear();
        }

        if (canvasDrawer && coordinates) {
            canvasDrawer.draw(centerColor, colorsSet, coordinates.x, coordinates.y);
        }
    }

}

export default offScreenPointer;
