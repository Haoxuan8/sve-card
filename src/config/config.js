import {cloneDeep, defaultsDeep} from "lodash";
import getPosition from "../util/getPosition";

const defaultConfig = {
    size: [459, 642], // 尺寸大小 width x height，位置大小以此尺寸计算
    // 卡图
    cardImage: {
        position: [0, 0, 459, 642], // 位置 left, top, width, height
        radius: 34, // 圆角半径
    },
    textFontFamily: "sve-card-ja", // 字体
    footerFontFamily: "sans-serif", // 底部脚注字体
    // 卡牌描述
    desc: {
        color: "#FFF",
        fontSize: 14,
        maxLine: 7, // 普通稀有度最大行数。包含speech行数
        URMaxLine: 8, // UR稀有度最大行数
        lineHeight: 18, // 行高
        iconPaddingX: 0, // 图标x轴间距
        iconHeight: 15, // 图标大小
        iconTopOffset: -1, // 图标y轴上方偏移
        position: [28, 396, 394], // left, top, width, height
        textBaseline: "top",
    },
    // 台词 UR没有
    speech: {
        color: "#FFF",
        fontSize: 13,
        maxLine: 3, // 台词最大行数，卡牌描述渲染时最大行数会减去台词实际行数
        position: [28, 513, 394],
        lineHeight: 16, // 行高
        iconPaddingX: 0, // 图标x轴间距
        iconHeight: 15, // 图标大小
        iconTopOffset: -1, // 图标y轴上方偏移
        italic: true, // 是否斜体
        textBaseline: "bottom",
    },
    // 卡牌描述背景
    descBackground: {
        position: [0, 388, 459, 254],
        URPosition: [0, 526, 459], // UR稀有度 left, top, width
        URPaddingY: 6, // UR稀有度Y轴 padding
        URPaddingX: 32, // UR稀有度X轴 padding
    },
    // 名称
    name: {
        color: "#FFF",
        LGColor: "#FFE700", // LG、UR名称颜色
        LGShadowBlur: 2, // LG、UR名称阴影模糊大小
        LGShadowColor: "#000A42", // LG、UR名称阴影颜色
        LGShadowLine: 4, // // LG、UR名称阴影尺寸
        fontSize: 22,
        position: [229, 564, 240],
        leaderPosition: [229, 590, 360],
        annotation: true, // 注音，仅在日文字体生效
        annotationFontSize: 10, // 注音字体大小
    },
    // 卡牌类型
    race: {
        color: "#FFF",
        fontSize: 11,
        position: [160, 600, 100], // left, top, width
        noStatusOffset: -40, // 没有攻击力、血量时的x轴偏移
        tokenOffset: 70, // 有token标志时的x轴偏移
        evoOffset: 70, // 有进化标志时的x轴偏移
    },
    // 稀有度
    rarity: {
        position: [323, 586, 55, 19],
        noStatusOffset: 40, // 没有攻击力、血量时的x轴偏移
    },
    // 花费
    cost: {
        color: "#FFF",
        fontSize: 52,
        position: [54, 58, 64],
    },
    // 攻击力
    attack: {
        color: "#FFF",
        fontSize: 36,
        position: [45, 572, 44],
    },
    // 血量
    defense: {
        color: "#FFF",
        fontSize: 36,
        position: [414, 572, 44],
    },
    // 卡牌编号
    cardNo: {
        URColor: "#FFF",
        color: "#FFF",
        tokenColor: "#000",
        fontSize: 8,
        maxLine: 2, // 支持多行
        lineHeight: 8,
        position: [26, 632, 180],
        // fontFamily
    },
    // 版权
    copyright: {
        URColor: "#FFF",
        color: "#FFF",
        tokenColor: "#000",
        fontSize: 8,
        position: [436, 632, 170],
        // fontFamily
    },

    kuroshiro: {
        dictPath: "", // 注音词典路径
    },
};

