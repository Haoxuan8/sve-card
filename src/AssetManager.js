import Frame from "./asset/image/default_card_cover.png";
import loadImage from "./util/loadImage";

const defaultOptions = {
    onLoadAll: () => {},
    onEachStepLoad: () => {},
};

const fontPathMap = {
    cn: import("./asset/font/cn.ttf"),
};

export default class AssetManager {
    constructor(data, options = {}) {
        options = {
            ...defaultOptions,
            ...options,
        };
        this.data = data;
        this.onLoadAll = options.onLoadAll; //
        this.onEachStepLoad = options.onEachStepLoad; //

        this.loadingMap = {};
    }


    // load image frame
    loadFrame = ({onLoad}) => {
        return loadImage(Frame, {onLoad});
    };

    loadCardImage = async () => {
        return loadImage(this.data.imageSrc);
    };

    loadFont = async (name, {onLoad}) => {
        const loadingKey = `font-loading-${name}`;
        if (!document.fonts.check(`12px ${name}`) && !this.loadingMap[loadingKey]) {
            if (fontPathMap[name]) {
                this.loadingMap[loadingKey] = true;
                const path = (await fontPathMap[name]).default;
                const res = await fetch(path);
                const buffer = await res.arrayBuffer();
                const font = new FontFace(name, buffer);
                await font.load();
                document.fonts.add(font);
                this.loadingMap[loadingKey] = false;
                onLoad?.();
            }
        }
    };

    loadAll = async () => {

    };
}
