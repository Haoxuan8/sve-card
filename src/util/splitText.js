import {split, remove, join, reduce, forEach, ceil, max, flatMap} from "lodash";

const isPunctuation = (char) => {
    const punctuationMap = ["。", "，", "：", "【", "】", "「", "」"];
    return punctuationMap.includes(char);
};

const splitText = (text, width, maxLine, measureTextWidth) => {
    const list = split(text, "\n");
    const removed = remove(list, (t, i) => i >= maxLine);
    if (removed.length) list[maxLine - 1] = list[maxLine - 1] + join(removed, "");

    const getCurrentLines = (scale) => {
        return reduce(list, (lines, t) => {
            lines += Math.ceil((scale * measureTextWidth(t)) / width);
            return lines;
        }, 0);
    };

    let scale = 1;
    while (getCurrentLines(scale) > maxLine && scale > 0) {
        scale -= 0.01;
    }

    const res = flatMap(list, t => {
        const oneLineWidth = scale * measureTextWidth(t);
        let currentRes = [];
        let currentLine = "";
        forEach(t, word => {
            if (
                currentLine === ""
                && currentRes.length > 0
                && isPunctuation(word)
            ) {
                currentRes[currentRes.length - 1] += word;
            } else {
                currentLine += word;
                if (scale * measureTextWidth(currentLine) >= width) {
                    currentRes.push(currentLine);
                    currentLine = "";
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
