import getConfig from "./getConfig";
import splitText from "./util/splitText";
import {forEach} from "lodash";


export default class CardDrawer {
    constructor(data, canvas, config, assetManager) {
        this.data = data;
        this.canvas = canvas;
        this.config = config;
        this.canvasContext = canvas.getContext("2d");
        this.assetManager = assetManager;
    }

    drawFrame = () => {
        const frame = this.assetManager.loadFrame({onLoad: this.draw});
        this.canvasContext.drawImage(frame, ...this.config.frame.position);
    };

    drawCardImage = async () => {
        const image = await this.assetManager.loadCardImage();
        this.canvasContext.drawImage(image, ...this.config.cardImage.position);
    };

    drawDesc = () => {
        this.assetManager.loadFont("cn", {onLoad: this.draw});
        const measureTextWidth = (text) => this.canvasContext.measureText(text).width;
        this.canvasContext.fillStyle = "#FFF";
        this.canvasContext.font = `${this.config.desc.fontSize}px cn`;
        const {list, scale} = splitText(this.data.desc, this.config.desc.position[2], this.config.desc.maxLine, measureTextWidth);
        forEach(list, (text, i) => {
            const maxWidth = measureTextWidth(text) * scale;
            this.canvasContext.fillText(text, this.config.desc.position[0], this.config.desc.position[1] + i * this.config.desc.lineHeight, maxWidth);
        });
    };

    drawName = () => {

    };

    draw = async () => {
        this.drawFrame();
        // this.drawCardImage();
        this.drawDesc();
    };
}
