import AssetManager from "./AssetManager";
import CardDrawer from "./CardDrawer";
import defaultConfig, {getConfig} from "./config/config";
import {isArray, assign, some, has, defaultsDeep} from "lodash";

const defaultEPData = {
    cardType: "EP",
    alias: "EP",
    craft: "Neutral",
    rarity: "BR",
    speech: "",
    race: "",
    desc: "バトル開始時、後攻プレイヤーはEPを3つ持つ。\n"
    + "自分が/evoか/eatのコストを払うとき、表向きのEPを1つ裏向きにすることで、1PPを払える。（1ターンに進化か食事はどちらか1回できる。1回につき使えるEPは1つ）",
};

export default class Card {
    static defaultConfig = defaultConfig;
    static defaultEPData = defaultEPData;

    constructor({
        data,
        canvas,
        height = 642 * 2,
        width,
        config = {},
    } = {}) {
        console.assert(canvas != null, "canvas element is null.");
        this.data = data;
        this.canvas = canvas;
        this.config = {...defaultConfig, config};
        this.setCanvasSize(height, width);
        this.originalConfig = config;
        this.config = getConfig(this.canvas, config);
        this.assetManager = new AssetManager(data, this.config, {onEachStepLoad: this.draw});
        this.cardDrawer = new CardDrawer(data, this.canvas, this.config, this.assetManager);
    }

    setCanvasSize = (height, width) => {
        this.canvas.height = height;
        if (width != null) this.canvas.width = width;
        else {
            const size = this.config.size;
            const ratio = size[0] / size[1];
            this.canvas.width = ratio * height;
        }
    };

    setData = (data, options) => {
        // 这些属性更改时清空下画布
        if (some(["cardType", "rarity", "craft"], k => has(data, k))) {
            this.cardDrawer.clearCanvas();
        }
        const newData = defaultsDeep(data, this.data);
        assign(this.data, newData);
        this.draw();
    };

    setSize = (size) => {
        if (isArray(size)) {
            this.setCanvasSize(size[0], size[1]);
            const newConfig = getConfig(this.canvas, this.originalConfig);
            assign(this.config, newConfig);
            this.draw();
        }
    };

    setConfig = (config) => {
        this.originalConfig = config;
        assign(this.config, getConfig(this.canvas, config));
        this.draw();
    };

    draw = () => {
        this.cardDrawer.draw();
    };

    download = () => {
        let dataURL = this.canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `${this.data.name}.png`;
        link.href = dataURL;
        link.click();
    };
}
