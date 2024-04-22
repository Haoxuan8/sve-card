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
    defaultsDeep,
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
        JPText: "《アクト》",
        CHSText: "《ACT》",
    },
    "/quick": {
        src: "image/desc/quick.png",
        height: 88,
        width: 214,
        JPText: "《クイック》",
        CHSText: "《快速》",
    },
    "/start": {
        src: "image/desc/start.png",
        height: 184,
        width: 187,
        JPText: "《起動》",
        CHSText: "《启动》",
    },
    "/fanfare": {
        src: "image/desc/fanfare.png",
        height: 184,
        width: 187,
        JPText: "《ファンファーレ》",
        CHSText: "《入场曲》",
    },
    "/lastword": {
        src: "image/desc/lastword.png",
        height: 184,
        width: 187,
        JPText: "《ラストワード》",
        CHSText: "《谢幕曲》",
    },
    "/attack": {
        src: "image/desc/attack.png",
        height: 184,
        width: 187,
        JPText: "《攻撃力》",
        CHSText: "《攻击力》",
    },
    "/defense": {
        src: "image/desc/defense.png",
        height: 184,
        width: 187,
        JPText: "《体力》",
        CHSText: "《体力》",
    },
    "/eat": {
        src: "image/desc/eat.png",
        height: 184,
        width: 187,
        JPText: "《食事》",
        CHSText: "《吃饭》",
    },
    "/evo": {
        src: "image/desc/evo.png",
        height: 184,
        width: 187,
        JPText: "《進化》",
        CHSText: "《进化》",
    },
    "/cost0": {
        src: "image/desc/cost0.png",
        height: 184,
        width: 187,
        JPText: "《コスト0》",
        CHSText: "《花费0》",
    },
    "/cost1": {
        src: "image/desc/cost1.png",
        height: 184,
        width: 187,
        JPText: "《コスト1》",
        CHSText: "《花费1》",
    },
    "/cost2": {
        src: "image/desc/cost2.png",
        height: 184,
        width: 187,
        JPText: "《コスト2》",
        CHSText: "《花费2》",
    },
    "/cost3": {
        src: "image/desc/cost3.png",
        height: 184,
        width: 187,
        JPText: "《コスト3》",
        CHSText: "《花费3》",
    },
    "/cost4": {
        src: "image/desc/cost4.png",
        height: 184,
        width: 187,
        JPText: "《コスト4》",
        CHSText: "《花费4》",
    },
    "/cost5": {
        src: "image/desc/cost5.png",
        height: 184,
        width: 187,
        JPText: "《コスト5》",
        CHSText: "《花费5》",
    },
    "/cost6": {
        src: "image/desc/cost6.png",
        height: 184,
        width: 187,
        JPText: "《コスト6》",
        CHSText: "《花费6》",
    },
    "/cost7": {
        src: "image/desc/cost7.png",
        height: 184,
        width: 187,
        JPText: "《コスト7》",
        CHSText: "《花费7》",
    },
    "/cost8": {
        src: "image/desc/cost8.png",
        height: 184,
        width: 187,
        JPText: "《コスト8》",
        CHSText: "《花费8》",
    },
    "/cost9": {
        src: "image/desc/cost9.png",
        height: 184,
        width: 187,
        JPText: "《コスト9》",
        CHSText: "《花费9》",
    },
    "/costx": {
        src: "image/desc/costx.png",
        height: 184,
        width: 187,
        JPText: "《コスト10》",
        CHSText: "《花费10》",
    },
    "/forest": {
        src: "image/desc/forest.png",
        height: 184,
        width: 187,
        JPText: "《エルフ》",
        CHSText: "《妖精》",
    },
    "/sword": {
        src: "image/desc/sword.png",
        height: 184,
        width: 187,
        JPText: "《ロイヤル》",
        CHSText: "《皇家》",
    },
    "/haven": {
        src: "image/desc/haven.png",
        height: 184,
        width: 187,
        JPText: "《ビショップ》",
        CHSText: "《主教》",
    },
    "/rune": {
        src: "image/desc/rune.png",
        height: 184,
        width: 187,
        JPText: "《ウィッチ》",
        CHSText: "《巫师》",
    },
    "/dragon": {
        src: "image/desc/dragon.png",
        height: 184,
        width: 187,
        JPText: "《ドラゴン》",
        CHSText: "《龙族》",
    },
    "/abyss": {
        src: "image/desc/abyss.png",
        height: 184,
        width: 187,
        JPText: "《ナイトメア》",
        CHSText: "《梦魇》",
    },
    "/neutral": {
        src: "image/desc/neutral.png",
        height: 184,
        width: 187,
        JPText: "《ニュートラル》",
        CHSText: "《中立》",
    },
    "/portal": {
        src: "image/desc/portal.png",
        height: 184,
        width: 187,
    },
};
const iconKeys = keys(textIconMap);

const defaultFormatOptions = {
    handlePunctuation: false,
    replaceKeyword: false,
    isCHS: false,
};
// {type, text,}[]
const formatText = (line, fontFamily, options = {}) => {
    defaultsDeep(options, defaultFormatOptions);
    const result = [];
    let currentChar = "";
    let isSlashStart = false;

    const formatChar = (c) => {
        if (options.handlePunctuation && isPunctuation(c, fontFamily)) {
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
                    if (options.replaceKeyword) {
                        currentChar = options.isCHS ? textIconMap[currentChar].CHSText : textIconMap[currentChar].JPText;
                        flashCurrentChar();
                    }
                    else result.push({type: "icon", text: currentChar});
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
export const measureTextWidth = (formattedText, ctxMeasureTextWidth, options = {}) => {
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

    return ctxMeasureTextWidth(allText) + allIconWidth + size(allIcon) * (iconPaddingX ?? 0) * 2 + allPunctuationWidth;
};

const removeMoreLines = (text, maxLine) => {
    const list = split(text, "\n");
    const removed = remove(list, (t, i) => i >= maxLine);
    if (removed.length) list[maxLine - 1] = list[maxLine - 1] + join(removed, "");
    return list;
};

const _splitText = (list, width, maxLine, fontFamily, measureTextWidthFn) => {
    const getCurrentLines = (scale) => {
        return reduce(list, (lines, t) => {
            lines += Math.ceil((scale * measureTextWidthFn(t)) / width);
            return lines;
        }, 0);
    };

    let scale = 1;
    while (getCurrentLines(scale) > maxLine && scale > 0) {
        scale -= 0.01;
    }

    const res = flatMap(list, t => {
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
                if (scale * measureTextWidthFn(currentLine) >= width) {
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

export const splitText = (text, width, maxLine, fontFamily, formatOptions, measureTextWidthFn) => {
    let list = removeMoreLines(text, maxLine);

    list = map(list, t => formatText(t, fontFamily, formatOptions));

    return _splitText(list, width, maxLine, fontFamily, measureTextWidthFn);
};