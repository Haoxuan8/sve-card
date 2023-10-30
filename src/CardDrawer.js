import {splitText, measureIconWidth, textIconMap, measureTextWidth} from "./util/splitText";
import {compact, forEach, map, size, split, sumBy, min, isEmpty, remove, join} from "lodash";
import getNumberPosition from "./util/getNumberPosition";
import Annotator from "./Annotator";
import Drawer from "./Drawer";

const DEFAULT_COPYRIGHT = "©Cygames,Inc.";

export default class CardDrawer extends Drawer {
    constructor(data, canvas, config, assetManager) {
        super(data, canvas, assetManager);
        this.data = data;
        this.canvas = canvas;
        this.config = config;
        this.canvasContext = canvas.getContext("2d");
        this.assetManager = assetManager;
        this.annotator = new Annotator(config);
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

    getDescLines = (text, maxWidth, maxLine, config) => {
        this.assetManager.loadFont(config.fontFamily);
        this.canvasContext.save();
        this.canvasContext.fillStyle = config.color;
        this.canvasContext.font = `${config.fontSize}px ${config.fontFamily}`;
        this.canvasContext.textBaseline = config.textBaseline;
        const iconOptions = {iconHeight: config.iconHeight, iconPaddingX: config.iconPaddingX};
        const onePunctuationWidth = this.ctxMeasureTextWidth("。");
        const oneTextWidth = this.ctxMeasureTextWidth("一");
        const result = splitText(text, maxWidth,
            maxLine, config.fontFamily, {handlePunctuation: onePunctuationWidth === oneTextWidth},
             (t) => measureTextWidth(t, this.ctxMeasureTextWidth, iconOptions));
        this.canvasContext.restore();
        return result;
    };

    drawDesc = () => {
        let speechList;
        if (!isEmpty(this.data.speech) && !this.isUR && !this.isLeader) {
            const result = this.getDescLines(this.data.speech,
                this.config.speech.position[2], this.config.speech.maxLine,
                this.config.speech);
            speechList = result.list;
        }
        const {list} = this.getDescLines(this.data.desc,
            this.config.desc.position[2],
            this.isUR ? this.config.desc.URMaxLine : this.config.desc.maxLine - size(speechList),
            this.config.desc);

        const drawTextList = (textList, position, config) => {
            this.canvasContext.save();
            this.canvasContext.fillStyle = config.color;
            this.canvasContext.font = `${config.italic ? "italic " : ""}${config.fontSize}px ${config.fontFamily}`;
            this.canvasContext.textBaseline = config.textBaseline;
            forEach(textList, (textArr, i) => {
                let currentText = "";
                let left = position[0];
                let top = position[1] + i * config.lineHeight;
                const scale = min([position[2] / measureTextWidth(textArr, this.ctxMeasureTextWidth,
                     {iconHeight: config.iconHeight, iconPaddingX: config.iconPaddingX}), 1]);
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
                        const icon = this.assetManager.loadImageAsset(iconItem.src);
                        left += config.iconPaddingX;
                        const maxWidth = measureIconWidth(item, config.iconHeight) * scale;
                        this.drawImage(icon, left, top + config.iconTopOffset, maxWidth, config.iconHeight);
                        left += maxWidth;
                        left += config.iconPaddingX;
                    };
    
                    const drawPunctuation = (item) => {
                        const width = this.ctxMeasureTextWidth(item.text) / 2;
                        const isRight = item.position === "right";
                        const isLeft = item.position === "left";
                        this.canvasContext.fillText(item.text, left - (isRight ? width : isLeft ? 0 : (width / 2)), top);
                        left += width;
                    };
    
                    if (it.type === "char") {
                        currentText += it.text;
                    } else if (it.type === "icon") {
                        flashText();
                        drawIcon(it);
                    } else if (it.type === "punctuation") {
                        flashText();
                        drawPunctuation(it);
                    }
                    flashText();
                });
            });
            this.canvasContext.restore();
        };

        const descPosition = [...(this.isUR ? this.config.desc.URPosition : this.config.desc.position)];
        if (this.isUR) {
            const height = this.config.desc.lineHeight * size(list);
            descPosition[0] += this.config.descBackground.URPaddingX;
            descPosition[1] = descPosition[1] - height - this.config.descBackground.URPaddingY;
            descPosition[2] -= 2 * this.config.descBackground.URPaddingX;
        }
        drawTextList(list, descPosition, this.config.desc);

        const speechPosition = [...this.config.speech.position];
        speechPosition[1] -= this.config.speech.lineHeight * (size(speechList) - 1);
        drawTextList(speechList, speechPosition, this.config.speech);
    };

    drawDescBackground = () => {
        const image = this.assetManager.loadDescBackground(this.isUR);
        const position =[...(this.isUR ? this.config.descBackground.URPosition : this.config.descBackground.position)];
        if (this.isUR) {
            const lines = size(this.getDescLines(this.data.desc,
                this.config.desc.position[2], this.config.desc.URMaxLine, this.config.desc).list);
            const height = this.config.descBackground.URLineHeight * lines + 2 * this.config.descBackground.URPaddingY;
            position[3] = height;
            position[1] -= height;
        }
        this.drawImage(image, ...position);
    };

    drawAttackDefenseCost = () => {
        !this.isNoStatus && this.drawNumber(this.data.attack, this.config.attack);
        !this.isNoStatus && this.drawNumber(this.data.defense, this.config.defense);
        !this.isEvo && this.drawNumber(this.data.cost, this.config.cost, true);
    };

    drawName = () => {
        const config = {};
        if (this.isUR || this.isLG || this.isLeader) {
            config.color = this.config.name.LGColor;
            config.shadowBlur = this.config.name.LGShadowBlur;
            config.shadowLine = this.config.name.LGShadowLine;
            config.shadowColor = this.config.name.LGShadowColor;
        }
        if (this.isLeader) {
            config.position = this.config.name.leaderPosition;
        }

        let needAnnotation = false;
        const nameConfig = {...this.config.name, ...config};
        const nameOriginalWidth = this.mesuareText(this.data.name, nameConfig);
        const maxWidth = nameConfig.position[2];
        const widthOverMax = nameOriginalWidth > maxWidth;
        const nameWidth = min([nameOriginalWidth, maxWidth]);
        nameConfig.position = [...nameConfig.position];
        nameConfig.position[0] -= nameWidth / 2;
        if (this.config.name.fontFamily === "sve-card-ja"
        && this.config.name.annotation && !isEmpty(this.config.kuroshiro.dictPath)) {
            const result = this.annotator.annotate(this.data.name, this.draw);
            if (typeof result === "object") {
                needAnnotation = true;
                forEach(result, (node) => {
                    const originalWidth = this.mesuareText(node.text, nameConfig);
                    const width = widthOverMax ? originalWidth / nameOriginalWidth * nameWidth : originalWidth;
                    if (node.type === "RUBY") {
                        const position = [...nameConfig.position];
                        position[0] += width / 2;
                        position[1] += nameConfig.annotationYOffset;
                        position[2] = width;
                        this.drawText(node.annotation,
                            {...nameConfig, position, fontSize: nameConfig.annotationFontSize},
                            () => this.canvasContext.textAlign = "center");
                    }
                    const position = [...nameConfig.position];
                    position[2] = width;
                    this.drawText(node.text, {...nameConfig, position});
                    nameConfig.position[0] += width;
                });
            }
        }
        if (!needAnnotation) {
            this.drawText(this.data.name, nameConfig);
        }
    };

    drawRace = () => {
        const [left, top, width] = this.config.race.position;
        let offset = 0;
        if (this.isNoStatus) offset += this.config.race.noStatusOffset;
        if (this.isToken) offset += this.config.race.tokenOffset;
        if (this.isEvo && this.isUR) offset += this.config.race.evoOffset;
        this.drawText(this.data.race, {
            ...this.config.race,
            position: [left + offset, top, width],
        });
    };

    drawRarity = () => {
        if (this.isToken) {}
        else {
            const image = this.assetManager.loadRarityImage(this.data.rarity);
            const [left, top, width, height] = this.config.rarity.position;
            this.drawImage(image, left + (this.isNoStatus ? this.config.rarity.noStatusOffset : 0), top, width, height);
        }
    };

    drawFooter = () => {
        const cardNoConfig = this.config.cardNo;
        const copyrightConfig = this.config.copyright;
        const getColor = (config) => {
            if (this.isToken) return config.tokenColor;
            else if (this.isUR || this.isLeader) return config.URColor;
            else return config.color;
        };
        const cardNoLines = split(this.data.cardNo, "\n");
        const removed = remove(cardNoLines, (t, i) => i >= this.config.cardNo.maxLine);
        if (removed.length) cardNoLines[this.config.cardNo.maxLine - 1] = cardNoLines[this.config.cardNo.maxLine - 1] + join(removed, "");

        forEach(cardNoLines, (line, i) => {
            const position = [...cardNoConfig.position];
            position[1] -= (size(cardNoLines) - i - 1) * cardNoConfig.lineHeight;
            this.drawText(line, {...cardNoConfig, position, color: getColor(cardNoConfig)});
        });
        this.drawText(this.data.copyright ?? DEFAULT_COPYRIGHT,
            {...copyrightConfig, color: getColor(copyrightConfig)},
            () => {
            this.canvasContext.textAlign = "right";
        });
    };

    drawSpeech = () => {
        
    };

    clearCanvas = () => {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    draw = () => {
        this.drawCardImage();
        if (!this.isLeader) this.drawDescBackground();
        this.drawFrame();
        if (!this.isLeader) this.drawAttackDefenseCost();
        if (!this.isLeader) this.drawDesc();
        if (!this.isLeader && !this.isUR) this.drawSpeech();
        this.drawName();
        if (!this.isLeader) this.drawRace();
        if (!this.isLeader) this.drawRarity();
        this.drawFooter();
    };
}
