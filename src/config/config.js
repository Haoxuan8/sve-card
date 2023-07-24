import {cloneDeep, assign} from "lodash";
import getPosition from "../util/getPosition";

const defaultConfig = {
    size: [459, 642],
    cardImage: {
        position: [0, 0, 459, 642],
        radius: 34,
    },
    textFontFamily: "sve-card-ja",
    footerFontFamily: "sans-serif",
    desc: {
        color: "#FFF",
        fontSize: 14,
        maxLine: 6,
        URMaxLine: 8,
        lineHeight: 18,
        iconPaddingX: 0,
        iconHeight: 15,
        iconTopOffset: -1,
        position: [28, 396, 394, 139],
    },
    descBackground: {
        position: [0, 388, 459, 254],
        URPosition: [0, 526, 459],
        URPaddingY: 6,
        URPaddingX: 32,
    },
    name: {
        color: "#FFF",
        LGColor: "#FFE700", // LG、UR名称颜色
        LGShadowBlur: 2,
        LGShadowColor: "#000A42",
        LGShadowLine: 4, // 文字 stoke line width
        fontSize: 22,
        position: [229, 564, 240],
        leaderPosition: [229, 590, 360],
    },
    race: {
        color: "#FFF",
        fontSize: 11,
        position: [160, 600, 80], // 以从者模板的位置为准
        noStatusOffset: -40,
        tokenOffset: 70,
        evoOffset: 70,
    },
    rarity: {
        position: [323, 586, 55, 19], // 以从者模板的位置为准，当为法术时会 left 会加上 offset
        noStatusOffset: 40,
    },
    cost: {
        color: "#FFF",
        fontSize: 52,
        position: [54, 58, 64],
    },
    attack: {
        color: "#FFF",
        fontSize: 36,
        position: [45, 572, 44],
    },
    defense: {
        color: "#FFF",
        fontSize: 36,
        position: [414, 572, 44],
    },
    cardNo: {
        URColor: "#FFF",
        color: "#FFF",
        tokenColor: "#000",
        fontSize: 8,
        position: [26, 632, 100],
    },
    copyright: {
        URColor: "#FFF",
        color: "#FFF",
        tokenColor: "#000",
        fontSize: 8,
        position: [436, 632, 100],
    },
};

export const getConfig = (canvas, c) => {
    const config = cloneDeep(defaultConfig);
    assign(config, c);
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
