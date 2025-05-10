import CardDrawer from "./CardDrawer";
import Drawer from "./Drawer";
import Annotator from "./Annotator";
import {cardTypeMap} from "./util/getFrame";
import {isEmpty, forEach, min, size, times} from "lodash";
import {craftCHSMap, craftJPMap} from "./config/constant";
import {splitText, measureTextWidth, textIconMap} from "./util/splitText";
import CardShowcase from "./CardShowcase";

const startKeywordCharToEndMap = {
    "【": "】",
    "《": "》",
    "「": "」",
    "『": "』",
};


class ShowcaseDrawer extends Drawer {
    constructor({
        cardData,
        showcaseData,
        cardConfig,
        showcaseConfig,
        canvas,
        assetManager,
    }) {
        super(cardData, canvas, assetManager);
        this.cardData = cardData;
        this.showcaseData = showcaseData;
        this.cardConfig = cardConfig;
        this.showcaseConfig = showcaseConfig;
        this.canvas = canvas;
        this.assetManager = assetManager;
        this.cardDrawer = new CardDrawer(cardData, canvas, cardConfig, assetManager);
        this.annotator = new Annotator(cardConfig);
        this.canvasContext = canvas.getContext("2d");
    }
    
    isCN = (fontFamily) => {
        return fontFamily === "sve-card-cn";
    };

    getText = (config) => {
        return this.isCN(config.fontFamily) ? config.CHSText : config.JPText;
    };

    getCraftText = (config) => {
        return this.isCN(config.fontFamily) ? craftCHSMap[this.cardData.craft] : craftJPMap[this.cardData.craft];
    };

    drawImage = (image, ...position) => {
        if (image) {
            this.canvasContext.drawImage(image, ...position);
        } else {
        }
    };

    drawShowcaseFrame = () => {
        const frame = this.assetManager.loadShowcaseFrame();
        this.drawImage(frame, ...this.showcaseConfig.frame.position);
    };
    
