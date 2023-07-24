import splitText, {measureIconWidth, textIconMap} from "./util/splitText";
import {compact, forEach, map, size, split, sumBy} from "lodash";
import {getIsNoStatus, isEvo, isLG, isLeader, isToken, isUR} from "./util/cardTypeUtil";
import getNumberPosition, {getNumberSprite} from "./util/getNumberPosition";

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

    ctxMeasureTextWidth = (text) => this.canvasContext.measureText(text).width;

    getDescLines = (maxWidth, maxLine) => {
        this.assetManager.loadFont(this.config.desc.fontFamily);
        this.canvasContext.save();
        this.canvasContext.fillStyle = this.config.desc.color;
        this.canvasContext.font = `${this.config.desc.fontSize}px ${this.config.desc.fontFamily}`;
        this.canvasContext.textBaseline = "top";
        const iconOptions = {iconHeight: this.config.desc.iconHeight, iconPaddingX: this.config.desc.iconPaddingX};
        const result = splitText(this.data.desc, maxWidth,
            maxLine, this.ctxMeasureTextWidth, iconOptions);
        this.canvasContext.restore();
        return result;
    };

    drawDesc = () => {
        this.assetManager.loadFont(this.config.desc.fontFamily);
        const {list, scale} = this.getDescLines(this.config.desc.position[2], isUR(this.data) ? this.config.desc.URMaxLine : this.config.desc.maxLine);
        this.canvasContext.save();
        this.canvasContext.fillStyle = this.config.desc.color;
        this.canvasContext.font = `${this.config.desc.fontSize}px ${this.config.desc.fontFamily}`;
        this.canvasContext.textBaseline = "top";
        const position = [...(isUR(this.data) ? this.config.desc.URPosition : this.config.desc.position)];
        if (isUR(this.data)) {
            const height = this.config.desc.lineHeight * size(list);
            position[0] += this.config.descBackground.URPaddingX;
            position[1] = position[1] - height - this.config.descBackground.URPaddingY;
            position[2] -= 2 * this.config.descBackground.URPaddingX;
        }
        forEach(list, (textArr, i) => {
            let currentText = "";
            let left = position[0];
            let top = position[1] + i * this.config.desc.lineHeight;
            forEach(textArr, (it) => {
                const flashText = () => {
                    if (currentText !== "") {
                        const maxWidth = this.ctxMeasureTextWidth(currentText) * scale;
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
        const image = this.assetManager.loadDescBackground(isUR(this.data));
        const position =[...(isUR(this.data) ? this.config.descBackground.URPosition : this.config.descBackground.position)];
        if (isUR(this.data)) {
            const lines = size(this.getDescLines(this.config.desc.position[2], this.config.desc.URMaxLine).list);
            const height = this.config.descBackground.URLineHeight * lines + 2 * this.config.descBackground.URPaddingY;
            position[3] = height;
            position[1] -= height;
        }
        this.drawImage(image, ...position);
    };

    drawAttackDefenseCost = () => {
        const isNoStatus = getIsNoStatus(this.data);
        const image = this.assetManager.loadImage(getNumberSprite(isUR(this.data)));
        const drawNumber = (number, config, isCost) => {
            if (number != null && image) {
                const numbers = split(number, "");
                const numberPositions = map(numbers, n => getNumberPosition(n, {isUR: isUR(this.data), isCost}));
                if (compact(numberPositions).length > 0) {
                    let numberSize = map(numberPositions, position => {
                        const height = config.fontSize;
                        const s = height / position[3];
                        return [position[2] * s, height];
                    });
                    let width = sumBy(numberSize, it => it[0]);
                    if (width > config.position[2]) {
                        const s = width / config.position[2];
                        numberSize = map(numberSize, size => ([size[0] / s, size[1]]));
                        width = sumBy(numberSize, it => it[0]);
                    }

                    const left = config.position[0] - width / 2;
                    const top = config.position[1] - config.fontSize / 2;
                    let leftOffset = 0;
                    forEach(numbers, (n, index) => {
                        this.drawImage(image,
                            ...numberPositions[index],
                            left + leftOffset, top, ...numberSize[index],);
                        leftOffset += numberSize[index][0];
                    });
                }
        
                // this.assetManager.loadFont(config.fontFamily);
                // this.canvasContext.save();
                // this.canvasContext.font = `${config.fontWeight ?? ""} ${config.fontSize}px ${config.fontFamily}`;
                // this.canvasContext.textAlign = "center";
                // this.canvasContext.shadowColor = "black";
                // this.canvasContext.shadowBlur = config.shadowBlur;
                // this.canvasContext.lineWidth = config.shadowLine;
                // this.canvasContext.strokeText(`${number}`, ...config.position);
                // this.canvasContext.fillStyle = config.color;
                // this.canvasContext.shadowBlur = 0;
                // this.canvasContext.fillText(`${number}`, ...config.position);
                // this.canvasContext.restore();
            }
        };

        !isNoStatus && drawNumber(this.data.attack, this.config.attack);
        !isNoStatus && drawNumber(this.data.defense, this.config.defense);
        !isEvo(this.data) && drawNumber(this.data.cost, this.config.cost, true);
    };

    drawText = (text, config, setContext) => {
        if (text != null) {
            this.assetManager.loadFont(config.fontFamily);
            this.canvasContext.save();
            this.canvasContext.font = `${config.fontSize}px ${config.fontFamily}`;
            setContext?.();
            if (config.shadowLine) {
                this.canvasContext.shadowColor = config.shadowColor ?? "black";
                this.canvasContext.shadowBlur = config.shadowBlur ?? 0;
                this.canvasContext.lineWidth = config.shadowLine;
                this.canvasContext.strokeText(text, ...config.position);
            }

            this.canvasContext.fillStyle = config.color;
            this.canvasContext.fillText(text, ...config.position);
            this.canvasContext.restore();
        }
    };

    drawName = () => {
        const config = {};
        if (isUR(this.data) || isLG(this.data) || isLeader(this.data)) {
            config.color = this.config.name.LGColor;
            config.shadowBlur = this.config.name.LGShadowBlur;
            config.shadowLine = this.config.name.LGShadowLine;
            config.shadowColor = this.config.name.LGShadowColor;
        }
        if (isLeader(this.data)) {
            config.position = this.config.name.leaderPosition;
        }
        this.drawText(this.data.name, {...this.config.name, ...config}, () => {
            this.canvasContext.textAlign = "center";
        });
    };

    drawRace = () => {
        const [left, top, width] = this.config.race.position;
        let offset = 0;
        if (getIsNoStatus(this.data)) offset += this.config.race.noStatusOffset;
        if (isToken(this.data)) offset += this.config.race.tokenOffset;
        if (isEvo(this.data) && isUR(this.data)) offset += this.config.race.evoOffset;
        this.drawText(this.data.race, {
            ...this.config.race,
            position: [left + offset, top, width],
        });
    };

    drawRarity = () => {
        if (isToken(this.data)) {}
        else {
            const image = this.assetManager.loadRarityImage(this.data.rarity);
            const [left, top, width, height] = this.config.rarity.position;
            const isNoStatus = getIsNoStatus(this.data);
            this.drawImage(image, left + (isNoStatus ? this.config.rarity.noStatusOffset : 0), top, width, height);
        }
    };

    drawFooter = () => {
        const cardNoConfig = this.config.cardNo;
        const copyrightConfig = this.config.copyright;
        const getColor = (config) => {
            if (isToken(this.data)) return config.tokenColor;
            else if (isUR(this.data)) return config.URColor;
            else return config.color;
        };

        this.drawText(this.data.cardNo, {...cardNoConfig, color: getColor(cardNoConfig)});
        this.drawText(this.data.copyright ?? DEFAULT_COPYRIGHT,
            {...copyrightConfig, color: getColor(copyrightConfig)},
            () => {
            this.canvasContext.textAlign = "right";
        });
    };

    clearCanvas = () => {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    draw = () => {
        this.drawCardImage();
        if (!isLeader(this.data)) this.drawDescBackground();
        this.drawFrame();
        if (!isLeader(this.data)) this.drawAttackDefenseCost();
        if (!isLeader(this.data)) this.drawDesc();
        this.drawName();
        if (!isLeader(this.data)) this.drawRace();
        if (!isLeader(this.data)) this.drawRarity();
        this.drawFooter();
    };
}
