import AssetManager from "./AssetManager";
import CardDrawer from "./CardDrawer";
import getConfig from "./getConfig";

export default class Card {
    constructor({
        data,
        canvas,
    } = {}) {
        console.assert(canvas != null, "canvas element is null.");
        this.data = data;
        this.canvas = canvas;
        this.config = getConfig(this.canvas);
        this.assetManager = new AssetManager(data, this.config);
        this.cardDrawer = new CardDrawer(data, canvas, this.config, this.assetManager);
    }
    draw = () => {
        this.cardDrawer.draw();
    };

    test = () => {
        console.log("test");
    };
}
