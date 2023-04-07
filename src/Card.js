import AssetManager from "./AssetManager";
import CardDrawer from "./CardDrawer";

export default class Card {
    constructor({
        data,
        canvas,
        size,
    } = {}) {
        this.data = data;
        this.canvas = canvas;
        this.assetManager = new AssetManager(data, {
            onEachStepLoad: this.draw,
        });
        this.cardDrawer = new CardDrawer(data, canvas, this.assetManager);
    }
    draw = () => {
        this.cardDrawer.draw();
    };

    render = async () => {
        await this.assetManager.loadAll();
    };

    test = () => {
        console.log("test");
    };
}
