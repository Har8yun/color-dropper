// TODO - optimaze performance and draw parts , track mouse movement speed
export class CanvasAdvancedCursor {
    constructor(canvas: HTMLCanvasElement | null) {
        if (canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
        } else {
            throw Error("Canvas is Required")
        }
    }

    canvas;
    ctx;
    x = 100;
    y = 100;
    vx = 5;
    vy = 1;
    radius = 360;
    borderWidth = 40;
    borderEdgeColor = "#fff";
    borderOuter = this.radius + this.borderWidth / 2;
    borderOuterWidth = 20;
    borderInnerWidth = 20;
    borderInner = 330;
    rectSize = 40;
    strokeColor = "grey";

    /**
     * Draw Inner border
     * */
    drawInnerBorder() {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.lineWidth = this.borderInnerWidth;
            this.ctx.strokeStyle = this.borderEdgeColor;
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
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
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
            this.ctx.strokeStyle = this.borderEdgeColor;
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

            for (let x = startX; x < endX; x += this.rectSize) {
                for (let y = startY; y < endY; y += this.rectSize) {
                    const currentSize = ((this.x - this.rectSize / 2 - x) ** 2 + (this.y - this.rectSize / 2 - y) ** 2) ** (1 / 2);
                    if (currentSize <= this.radius) {
                        this.ctx.beginPath();
                        this.ctx.fillStyle = colorsSet[i];
                        this.ctx.fillRect(x, y, this.rectSize, this.rectSize);
                        this.ctx.strokeStyle = this.strokeColor;
                        this.ctx.lineWidth = 6;
                        this.ctx.strokeRect(x, y, this.rectSize, this.rectSize);
                        this.ctx.closePath();
                    }
                }
                i++;
            }

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

    draw(color: string, colorsSet: string[]) {
        this.clear();
        this.drawBall(color, colorsSet);
        this.x += this.vx;
        this.y += this.vy;

        if (
            this.y + this.vy > this.canvas.height - this.radius ||
            this.y + this.vy < this.radius
        ) {
            this.vy = -this.vy;
        }
        if (
            this.x + this.vx > this.canvas.width - this.radius ||
            this.x + this.vx < this.radius
        ) {
            this.vx = -this.vx;
        }
    }
}
