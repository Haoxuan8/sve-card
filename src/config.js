export default {
    size: [459, 642],
    cardImage: {
        position: [0, 0, 459, 642],
        radius: 24, // 图片铺满卡片，需要圆角防止溢出卡牌 TODO: 调整
    },
    desc: {
        color: "#FFF",
        fontFamily: "ja",
        fontSize: 12,
        maxLine: 6,
        lineHeight: 18,
        iconPaddingX: 0,
        iconHeight: 13,
        iconTopOffset: 2,
        position: [28, 396, 394, 139],
    },
    descBackground: {
        position: [0, 388, 459, 254],
    },
    numberFontFamily: "number", // cost、attack、defense 字体
    cost: {
        color: "#FFF",
        fontSize: 14,
        position: [0, 0],
    },
    attack: {
        color: "#FFF",
        fontSize: 44,
        position: [45, 585],
    },
    defense: {
        color: "#FFF",
        fontSize: 44,
        position: [0, 0],
    },
};
