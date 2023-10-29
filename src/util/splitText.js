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

const defalutLeftPunctutations = ["。", "，", "：", "』", "、", "】", "」"];
const defaultRightPunctutations = ["【", "『", "「"];

const fontFamilyPunctutationMap = {
    "sve-card-ja": {
        left: ["。", "，", "、", "』", "】", "」"],
        right: ["【", "『", "「"],
        center: ["："],
    },
};


const isPunctuation = (char, fontFamily) => {
    const map = fontFamilyPunctutationMap[fontFamily] ?? {};
    const left = map.left ?? defalutLeftPunctutations;
    const right = map.right ?? defaultRightPunctutations;
    const center = map.center ?? [];
    const puctutations = [...left, ...right, ...center];
    return puctutations.includes(char);
};

const isLeftPunctuation = (char, fontFamily) => {
    const map = fontFamilyPunctutationMap[fontFamily] ?? {};
    const left = map.left ?? defalutLeftPunctutations;
    return left.includes(char);
};

const isRightPunctuation = (char, fontFamily) => {
    const map = fontFamilyPunctutationMap[fontFamily] ?? {};
    const right = map.right ?? defaultRightPunctutations;
    return right.includes(char);
};

const isCenterPunctuation = (char, fontFamily) => {
    const map = fontFamilyPunctutationMap[fontFamily] ?? {};
    const center = map.center ?? [];
    return center.includes(char);
};

export const textIconMap = {
    "/act": {
        src: "image/desc/act.png",
        height: 184,
        width: 187,
    },
    "/quick": {
        src: "image/desc/quick.png",
        height: 88,
        width: 214,
    },
    "/start": {
        src: "image/desc/start.png",
        height: 184,
        width: 187,
    },
    "/fanfare": {
        src: "image/desc/fanfare.png",
        height: 184,
        width: 187,
    },
    "/lastword": {
        src: "image/desc/lastword.png",
        height: 184,
        width: 187,
    },
    "/attack": {
        src: "image/desc/attack.png",
        height: 184,
        width: 187,
    },
    "/defense": {
        src: "image/desc/defense.png",
        height: 184,
        width: 187,
    },
    "/eat": {
        src: "image/desc/eat.png",
        height: 184,
        width: 187,
    },
    "/evo": {
        src: "image/desc/evo.png",
        height: 184,
        width: 187,
    },
    "/cost0": {
        src: "image/desc/cost0.png",
        height: 184,
        width: 187,
    },
    "/cost1": {
        src: "image/desc/cost1.png",
        height: 184,
        width: 187,
    },
    "/cost2": {
        src: "image/desc/cost2.png",
        height: 184,
        width: 187,
    },
    "/cost3": {
        src: "image/desc/cost3.png",
        height: 184,
        width: 187,
    },
    "/cost4": {
        src: "image/desc/cost4.png",
        height: 184,
        width: 187,
    },
    "/cost5": {
        src: "image/desc/cost5.png",
        height: 184,
        width: 187,
    },
    "/cost6": {
        src: "image/desc/cost6.png",
        height: 184,
        width: 187,
    },
    "/cost7": {
        src: "image/desc/cost7.png",
        height: 184,
        width: 187,
    },
    "/cost8": {
        src: "image/desc/cost8.png",
        height: 184,
        width: 187,
    },
    "/cost9": {
        src: "image/desc/cost9.png",
        height: 184,
        width: 187,
    },
    "/costx": {
        src: "image/desc/costx.png",
        height: 184,
        width: 187,
    },
    "/forest": {
        src: "image/desc/forest.png",
        height: 184,
        width: 187,
    },
    "/sword": {
        src: "image/desc/sword.png",
        height: 184,
        width: 187,
    },
    "/heaven": {
        src: "image/desc/heaven.png",
        height: 184,
        width: 187,
    },
    "/rune": {
        src: "image/desc/rune.png",
        height: 184,
        width: 187,
    },
    "/dragon": {
        src: "image/desc/dragon.png",
        height: 184,
        width: 187,
    },
    "/abyss": {
        src: "image/desc/abyss.png",
        height: 184,
        width: 187,
    },
    "/neutral": {
        src: "image/desc/neutral.png",
        height: 184,
        width: 187,
    },
    "/portal": {
        src: "image/desc/portal.png",
        height: 184,
        width: 187,
    },
};
const iconKeys = keys(textIconMap);

// {type, text,}[]
const formatText = (line, fontFamily, handlePunctuation) => {
    const result = [];
    let currentChar = "";
    let isSlashStart = false;

    const formatChar = (c) => {
        if (handlePunctuation && isPunctuation(c, fontFamily)) {
            return {
                type: "punctuation",
                text: c,
                position:
                isLeftPunctuation(c, fontFamily)
                ? "left"
                : isRightPunctuation(c, fontFamily) ? "right" : "center",
            };
        } else {
            return {type: "char", text: c};
        }
    };

    const flashCurrentChar = () => {
        if (currentChar !== "") {
            forEach(currentChar, c => {
                result.push(formatChar(c));
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
                result.push(formatChar(char));
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

    const onePunctuationWidth = ctxMeasureTextWidth("。");
    const allPunctuation = filter(formattedText, it => it.type === "punctuation");
    const allPunctuationWidth = ceil(onePunctuationWidth * size(allPunctuation) / 2);

    const allIcon = filter(formattedText, it => it.type === "icon");
    const allIconWidth = flow([
        (arr) => map(arr, it => measureIconWidth(it, iconHeight)),
        sum,
    ])(allIcon);

    return ctxMeasureTextWidth(allText) + allIconWidth + size(allIcon) * iconPaddingX * 2 + allPunctuationWidth;
};

const splitText = (text, width, maxLine, fontFamily, ctxMeasureTextWidth, options) => {
    let list = split(text, "\n");
    const removed = remove(list, (t, i) => i >= maxLine);
    if (removed.length) list[maxLine - 1] = list[maxLine - 1] + join(removed, "");

    const onePunctuationWidth = ctxMeasureTextWidth("。");
    const oneTextWidth = ctxMeasureTextWidth("一");

    list = map(list, t => formatText(t, fontFamily, onePunctuationWidth === oneTextWidth));

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
                && isPunctuation(word.text, fontFamily)
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
        if (!isEmpty(currentLine)) {
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