export const getConfig = (canvas, c = {}) => {
    const config = cloneDeep(c);
    defaultsDeep(config, defaultConfig);
    const _sizeRate = config.size[1] / config.size[0]; // height / width

    const clientWidth = canvas.width;
    const clientHeight = canvas.height;
    let h = clientHeight; let w = clientWidth;
    let left = 0; let top = 0;

    let currentRate = h / w;
    if (currentRate > _sizeRate) {
        h = w * _sizeRate;
        top = Math.round((clientHeight - h) / 2);
    } else if (_sizeRate > currentRate) {
        w = h / _sizeRate;
        left = Math.round((clientWidth - w) / 2);
    }

    const scale = h / config.size[1];

    return {
        ...config,
        frame: {
            position: [left, top, Math.round(w), Math.round(h)],
        },
        cardImage: {
            position: getPosition(config.cardImage.position, scale, left, top),
            radius: config.cardImage.radius * scale,
        },
        desc: {
            fontFamily: config.textFontFamily,
            ...config.desc,
            fontSize: Math.round(config.desc.fontSize * scale),
            position: getPosition(config.desc.position, scale, left, top),
            lineHeight: Math.round(config.desc.lineHeight * scale),
            iconPaddingX: Math.round(config.desc.iconPaddingX * scale),
            iconHeight: Math.round(config.desc.iconHeight * scale),
            iconTopOffset: Math.round(config.desc.iconTopOffset * scale),
            URPosition: getPosition(config.descBackground.URPosition, scale, left, top),
        },
        speech: {
            fontFamily: config.textFontFamily,
            ...config.speech,
            color: "#FFF",
            fontSize: Math.round(config.speech.fontSize * scale),
            position: getPosition(config.speech.position, scale, left, top),
            lineHeight: Math.round(config.speech.lineHeight * scale),
            iconPaddingX: Math.round(config.speech.iconPaddingX * scale),
            iconHeight: Math.round(config.speech.iconHeight * scale),
            iconTopOffset: Math.round(config.speech.iconTopOffset * scale),
        },
        descBackground: {
            position: getPosition(config.descBackground.position, scale, left, top),
            URPosition: getPosition(config.descBackground.URPosition, scale, left, top),
            URPaddingY: config.descBackground.URPaddingY * scale,
            URPaddingX: config.descBackground.URPaddingX * scale,
            URLineHeight: config.desc.lineHeight * scale,
        },
        name: {
            fontFamily: config.textFontFamily,
            ...config.name,
            fontSize: Math.round(config.name.fontSize * scale),
            annotationFontSize: Math.round(config.name.annotationFontSize * scale),
            position: getPosition(config.name.position, scale, left, top),
            leaderPosition: getPosition(config.name.leaderPosition, scale, left, top),
        },
        race: {
            fontFamily: config.textFontFamily,
            ...config.race,
            noStatusOffset: config.race.noStatusOffset * scale,
            tokenOffset: config.race.tokenOffset * scale,
            evoOffset: config.race.evoOffset * scale,
            fontSize: Math.round(config.race.fontSize * scale),
            position: getPosition(config.race.position, scale, left, top),
        },
        rarity: {
            ...config.rarity,
            position: getPosition(config.rarity.position, scale, left, top),
            noStatusOffset: config.rarity.noStatusOffset * scale,
        },
        cost: {
            ...config.cost,
            fontSize: Math.round(config.cost.fontSize * scale),
            position: getPosition(config.cost.position, scale, left, top),
            shadowBlur: config.cost.shadowBlur * scale,
            shadowLine: config.cost.shadowLine * scale,
        },
        attack: {
            ...config.attack,
            fontSize: Math.round(config.attack.fontSize * scale),
            position: getPosition(config.attack.position, scale, left, top),
            shadowBlur: config.attack.shadowBlur * scale,
            shadowLine: config.attack.shadowLine * scale,
        },
        defense: {
            ...config.defense,
            fontSize: Math.round(config.defense.fontSize * scale),
            position: getPosition(config.defense.position, scale, left, top),
            shadowBlur: config.defense.shadowBlur * scale,
            shadowLine: config.defense.shadowLine * scale,
        },
        cardNo: {
            fontFamily: config.footerFontFamily,
            ...config.cardNo,
            fontSize: Math.round(config.cardNo.fontSize * scale),
            position: getPosition(config.cardNo.position, scale, left, top),
            lineHeight: Math.round(config.cardNo.lineHeight * scale),
        },
        copyright: {
            fontFamily: config.footerFontFamily,
            ...config.copyright,
            fontSize: Math.round(config.copyright.fontSize * scale),
            position: getPosition(config.copyright.position, scale, left, top),
        },
    };
};

export default defaultConfig;
