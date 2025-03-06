import {cloneDeep, defaultsDeep} from "lodash";
import getPosition from "../util/getPosition";

const defaultConfig = {
    size: [1920, 1080], // 尺寸大小 width x height，位置大小以此尺寸计算
    card: {
        position: [82, 68, 677], // left, top, width
    },
    textFontFamily: "sve-card-ja",
    frame: {
        position: [0, 0, 1920, 1080], // left, top, width, height
    },
    name: {
        position: [830, 110, 785], // left, top, width
        textBaseline: "top",
        fontSize: 56,
        color: "#FFF",
        annotation: true, // 注音，仅在日文字体生效
        annotationFontSize: 28, // 注音字体大小
        annotationYOffset: -34, // 注音Y轴偏移 
    },
    class: {
        position: [848, 258, 100],
        color: "#c2c9b7", // 颜色
        JPText: "クラス", // 日文
        CHSText: "职 业", // 中文
        fontSize: 34,
        textBaseline: "middle", // 文字基线
        iconPosition: [994, 256], // 图标位置
        iconHeight: 40, // 图标大小
        contentPosition: [1042, 258, 292], // 内容位置
        contentColor: "#FFF", // 内容颜色
    },
    race: {
        position: [848, 314, 100],
        color: "#c2c9b7", // 颜色
        JPText: "タイプ", // 日文
        CHSText: "类 型", // 中文
        fontSize: 34,
        contentMaxLine: 3,
        contentLineHeight: 72,
        textBaseline: "middle", // 文字基线
        contentPosition: [994, 310, 400], // 内容位置
        contentColor: "#FFF", // 内容颜色
    },
    from: {
        position: [1316, 258, 160],
        color: "#c2c9b7", // 颜色
        JPText: "収録商品", // 日文
        CHSText: "收录于", // 中文
        fontSize: 34,
        textBaseline: "middle", // 文字基线
        contentPosition: [1616, 328],
        contentTextPosition: [1604, 258, 330],
        contentTextAlign: "center",
        contentTextMaxLine: 3,
        contentTextFontSize: 44,
        contentTextLineHeight: 100,
        contentTextColor: "#FFF",
    },
    cardType: {
        position: [900, 452],
        iconHeight: 43, // 图标高度
        spacing: 18, // 每个图标间距
    },
    attack: {
        iconPosition: [1542, 454],
        iconHeight: 58,
        position: [1604, 486, 72],
        fontSize: 38,
    },
    defense: {
        iconPosition: [1688, 454],
        iconHeight: 58,
        position: [1747, 486, 72],
        fontSize: 38,
    },
    desc: {
        position: [876, 528, 914],
        fontSize: 26,
        maxLine: 9,
        lineHeight: 41,
        textBaseline: "top",
        color: "#FFF",
        keywordColor: "#ffd64f",
        linePosition: [849, 764, 955, 3],
    },
    tokenDesc: {
        color: "#CEC1AF",
        keywordColor: "#CEC1AF",
        fontSize: 26,
        maxLine: 5,
        position: [876, 882, 914],
        lineHeight: 41,
        textBaseline: "bottom",
    },
    copyright: {
        fontSize: 24,
        position: [38, 1046, 1000],
        color: "#cac9b4",
        textBaseline: "top",
    },
    tip: {
        fontSize: 24,
        position: [1848, 980, 1000],
        color: "#FFF",
        textBaseline: "top",
        textAlign: "right",
    },
    tokenTip: {
        position: [766, 1019, 440],
        color: "#FFF",
        fontSize: 24,
        textBaseline: "top",
        textAlign: "right",
    },
};

