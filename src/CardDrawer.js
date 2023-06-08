import splitText, {measureIconWidth, textIconMap} from "./util/splitText";
import {forEach} from "lodash";


export default class CardDrawer {
    constructor(data, canvas, config, assetManager) {
        this.data = data;
        this.canvas = canvas;
        this.config = config;
        this.canvasContext = canvas.getContext("2d");
        this.assetManager = assetManager;
    }

    drawImage = (image, ...position) => {
        if (image) {
            this.canvasContext.drawImage(image, ...position);
        } else {
        }
    };

    drawFrame = () => {
        const frame = this.assetManager.loadFrame();
        this.drawImage(frame, ...this.config.frame.position);
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
        this.drawImage(image,x, y, width, height);
        this.canvasContext.restore();
    };

    drawDesc = () => {
        this.assetManager.loadFont(this.config.desc.fontFamily);
        this.canvasContext.save();
        this.canvasContext.fillStyle = this.config.desc.color;
        this.canvasContext.font = `${this.config.desc.fontSize}px ${this.config.desc.fontFamily}`;
        const ctxMeasureTextWidth = (text) => this.canvasContext.measureText(text).width;
        this.canvasContext.textBaseline = "top";
        const iconOptions = {iconHeight: this.config.desc.iconHeight, iconPaddingX: this.config.desc.iconPaddingX};
        const {list, scale} = splitText(this.data.desc, this.config.desc.position[2],
            this.config.desc.maxLine, ctxMeasureTextWidth, iconOptions);
        forEach(list, (textArr, i) => {
            let currentText = "";
            let left = this.config.desc.position[0];
            let top = this.config.desc.position[1] + i * this.config.desc.lineHeight;
            forEach(textArr, (it) => {
                const flashText = () => {
                    if (currentText !== "") {
                        const maxWidth = ctxMeasureTextWidth(currentText) * scale;
                        this.canvasContext.fillText(currentText, left, top, maxWidth);
                        currentText = "";
                        left += maxWidth;
                    }
                };

                const drawIcon = (item) => {
                    const iconItem = textIconMap[item.text];
                    const icon = this.assetManager.loadImage(iconItem.src);
                    left += this.config.desc.iconPaddingX;
                    const maxWidth = measureIconWidth(item, this.config.desc.iconHeight) * scale;
                    this.drawImage(icon, left, top + this.config.desc.iconTopOffset, maxWidth, this.config.desc.iconHeight);
                    left += maxWidth;
                    left += this.config.desc.iconPaddingX;
                };

                if (it.type === "char") {
                    currentText += it.text;
                } else if (it.type === "icon") {
                    flashText();
                    drawIcon(it);
                }
                flashText();
            });
        });
        this.canvasContext.restore();
    };

    drawDescBackground = () => {
        const image = this.assetManager.loadDescBackground();
        this.drawImage(image, ...this.config.descBackground.position);
    };

    drawAttackDefenseCost = () => {
        this.assetManager.loadFont("number");
        this.canvasContext.save();
        if (Number.isInteger(this.data.attack)) {
            this.canvasContext.fillStyle = this.config.attack.color;
            this.canvasContext.font = `${this.config.attack.fontSize}px ${this.config.attack.fontFamily}`;
            this.canvasContext.textBaseline = "alphabetic";
            this.canvasContext.textAlign = "center";
            this.canvasContext.fillText(`${this.data.attack}`, ...this.config.attack.position);
        }
        this.canvasContext.restore();
    };

    drawName = () => {

    };

    draw = () => {
        this.drawCardImage();
        this.drawDescBackground();
        this.drawFrame();
        this.drawAttackDefenseCost();
        this.drawDesc();
    };
}
