import defaultConfig from "./config";
import mergeDeep from "./util/mergeDeep";

const getPosition = (position, scale, left, top) => {
    return [left + position[0] * scale, top + position[1] * scale, position[2] * scale, position[3] * scale];
};

const getConfig = (canvas, c) => {
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
        },
        descBackground: {
            position: getPosition(config.descBackground.position, scale, left, top),
        },
    };
};
export default getConfig;
