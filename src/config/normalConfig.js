import mergeDeep from "../util/mergeDeep";
import getPosition from "../util/getPosition";

const defaultConfig = {
    size: [459, 642],
    cardImage: {
        position: [0, 0, 459, 642],
        radius: 24, // 图片铺满卡片，需要圆角防止溢出卡牌 TODO: 调整
    },
    desc: {
        color: "#FFF",
        fontFamily: "ja",
        fontSize: 14,
        maxLine: 6,
        lineHeight: 18,
        iconPaddingX: 0,
        iconHeight: 15,
        iconTopOffset: -1,
        position: [28, 396, 394, 139],
    },
    descBackground: {
        position: [0, 388, 459, 254],
    },
    numberFontFamily: "number", // cost、attack、defense 字体 TODO: 替换字体
    cost: {
        color: "#FFF",
        fontSize: 56,
        fontWeight: "bold",
        position: [54, 74, 44],
        shadowBlur: 6,
        shadowLine: 4,
    },
    attack: {
        color: "#FFF",
        fontSize: 46,
        position: [45, 585, 44],
        shadowBlur: 2,
        shadowLine: 2,
    },
    defense: {
        color: "#FFF",
        fontSize: 46,
        position: [414, 585, 44],
        shadowBlur: 2,
        shadowLine: 2,
    },
};

export const getNormalConfig = (canvas, c) => {
    const config = mergeDeep(c, defaultConfig);
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
        frame: {
            position: [left, top, Math.round(w), Math.round(h)],
        },
        cardImage: {
            position: getPosition(config.cardImage.position, scale, left, top),
            radius: config.cardImage.radius * scale,
        },
        desc: {
            ...config.desc,
            fontSize: Math.round(config.desc.fontSize * scale),
            position: getPosition(config.desc.position, scale, left, top),
            lineHeight: Math.round(config.desc.lineHeight * scale),
            iconPaddingX: Math.round(config.desc.iconPaddingX * scale),
            iconHeight: Math.round(config.desc.iconHeight * scale),
            iconTopOffset: Math.round(config.desc.iconTopOffset * scale),
        },
        descBackground: {
            position: getPosition(config.descBackground.position, scale, left, top),
        },
        cost: {
            ...config.cost,
            fontFamily: config.numberFontFamily,
            fontSize: Math.round(config.cost.fontSize * scale),
            position: getPosition(config.cost.position, scale, left, top),
            shadowBlur: config.cost.shadowBlur * scale,
            shadowLine: config.cost.shadowLine * scale,
        },
        attack: {
            ...config.attack,
            fontFamily: config.numberFontFamily,
            fontSize: Math.round(config.attack.fontSize * scale),
            position: getPosition(config.attack.position, scale, left, top),
            shadowBlur: config.attack.shadowBlur * scale,
            shadowLine: config.attack.shadowLine * scale,
        },
        defense: {
            ...config.defense,
            fontFamily: config.numberFontFamily,
            fontSize: Math.round(config.defense.fontSize * scale),
            position: getPosition(config.defense.position, scale, left, top),
            shadowBlur: config.defense.shadowBlur * scale,
            shadowLine: config.defense.shadowLine * scale,
        },
    };
};

export default defaultConfig;