export const getConfig = (canvas, c = {}) => {
    const config = cloneDeep(c);
    defaultsDeep(config, defaultConfig);
    const sizeRate = config.size[1] / config.size[0]; // height / width

    const clientWidth = canvas.width;
    const clientHeight = canvas.height;
    const currentRate = clientHeight / clientWidth;
    let h, w, left, top, scale;
    h = clientHeight; w = clientWidth;
    left = 0; top = 0;

    if (currentRate > sizeRate) {
        h = w * sizeRate;
        top = Math.round((clientHeight - h) / 2);
    } else if (sizeRate > currentRate) {
        w = h / sizeRate;
        left = Math.round((clientWidth - w) / 2);
    }

    scale = h / config.size[1];

    return {
        ...config,
        scale,
        frame: {
            position: [left, top, Math.round(w), Math.round(h)],
        },
        name: {
            fontFamily: config.textFontFamily,
            ...config.name,
            position: getPosition(config.name.position, scale, left, top),
            fontSize: Math.round(config.name.fontSize * scale),
            annotationFontSize: Math.round(config.name.annotationFontSize * scale),
            annotationYOffset: Math.round(config.name.annotationYOffset * scale),
        },
        class: {
            fontFamily: config.textFontFamily,
            ...config.class,
            position: getPosition(config.class.position, scale, left, top),
            fontSize: Math.round(config.class.fontSize * scale),
            iconPosition: getPosition(config.class.iconPosition, scale, left, top),
            contentPosition: getPosition(config.class.contentPosition, scale, left, top),
            iconHeight: Math.round(config.class.iconHeight * scale),
        },
        race: {
            fontFamily: config.textFontFamily,
            ...config.race,
            position: getPosition(config.race.position, scale, left, top),
            fontSize: Math.round(config.race.fontSize * scale),
            contentPosition: getPosition(config.race.contentPosition, scale, left, top),
        },
        from: {
            fontFamily: config.textFontFamily,
            ...config.from,
            position: getPosition(config.from.position, scale, left, top),
            fontSize: Math.round(config.from.fontSize * scale),
            contentTextFontSize: Math.round(config.from.contentTextFontSize * scale),
            contentPosition: getPosition(config.from.contentPosition, scale, left, top),
            contentTextPosition: getPosition(config.from.contentTextPosition, scale, left, top),
        },
        cardType: {
            ...config.cardType,
            position: getPosition(config.cardType.position, scale, left, top),
            spacing: Math.round(config.cardType.spacing * scale),
            iconHeight: Math.round(config.cardType.iconHeight * scale),
        },
        attack: {
            ...config.attack,
            iconPosition: getPosition(config.attack.iconPosition, scale, left, top),
            iconHeight: Math.round(config.attack.iconHeight * scale),
            position: getPosition(config.attack.position, scale, left, top),
            fontSize: Math.round(config.attack.fontSize * scale),
        },
        defense: {
            ...config.defense,
            iconPosition: getPosition(config.defense.iconPosition, scale, left, top),
            iconHeight: Math.round(config.defense.iconHeight * scale),
            position: getPosition(config.defense.position, scale, left, top),
            fontSize: Math.round(config.defense.fontSize * scale),
        },
        desc: {
            fontFamily: config.textFontFamily,
            ...config.desc,
            position: getPosition(config.desc.position, scale, left, top),
            fontSize: Math.round(config.desc.fontSize * scale),
            lineHeight: Math.round(config.desc.lineHeight * scale),
            linePosition: getPosition(config.desc.linePosition, scale, left, top),
        },
        tokenDesc: {
            fontFamily: config.textFontFamily,
            ...config.tokenDesc,
            position: getPosition(config.tokenDesc.position, scale, left, top),
            fontSize: Math.round(config.tokenDesc.fontSize * scale),
            lineHeight: Math.round(config.tokenDesc.lineHeight * scale),
        },
        copyright: {
            fontFamily: config.textFontFamily,
            ...config.copyright,
            position: getPosition(config.copyright.position, scale, left, top),
            fontSize: Math.round(config.copyright.fontSize * scale),
        },
        tip: {
            fontFamily: config.textFontFamily,
            ...config.tip,
            position: getPosition(config.tip.position, scale, left, top),
            fontSize: Math.round(config.tip.fontSize * scale),
        },
        tokenTip: {
            fontFamily: config.textFontFamily,
            ...config.tokenTip,
            position: getPosition(config.tokenTip.position, scale, left, top),
            fontSize: Math.round(config.tokenTip.fontSize * scale),
        },
    };
};

export default defaultConfig;