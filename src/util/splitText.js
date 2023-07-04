import {
    split,
    remove,
    join,
    reduce,
    forEach,
    ceil,
    max,
    flatMap,
    keys,
    flow,
    filter,
    map,
    isEmpty,
    sum,
    size,
} from "lodash";
import ActPng from "../asset/image/desc/act.png";
import QuickPng from "../asset/image/desc/quick.png";
import StartPng from "../asset/image/desc/start.png";
import FanfarePng from "../asset/image/desc/fanfare.png";
import LastwordPng from "../asset/image/desc/lastword.png";
import AttackPng from "../asset/image/desc/attack.png";
import DefensePng from "../asset/image/desc/defense.png";
import EatPng from "../asset/image/desc/eat.png";
import EvoPng from "../asset/image/desc/evo.png";
import Cost0Png from "../asset/image/desc/cost0.png";
import Cost1Png from "../asset/image/desc/cost1.png";
import Cost2Png from "../asset/image/desc/cost2.png";
import Cost3Png from "../asset/image/desc/cost3.png";
import Cost4Png from "../asset/image/desc/cost4.png";
import Cost5Png from "../asset/image/desc/cost5.png";
import Cost6Png from "../asset/image/desc/cost6.png";
import Cost7Png from "../asset/image/desc/cost7.png";
import Cost8Png from "../asset/image/desc/cost8.png";
import Cost9Png from "../asset/image/desc/cost9.png";
import CostXPng from "../asset/image/desc/costx.png";

const isPunctuation = (char) => {
    const punctuationMap = ["。", "，", "：", "【", "】", "「", "」"];
    return punctuationMap.includes(char);
};

export const textIconMap = {
    "/act": {
        src: ActPng,
        height: 184,
        width: 187,
    },
    "/quick": {
        src: QuickPng,
        height: 88,
        width: 214,
    },
    "/start": {
        src: StartPng,
        height: 184,
        width: 187,
    },
    "/fanfare": {
        src: FanfarePng,
        height: 184,
        width: 187,
    },
    "/lastword": {
        src: LastwordPng,
        height: 184,
        width: 187,
    },
    "/attack": {
        src: AttackPng,
        height: 184,
        width: 187,
    },
    "/defense": {
        src: DefensePng,
        height: 184,
        width: 187,
    },
    "/eat": {
        src: EatPng,
        height: 184,
        width: 187,
    },
    "/evo": {
        src: EvoPng,
        height: 184,
        width: 187,
    },
    "/cost0": {
        src: Cost0Png,
        height: 184,
        width: 187,
    },
    "/cost1": {
        src: Cost1Png,
        height: 184,
        width: 187,
    },
    "/cost2": {
        src: Cost2Png,
        height: 184,
        width: 187,
    },
    "/cost3": {
        src: Cost3Png,
        height: 184,
        width: 187,
    },
    "/cost4": {
        src: Cost4Png,
        height: 184,
        width: 187,
    },
    "/cost5": {
        src: Cost5Png,
        height: 184,
        width: 187,
    },
    "/cost6": {
        src: Cost6Png,
        height: 184,
        width: 187,
    },
    "/cost7": {
        src: Cost7Png,
        height: 184,
        width: 187,
    },
    "/cost8": {
        src: Cost8Png,
        height: 184,
        width: 187,
    },
    "/cost9": {
        src: Cost9Png,
        height: 184,
        width: 187,
    },
    "/costx": {
        src: CostXPng,
        height: 184,
        width: 187,
    },
};
const iconKeys = keys(textIconMap);

// {type, text,}[]
const formatText = (line) => {
    const result = [];
    let currentChar = "";
    let isSlashStart = false;

    const flashCurrentChar = () => {
        if (currentChar !== "") {
            forEach(currentChar, c => {
                result.push({type: "char", text: c});
            });
            currentChar = "";
        }
    };

    forEach(line, (char, i) => {
        if (char === "/") {
            flashCurrentChar();
            isSlashStart = true;
            currentChar = currentChar + char;
        } else {
            if (isSlashStart) {
                currentChar = currentChar + char;
                if (textIconMap[currentChar]) {
                    result.push({type: "icon", text: currentChar});
                    currentChar = "";
                }
            } else {
                result.push({type: "char", text: char});
            }
        }
    });
    flashCurrentChar();

    return result;
};

export const measureIconWidth = (textItem, iconHeight) => {
    const iconItem = textIconMap[textItem.text];
    const {height, width} = iconItem;
    const scale = iconHeight / height;
    return width * scale;
};

// 会替换图标
export const measureTextWidth = (formattedText, ctxMeasureTextWidth, options) => {
    const {iconHeight, iconPaddingX} = options;
    const allText = flow([
        (arr) => filter(arr, it => it.type === "char"),
        (arr) => map(arr, it => it.text),
        (arr) => join(arr, ""),
    ])(formattedText);

    const allIcon = filter(formattedText, it => it.type === "icon");
    const allIconWidth = flow([
        (arr) => map(arr, it => measureIconWidth(it, iconHeight)),
        sum,
    ])(allIcon);

    return ctxMeasureTextWidth(allText) + allIconWidth + size(allIcon) * iconPaddingX * 2;
};

const splitText = (text, width, maxLine, ctxMeasureTextWidth, options) => {
    let list = split(text, "\n");
    const removed = remove(list, (t, i) => i >= maxLine);
    if (removed.length) list[maxLine - 1] = list[maxLine - 1] + join(removed, "");

    list = map(list, t => formatText(t));

    const getCurrentLines = (scale) => {
        return reduce(list, (lines, t) => {
            lines += Math.ceil((scale * measureTextWidth(t, ctxMeasureTextWidth, options)) / width);
            return lines;
        }, 0);
    };

    let scale = 1;
    while (getCurrentLines(scale) > maxLine && scale > 0) {
        scale -= 0.01;
    }

    const res = flatMap(list, t => {
        const oneLineWidth = scale * measureTextWidth(t, ctxMeasureTextWidth, options);
        let currentRes = [];
        let currentLine = [];
        forEach(t, word => {
            if (
                isEmpty(currentLine)
                && currentRes.length > 0
                && isPunctuation(word.text)
            ) {
                currentRes[currentRes.length - 1].push(word);
            } else {
                currentLine.push(word);
                if (scale * measureTextWidth(currentLine, ctxMeasureTextWidth, options) >= width) {
                    currentRes.push(currentLine);
                    currentLine = [];
                }
            }
        });
        if (currentLine) {
            currentRes.push(currentLine);
        }
        return currentRes;
    });

    return {
        list: res,
        scale,
    };
};

export default splitText;