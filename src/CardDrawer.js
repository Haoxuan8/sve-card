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
        const frame = this.assetManager.loadFrame();
        this.canvasContext.drawImage(frame, ...this.config.frame.position);
    };

    drawCardImage = () => {
        const image = this.assetManager.loadCardImage();

        const [x, y, width, height] = this.config.cardImage.position;
        const radius = this.config.cardImage.radius;

        this.canvasContext.save();
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(x + radius, y);
        this.canvasContext.lineTo(x + width - radius, y);
        this.canvasContext.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.canvasContext.lineTo(x + width, y + height - radius);
        this.canvasContext.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.canvasContext.lineTo(x + radius, y + height);
        this.canvasContext.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.canvasContext.lineTo(x, y + radius);
        this.canvasContext.quadraticCurveTo(x, y, x + radius, y);
        this.canvasContext.closePath();
        this.canvasContext.clip();
        this.canvasContext.drawImage(image,x, y, width, height);
        this.canvasContext.restore();
    };

    drawDesc = () => {
        this.assetManager.loadFont(this.config.desc.fontFamily);
        this.canvasContext.fillStyle = this.config.desc.color;
        this.canvasContext.font = `bold ${this.config.desc.fontSize}px ${this.config.desc.fontFamily}`;
        const measureTextWidth = (text) => this.canvasContext.measureText(text).width;
        this.canvasContext.textBaseline = "top";
        const {list, scale} = splitText(this.data.desc, this.config.desc.position[2], this.config.desc.maxLine, measureTextWidth);
        forEach(list, (text, i) => {
            const maxWidth = measureTextWidth(text) * scale;
            this.canvasContext.fillText(text, this.config.desc.position[0], this.config.desc.position[1] + i * this.config.desc.lineHeight, maxWidth);
        });
    };

    drawDescBackground = () => {
        const image = this.assetManager.loadDescBackground();
        console.log(this.config.descBackground.position);
        this.canvasContext.drawImage(image, ...this.config.descBackground.position);
    };

    drawAttackAndDefend = () => {

    };

    drawName = () => {

    };

    draw = () => {
        this.drawCardImage();
        this.drawDescBackground();
        this.drawFrame();
        this.drawAttackAndDefend();
        this.drawDesc();
    };
}
