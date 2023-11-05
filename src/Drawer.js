import {isNoStatus, isEvo, isLG, isLeader, isEP, isToken, isUR, isFollower, isSpell, isAmulet} from "./util/cardTypeUtil";
import {compact, forEach, map, size, split, sumBy, min, isEmpty, remove, join} from "lodash";
import getNumberPosition from "./util/getNumberPosition";

class Drawer {
    constructor(cardData, canvas, assetManager) {
        this.data = cardData;
        this.assetManager = assetManager;
        this.canvasContext = canvas.getContext("2d");
        this.canvas = canvas;
    }

    get isUR() {
        return isUR(this.data);
    }
    get isLeader() {
        return isLeader(this.data);
    }
    get isEvo() {
        return isEvo(this.data);
    }
    get isLG() {
        return isLG(this.data);
    }
    get isToken() {
        return isToken(this.data);
    }
    get isNoStatus() {
        return isNoStatus(this.data);
    }
    get isFollower() {
        return isFollower(this.data);
    }
    get isSpell() {
        return isSpell(this.data);
    }
    get isAmulet() {
        return isAmulet(this.data);
    }
    get isEP() {
        return isEP(this.data);
    }

    drawText = (text, config, setContext) => {
        if (text != null) {
            this.assetManager.loadFont(config.fontFamily);
            this.canvasContext.save();
            this.canvasContext.font = `${config.fontWeight ? `${config.fontWeight} ` : ""}${config.fontSize}px ${config.fontFamily}`;
            if (config.textBaseline) this.canvasContext.textBaseline = config.textBaseline;
            if (config.textAlign) this.canvasContext.textAlign = config.textAlign;
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

    ctxMeasureTextWidth = (text) => this.canvasContext.measureText(text).width;

    mesuareText = (text, config) => {
        if (text != null) {
            this.assetManager.loadFont(config.fontFamily);
            this.canvasContext.save();
            this.canvasContext.font = `${config.fontSize}px ${config.fontFamily}`;
            const width = this.ctxMeasureTextWidth(text);
            this.canvasContext.restore();
            return width;
        }
        return 0;
    };

    drawNumber = (number, config, isCost) => {
        const image = this.assetManager.loadNumberSprite(this.isUR);
        if (number != null && image) {
            const numbers = split(number, "");
            const numberPositions = map(numbers, n => getNumberPosition(n, {isUR: this.isUR, isCost}));
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
                let left = config.position[0];
                if (config.textAlign === "center") left = config.position[0] - width / 2;
                const top = config.position[1] - config.fontSize / 2;
                let leftOffset = 0;
                forEach(numbers, (n, index) => {
                    this.drawImage(image,
                        ...numberPositions[index],
                        left + leftOffset, top, ...numberSize[index],);
                    leftOffset += numberSize[index][0];
                });
            }
        }
    };
}

export default Drawer;