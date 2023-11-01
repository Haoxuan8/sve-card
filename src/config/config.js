import {cloneDeep, defaultsDeep} from "lodash";
import getPosition from "../util/getPosition";

const defaultConfig = {
    size: [459, 642], // 尺寸大小 width x height，位置大小以此尺寸计算
    // [1920, 1080, 82, 68, 677] 画布大小width, height, 图片位置与大小, left, top, width。不设置时默认占满高度并在宽度居中。
    // 设置时会根据设置位置渲染卡片位置。
    canvasSize: null,
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
        maxLine: 6, // 普通稀有度最大行数。包含speech行数
        URMaxLine: 8, // UR稀有度最大行数
        lineHeight: 16, // 行高
        iconPaddingX: 0, // 图标x轴间距
        iconHeight: 15, // 图标大小
        iconTopOffset: -1, // 图标y轴上方偏移
        position: [28, 416, 394], // left, top, width, height
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
        position: [0, 408, 459, 254],
        URPosition: [0, 526, 459], // UR稀有度 left, top, width
        URPaddingBottom: 14, // UR稀有度Y轴 padding
        URPaddingTop: 8, // UR稀有度Y轴 padding
        URPaddingX: 32, // UR稀有度X轴 padding
        coverBlack: false, // 直接显示黑色背景
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
        annotationYOffset: -20, // 注音Y轴偏移 
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
        textAlign: "center",
    },
    // 攻击力
    attack: {
        color: "#FFF",
        fontSize: 36,
        position: [45, 572, 44],
        textAlign: "center",
    },
    // 血量
    defense: {
        color: "#FFF",
        fontSize: 36,
        position: [414, 572, 44],
        textAlign: "center",
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
    assetPath: "./asset", // 素材地址
};

export const getConfig = (canvas, c = {}) => {
    const config = cloneDeep(c);
    defaultsDeep(config, defaultConfig);
    const sizeRate = config.size[1] / config.size[0]; // height / width

    const clientWidth = canvas.width;
    const clientHeight = canvas.height;

    const currentRate = clientHeight / clientWidth;
    let h, w, left, top, scale;
    if (config.canvasSize == null) {
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
    } else {
        const [canvasSettingWidth, canvasSettingHeight, cardLeft, cardTop, cardWidth] = config.canvasSize;
    
        const canvasSizeRate = canvasSettingHeight / canvasSettingWidth;
        let canvasHeight = clientHeight; let canvasWidth = clientWidth;
        let canvasTop = 0; let canvasLeft = 0;
        if (currentRate > canvasSizeRate) {
            canvasHeight = clientWidth * canvasSizeRate;
            canvasTop = Math.round((clientHeight - canvasHeight) / 2);
        } else if (canvasSizeRate > currentRate) {
            canvasWidth = canvasHeight / currentRate;
            canvasLeft = Math.round((clientWidth - canvasWidth) / 2);
        }
        const canvasScale = canvasHeight / canvasSettingHeight;
        scale = canvasScale * cardWidth / config.size[0];
        left = canvasLeft + cardLeft * canvasScale;
        top = canvasTop + cardTop * canvasScale;
        h = config.size[1] * scale;
        w = config.size[0] * scale;
    }

    return {
        ...config,
        scale,
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
            ...config.descBackground,
            position: getPosition(config.descBackground.position, scale, left, top),
            URPosition: getPosition(config.descBackground.URPosition, scale, left, top),
            URPaddingX: config.descBackground.URPaddingX * scale,
            URPaddingTop: config.descBackground.URPaddingTop * scale,
            URPaddingBottom: config.descBackground.URPaddingBottom * scale,
            URLineHeight: config.desc.lineHeight * scale,
        },
        name: {
            fontFamily: config.textFontFamily,
            ...config.name,
            fontSize: Math.round(config.name.fontSize * scale),
            annotationFontSize: Math.round(config.name.annotationFontSize * scale),
            annotationYOffset: Math.round(config.name.annotationYOffset * scale),
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
