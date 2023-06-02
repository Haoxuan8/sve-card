import AssetManager from "./AssetManager";
import CardDrawer from "./CardDrawer";
import getConfig from "./getConfig";

export default class Card {
    constructor({
        data,
        canvas,
        height = 642 * 2,
        width,
    } = {}) {
        console.assert(canvas != null, "canvas element is null.");
        this.data = data;
        this.canvas = canvas;
        this.setCanvasSize(height, width);
        this.config = getConfig(this.canvas);
        this.assetManager = new AssetManager(data, this.config, {onEachStepLoad: this.draw});
        this.cardDrawer = new CardDrawer(data, canvas, this.config, this.assetManager);
    }

    setCanvasSize = (height, width) => {
        this.canvas.height = height;
        if (width != null) this.canvas.width = width;
        else {
            const ratio = 459 / 642;
            this.canvas.width = ratio * height;
        }
    };

    draw = () => {
        this.cardDrawer.draw();
    };

    test = () => {
        console.log("test");
    };
}