    drawName = () => {
        let needAnnotation = false;
        const nameConfig = {...this.showcaseConfig.name, position: [...this.showcaseConfig.name.position]};
        const nameOriginalWidth = this.mesuareText(this.cardData.name, nameConfig);
        const maxWidth = nameConfig.position[2];
        const widthOverMax = nameOriginalWidth > maxWidth;
        const nameWidth = min([nameOriginalWidth, maxWidth]);
        if (this.showcaseConfig.name.fontFamily === "sve-card-ja"
        && this.showcaseConfig.name.annotation && !isEmpty(this.cardConfig.kuroshiro.dictPath)) {
            const result = this.annotator.annotate(this.cardData.name, this.draw);
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
        if (!needAnnotation) this.drawText(this.cardData.name, this.showcaseConfig.name);
    };

    drawClass = () => {
        this.drawText(this.getText(this.showcaseConfig.class), this.showcaseConfig.class);
        const [icon, iconItem] = this.assetManager.loadCraftIcon();
        const iconHeight = this.showcaseConfig.class.iconHeight;
        const scale = iconHeight / iconItem.height;
        const width = iconItem.width * scale;
        const iconPosition = [...this.showcaseConfig.class.iconPosition];
        this.drawImage(icon, iconPosition[0], iconPosition[1] - this.showcaseConfig.class.fontSize / 2,
            width, iconHeight);
        const contentConfig = {
            ...this.showcaseConfig.class,
            position: [...this.showcaseConfig.class.contentPosition],
            color: this.showcaseConfig.class.contentColor,
        };
        this.drawText(this.getCraftText(contentConfig), contentConfig);
    };

    drawRace = () => {
        this.drawText(this.getText(this.showcaseConfig.race), this.showcaseConfig.race);
        const contentConfig = {
            ...this.showcaseConfig.race,
            maxLine: this.showcaseConfig.race.contentMaxLine,
            lineHeight: this.showcaseConfig.race.contentLineHeight,
            position: [...this.showcaseConfig.race.contentPosition],
            color: this.showcaseConfig.race.contentColor,
        };
        const {list} = this.getTextLines(this.isEP ? "EP" : this.cardData.race, contentConfig.position[2], contentConfig.maxLine, contentConfig);
        this.drawLines(list, contentConfig);
        // this.drawText(this.isEP ? "EP" : this.cardData.race, contentConfig);
    };

    drawFrom = () => {
        this.drawText(this.getText(this.showcaseConfig.from), this.showcaseConfig.from);
        if (this.showcaseData.fromText) {
            const contentConfig = {
                ...this.showcaseConfig.from,
                position: [...this.showcaseConfig.from.contentTextPosition],
                color: this.showcaseConfig.from.contentTextColor,
                maxLine: this.showcaseConfig.from.contentTextMaxLine,
                lineHeight: this.showcaseConfig.from.contentTextLineHeight,
                fontSize: this.showcaseConfig.from.contentTextFontSize,
                textAlign: this.showcaseConfig.from.contentTextAlign,
            };
            const {list} = this.getTextLines(this.showcaseData.fromText, contentConfig.position[2], contentConfig.maxLine, contentConfig);
            this.drawLines(list, contentConfig);
        } else if (this.showcaseData.fromImage) {
            let {width, height, src} = this.showcaseData.fromImage;
            const position = [...this.showcaseConfig.from.contentPosition];
            width = this.showcaseConfig.scale * width;
            height = this.showcaseConfig.scale * height;
            position[0] -= width / 2;
            position[1] -= height / 2;
            this.drawImage(this.assetManager.loadImage(src), position[0], position[1], width, height);
        }
    };

    drawInformation = () => {
        this.drawClass();
        this.drawRace();
        this.drawFrom();
    };

    drawCardType = () => {
        const cardTypes = [];
        if (this.isFollower) {
            cardTypes.push(cardTypeMap.follower);
        }
        if (this.isSpell) {
            cardTypes.push(cardTypeMap.spell);
        }
        if (this.isAmulet) {
            cardTypes.push(cardTypeMap.amulet);
        }
        if (this.isEvo) {
            cardTypes.push(cardTypeMap.evolve);
        }
        if (this.isToken) {
            cardTypes.push(cardTypeMap.token);
        }
        if (this.isAdv) {
            cardTypes.push(cardTypeMap.advance);
        }
        const position = [...this.showcaseConfig.cardType.position];
        forEach(cardTypes, cardType => {
            const ratio = cardType.width / cardType.height;
            const iconWidth = ratio * this.showcaseConfig.cardType.iconHeight;
            const image = this.assetManager.loadImageAsset(cardType.src);
            this.drawImage(image, position[0], position[1], iconWidth, this.showcaseConfig.cardType.iconHeight);
            position[0] += iconWidth + this.showcaseConfig.cardType.spacing;
        });
    };


    drawStatus = (isAttack) => {
        const config = this.showcaseConfig[isAttack ? "attack" : "defense"];
        const icon = isAttack ? textIconMap["/attack"] : textIconMap["/defense"];
        const iconRatio = icon.width / icon.height;
        const iconWidth = iconRatio * config.iconHeight;
        const image = this.assetManager.loadImageAsset(icon.src);
        this.drawImage(image, config.iconPosition[0], config.iconPosition[1], iconWidth, config.iconHeight);
        this.drawNumber(this.cardData[isAttack ? "attack" : "defense"], config);
    };


    drawAttackAndDefense = () => {
        this.drawStatus(true);
        this.drawStatus(false);
    };

    getTextLines = (text, maxWidth, maxLine, config, replaceKeyword) => {
        this.assetManager.loadFont(config.fontFamily);
        this.canvasContext.save();
        this.canvasContext.fillStyle = config.color;
        this.canvasContext.font = `${config.fontSize}px ${config.fontFamily}`;
        this.canvasContext.textBaseline = config.textBaseline;
        const result = splitText(text, maxWidth,
            maxLine, config.fontFamily, {replaceKeyword,
                 isCHS: config.fontFamily === "sve-card-cn"},
             (t) => measureTextWidth(t, this.ctxMeasureTextWidth));
        this.canvasContext.restore();
        return result;
    };

    drawDescLine = (num) => {
        const lineImage = this.assetManager.loadImageAsset("image/desc/line.png");
        times(num, (index) => {
            const position = [...this.showcaseConfig.desc.linePosition];
            position[1] += index * this.showcaseConfig.desc.lineHeight;
            this.drawImage(lineImage, ...position);
        });
    };

    drawLines = (list, config) => {
        this.canvasContext.save();
        this.canvasContext.font = `${config.fontSize}px ${config.fontFamily}`;
        this.canvasContext.textBaseline = config.textBaseline;
        this.canvasContext.textAlign = config.textAlign;
        const position = [...config.position];
        let endChar = null;
        forEach(list, (line, i) => {
            let left = position[0];
            let top = position[1] + i * config.lineHeight;
            const scale = min([position[2] / measureTextWidth(line, this.ctxMeasureTextWidth), 1]);
            let currentText = "";
            const flashText = () => {
                if (currentText !== "") {
                    const maxWidth = this.ctxMeasureTextWidth(currentText) * scale;
                    this.canvasContext.fillStyle = endChar ? config.keywordColor: config.color;
                    this.canvasContext.fillText(currentText, left, top, maxWidth);
                    currentText = "";
                    left += maxWidth;
                }
            };
            forEach(line, it => {
                if (it.type === "char") {
                    const hasKeywordStartChar = startKeywordCharToEndMap[it.text];
                    if (hasKeywordStartChar) {
                        flashText();
                        endChar = hasKeywordStartChar;
                        currentText += it.text;
                    } else if (endChar === it.text) {
                        currentText += it.text;
                        flashText();
                        endChar = null;
                    } else currentText += it.text;
                }
            });
            flashText();
        });
        this.canvasContext.restore();
    };

    drawDesc = () => {
        const config = this.showcaseConfig.desc;
        const tokenDescConfig = {...this.showcaseConfig.tokenDesc};
        let tokenDescList;
        if (!isEmpty(this.data.tokenDesc)) {
            const result = this.getTextLines(this.data.tokenDesc,tokenDescConfig.position[2], tokenDescConfig.maxLine,tokenDescConfig);
                tokenDescList = result.list;
        }
        const {list} = this.getTextLines(this.cardData.desc, config.position[2], config.maxLine - size(tokenDescList), config, true);
        if (!isEmpty(tokenDescConfig)) {
            this.drawDescLine(4);
        } else if (size(list) > 5) {
            this.drawDescLine(size(list) - 5);
        }
        if (!isEmpty(tokenDescList)) {
            const tokenDescPosition = [...tokenDescConfig.position];
            tokenDescPosition[1] -= tokenDescConfig.lineHeight * (size(tokenDescList) - 1);
            tokenDescConfig.position = tokenDescPosition;
            this.drawLines(tokenDescList, tokenDescConfig);
        }
        this.drawLines(list, config);
    };

    drawCopyright = () => {
        this.drawText(this.cardData.copyright, this.showcaseConfig.copyright);
    };

    drawTip = () => {
        const tip = this.showcaseData?.tip ?? CardShowcase.defaultTip[this.isCN(this.showcaseConfig.tip.fontFamily) ? "CHS" : "JP"];
        this.drawText(tip, this.showcaseConfig.tip);
    };

    drawTokenTip = () => {
        const tip = this.showcaseData?.tokenTip ?? CardShowcase.defaultTokenTip[this.isCN(this.showcaseConfig.tokenTip.fontFamily) ? "CHS" : "JP"];
        this.drawText(tip, this.showcaseConfig.tokenTip);
    };

    drawCardImg = () => {
        const radius = this.cardConfig.cardImage.radius;
        const [x, y, width, height] = this.cardConfig.cardImage.position;
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
        this.drawImage(this.assetManager.loadImage(this.showcaseData.cardImgSrc), x, y, width, height);
        this.canvasContext.restore();
    };

    draw = () => {
        this.drawShowcaseFrame();
        if (this.showcaseData.cardImgSrc) {
            this.drawCardImg();
        } else {
            this.cardDrawer.draw();
        }
        this.drawName();
        this.drawInformation();
        this.drawCardType();
        if (!this.isNoStatus) this.drawAttackAndDefense();
        this.drawDesc();
        this.drawCopyright();
        this.drawTip();
        if (this.isToken) this.drawTokenTip();
    };
}

export default ShowcaseDrawer;