import defaultShowcaseConfig, {getConfig as getShowcaseConfig} from "./config/showcaseConfig";
import {getConfig as getCardConfig} from "./config/config";
import AssetManager  from "./AssetManager";
import ShowcaseDrawer from "./ShowcaseDrawer";

class CardShowcase {
    static defaultConfig = defaultShowcaseConfig;
    static defaultTip = "※画像は開発中のものです。実際の商品とは一部異なる場合がございます。";

    constructor({
        cardData,
        showcaseData,
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
        cardConfig.canvasSize = canvasSize;
        return getCardConfig(this.canvas, cardConfig);
    };

    draw = () => {
        this.showcaseDrawer.draw();
    };
}

export default CardShowcase;