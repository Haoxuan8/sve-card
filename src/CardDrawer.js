export default class CardDrawer {
    constructor(data, canvas, assetManager) {
        this.data = data;
        this.canvas = canvas;
        this.initSize();
        this.canvasContext = canvas.getContext("2d");
        this.assetManager = assetManager;
    }

    initSize = () => {
        this.RATE = 1185 / 813;
        this.size = this.getSize();
    };

    getSize() {
        let w = this.canvas.clientWidth;
        let h = this.canvas.clientHeight;

        let currentRate = h / w;
        if (currentRate > this.RATE) {
            h = w * this.RATE;
        } else if (this.RATE > currentRate) {
            w = h / this.RATE;
        }

        return [Math.round(w), Math.round(h)];
    }

    drawFrame = () => {

    };

    drawCardImage = () => {

    };

    drawDesc = () => {

    };

    drawName = () => {

    };

    draw = () => {
        this.drawFrame();
        this.drawCardImage();
    };
}
