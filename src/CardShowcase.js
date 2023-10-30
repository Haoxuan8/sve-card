import defaultShowcaseConfig, {getConfig as getShowcaseConfig} from "./config/showcaseConfig";
import {getConfig as getCardConfig} from "./config/config";
import AssetManager  from "./AssetManager";
import ShowcaseDrawer from "./ShowcaseDrawer";
import {isArray, assign, some, has, defaultsDeep} from "lodash";

class CardShowcase {
    static defaultConfig = defaultShowcaseConfig;
    static defaultTip = {
        JP: "※画像は開発中のものです。実際の商品とは一部異なる場合がございます。",
        CHS: "※卡片能力为开发中内容。",
    };
    static defalutTokenTip = {
        JP: "※このカードはトークンです。",
        CHS: "※这张卡片为衍生物卡。",
    };

    constructor({
        cardData,
        showcaseData = {},
        canvas,
        cardConfig,
        showcaseConfig,
        height = 1080 * 2,
        width,
    }) {
        this.cardData = cardData;
        this.showcaseData = showcaseData;
        this.canvas = canvas;
        this.showcaseConfig = {...defaultShowcaseConfig, ...showcaseConfig};
        this.setCanvasSize(height, width);
        this.originalShowcaseConfig = showcaseConfig;
        this.originalCardConfig = cardConfig;
        this.showcaseConfig = getShowcaseConfig(this.canvas, showcaseConfig);
        this.cardConfig = this.getCardConfig(cardConfig);
        this.assetManager = new AssetManager(cardData, this.cardConfig, {onEachStepLoad: this.draw});
        this.showcaseDrawer = new ShowcaseDrawer({
            cardData: this.cardData,
            showcaseData: this.showcaseData,
            cardConfig: this.cardConfig,
            showcaseConfig: this.showcaseConfig,
            canvas,
            assetManager: this.assetManager,
        });
    }

    setCanvasSize = (height, width) => {
        this.canvas.height = height;
        if (width != null) this.canvas.width = width;
        else {
            const size = this.showcaseConfig.size;
            const ratio = size[0] / size[1];
            this.canvas.width = ratio * height;
        }
    };

    getCardConfig = (cardConfig = {}) => {
        const canvasSize = [...this.showcaseConfig.size, ...this.showcaseConfig.card.position];
        return getCardConfig(this.canvas, {...cardConfig, canvasSize});
    };

    download = () => {
        let dataURL = this.canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `${this.cardData.name}_showcase.png`;
        link.href = dataURL;
        link.click();
    };

    setSize = (size) => {
        if (isArray(size)) {
            this.setCanvasSize(size[0], size[1]);
            const newConfig = getShowcaseConfig(this.canvas, this.originalShowcaseConfig);
            assign(this.showcaseConfig, newConfig);
            const newCardConfig = this.getCardConfig(this.originalCardConfig);
            assign(this.cardConfig, newCardConfig);
            this.draw();
        }
    };

    setCardConfig = (config) => {
        this.originalCardConfig = config;
        assign(this.cardConfig, this.getCardConfig(config));
        this.draw();
    };

    setShowcaseConfig = (config) => {
        this.originalShowcaseConfig = config;
        assign(this.showcaseConfig, getShowcaseConfig(this.canvas, config));
        this.draw();
    };

    setCardData = (data, options) => {
        const newData = defaultsDeep(data, this.cardData);
        assign(this.cardData, newData);
        this.draw();
    };

    setShowcaseData = (data, options) => {
        const newData = defaultsDeep(data, this.showcaseData);
        assign(this.showcaseData, newData);
        this.draw();
    };

    draw = () => {
        this.showcaseDrawer.draw();
    };
}

export default CardShowcase;