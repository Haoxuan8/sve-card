import splitText, {measureIconWidth, textIconMap} from "./util/splitText";
import {forEach} from "lodash";
import {getIsNoStatus, isToken} from "./util/cardTypeUtil";

const DEFAULT_COPYRIGHT = "©Cygames,Inc.";

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

    drawCoverImage = (image, ...position) => {
        const [left, top, width, height] = position;
        if (image) {
            let containerRatio = height / width;
            let w = image.naturalWidth;
            let h = image.naturalHeight;
            let imgRatio = h / w;

            if (imgRatio > containerRatio) {
                h = w * containerRatio;
            } else {
                w = h / containerRatio;
            }
            let s = {
                width: w,
                height: h,
                offsetX: (image.naturalWidth - w) * .5,
                offsetY: (image.naturalHeight - h) * .5,
            };

            this.canvasContext.drawImage(image, s.offsetX, s.offsetY, s.width, s.height, ...position);
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
        this.drawCoverImage(image,x, y, width, height);
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
        const isNoStatus = getIsNoStatus(this.data.cardType);
        const drawNumber = (number, config) => {
            if (Number.isInteger(number)) {
                this.assetManager.loadFont(config.fontFamily);
                this.canvasContext.save();
                this.canvasContext.font = `${config.fontSize}px ${config.fontFamily}`;
                this.canvasContext.textAlign = "center";
                this.canvasContext.shadowColor = "black";
                this.canvasContext.shadowBlur = config.shadowBlur;
                this.canvasContext.lineWidth = config.shadowLine;
                this.canvasContext.strokeText(`${number}`, ...config.position);
                this.canvasContext.fillStyle = config.color;
                this.canvasContext.fillText(`${number}`, ...config.position);
                this.canvasContext.restore();
            }
        };

        !isNoStatus && drawNumber(this.data.attack, this.config.attack);
        !isNoStatus && drawNumber(this.data.defense, this.config.defense);
        drawNumber(this.data.cost, this.config.cost);
    };

    drawText = (text, config, setContext) => {
        if (text != null) {
            this.assetManager.loadFont(config.fontFamily);
            this.canvasContext.save();
            this.canvasContext.fillStyle = config.color;
            this.canvasContext.font = `${config.fontSize}px ${config.fontFamily}`;
            setContext?.();
            this.canvasContext.fillText(text, ...config.position);
            this.canvasContext.restore();
        }
    };

    drawName = () => {
        this.drawText(this.data.name, this.config.name, () => {
            this.canvasContext.textAlign = "center";
        });
    };

    drawRace = () => {
        const [left, top, width] = this.config.race.position;
        let offset = 0;
        if (getIsNoStatus(this.data.cardType)) offset += this.config.race.noStatusOffset;
        if (isToken(this.data.cardType)) offset += this.config.race.tokenOffset;
        this.drawText(this.data.race, {
            ...this.config.race,
            position: [left + offset, top, width],
        });
    };

    drawRarity = () => {
        if (isToken(this.data.cardType)) {}
        else {
            const image = this.assetManager.loadRarityImage(this.data.rarity);
            const [left, top, width, height] = this.config.rarity.position;
            const isNoStatus = getIsNoStatus(this.data.cardType);
            this.drawImage(image, left + (isNoStatus ? this.config.rarity.noStatusOffset : 0), top, width, height);
        }
    };

    drawFooter = () => {
        const cardNoConfig = this.config.cardNo;
        const copyrightConfig = this.config.copyright;
        this.drawText(this.data.cardNo, {...cardNoConfig, color: isToken(this.data.cardType) ? cardNoConfig.tokenColor : cardNoConfig.color});
        this.drawText(this.data.copyright ?? DEFAULT_COPYRIGHT,
            {...copyrightConfig, color: isToken(this.data.cardType) ? copyrightConfig.tokenColor : copyrightConfig.color},
            () => {
            this.canvasContext.textAlign = "right";
        });
    };

    draw = () => {
        this.drawCardImage();
        this.drawDescBackground();
        this.drawFrame();
        this.drawAttackDefenseCost();
        this.drawDesc();
        this.drawName();
        this.drawRace();
        this.drawRarity();
        this.drawFooter();
    };
}
