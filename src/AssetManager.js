import loadImageUtil from "./util/loadImage";
import getFrame from "./util/getFrame";
import DescBackgroundPng from "./asset/image/desc_background.png";
import "./asset/font/index.scss";
import FontFaceObserver from "fontfaceobserver";

const defaultOptions = {
    onLoadAll: () => {},
    onEachStepLoad: () => {},
};

// const fontPathMap = {
//     cn: import("./asset/font/cn.ttf"),
//     ja: import("./asset/font/ja.ttf"),
//     number1: import("./asset/font/number.ttf"),
// };

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

    loadImage = (url, options) => {
        return loadImageUtil(url, {onLoad: this.onEachStepLoad, ...options});
    };


    // load image frame
    loadFrame = () => {
        const frameUrl = getFrame(this.data);
        if (frameUrl == null) {
            console.error("无法获取 frame, 请检查 craft, cardType, rare 是否正确");
        } else {
            return this.loadImage(frameUrl);
        }
    };

    loadCardImage = () => {
        return this.loadImage(this.data.imageSrc, {cors: true});
    };

    loadDescBackground = () => {
        return this.loadImage(DescBackgroundPng);
    };

    loadFont = async (name) => {
        const loadingKey = `font-loading-${name}`;
        if (this.loadingMap[loadingKey]) return;
        this.loadingMap[loadingKey] = true;
        const font = new FontFaceObserver(name);
        await font.load();
        this.onEachStepLoad?.();
        // if (!document.fonts.check(`12px ${name}`) && !this.loadingMap[loadingKey]) {
        //     if (fontPathMap[name]) {
        //         this.loadingMap[loadingKey] = true;
        //         const path = (await fontPathMap[name]).default;
        //         const res = await fetch(path);
        //         const buffer = await res.arrayBuffer();
        //         const font = new FontFace(name, buffer);
        //         await font.load();
        //         document.fonts.add(font);
        //         this.loadingMap[loadingKey] = false;
        //         this.onEachStepLoad?.();
        //     }
        // }
    };

    loadAll = async () => {

    };
}
