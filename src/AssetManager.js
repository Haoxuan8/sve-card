import ImageLoader from "./util/ImageLoader";
import {getFrame, getShowcaseFrame} from "./util/getFrame";
import {lowerCase} from "lodash";
import FontFaceObserver from "fontfaceobserver";
import path from "path-browserify";
import {textIconMap} from "./util/splitText";

const rarityImageMap = {
    BR: "image/rarity/BR.png",
    GR: "image/rarity/GR.png",
    SR: "image/rarity/SR.png",
    LG: "image/rarity/LG.png",
    UR: "image/rarity/UR.png",
};

const fontMap = {
    "sve-card-cn": "font/cn.ttf",
    "sve-card-ja": "font/ja.otf",
};

const defaultOptions = {
    onLoadAll: () => {},
    onEachStepLoad: () => {},
};

export default class AssetManager {
    constructor(data, config, options = {}) {
        options = {
            ...defaultOptions,
            ...options,
        };
        this.config = config;
        this.data = data;
        this.onLoadAll = options.onLoadAll; //
        this.onEachStepLoad = options.onEachStepLoad; //

        this.loadingMap = {};
        this.iamgeLoader = new ImageLoader();
    }

    get assetPath() {
        return this.config.assetPath;
    }

    loadImage = (url, options) => {
        return this.iamgeLoader.loadImage(url, {onLoad: this.onEachStepLoad, ...options});
    };

    loadRarityImage = (rarity) => {
        const imageUrl = path.join(this.assetPath, rarityImageMap[rarity]);
        if (imageUrl) {
            return this.loadImage(imageUrl);
        }
    };

    // load image frame
    loadFrame = () => {
        const frameUrl = getFrame(this.data, {assetPath: this.assetPath});
        if (frameUrl == null) {
            console.error("无法获取 frame, 请检查 craft, cardType, rarity 是否正确");
        } else {
            return this.loadImage(frameUrl);
        }
    };

    loadShowcaseFrame = () => {
        const frameUrl = getShowcaseFrame(this.data, {assetPath: this.assetPath});
        if (frameUrl == null) {
            console.error("无法获取 frame, 请检查 craft, cardType, rarity 是否正确");
        } else {
            return this.loadImage(frameUrl);
        }
    };

    loadCardImage = () => {
        return this.loadImage(this.data.imageSrc, {cors: true});
    };

    loadDescBackground = (UR) => {
        const backgroundPath = UR ? "image/UR_desc_background.png" : "image/desc_background.png";
        return this.loadImage(path.join(this.assetPath, backgroundPath));
    };

    loadFont = async (name) => {
        if (!fontMap[name]) return;
        const loadingKey = `font-loading-${name}`;
        if (this.loadingMap[loadingKey]) return;
        this.loadingMap[loadingKey] = true;
        const css = document.createElement("style");
        css.setAttribute("type", "text/css");
        css.setAttribute("crossOrigin", "anonymous");
        css.setAttribute("class", name);
        const url = path.join(this.assetPath, fontMap[name]);
        const data= `
            @font-face {
            font-family: '`+ name + `';
            src: url('`+ url + `');
        }`;
        css.appendChild(document.createTextNode(data));
        document.head.appendChild(css);
        const font = new FontFaceObserver(name);
        try {
            await font.load();
            this.onEachStepLoad?.();
        } catch (e) {}
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

    loadNumberSprite = (isUR) => {
        const p = isUR ? "image/number/UR.png" : "image/number/normal.png";
        return this.loadImage(path.join(this.assetPath, p));
    };

    loadImageAsset = (relativePath) => {
        return this.loadImage(path.join(this.assetPath, relativePath));
    };

    loadCraftIcon = () => {
        const o = textIconMap[`/${lowerCase(this.data.craft)}`];
        return [this.loadImageAsset(o.src), o];
    };

    loadAll = async () => {

    };
}
