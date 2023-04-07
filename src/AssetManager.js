
const defaultOptions = {
    onLoadAll: () => {},
    onEachStepLoad: () => {},
};

export default class AssetManager {
    constructor(data, options = {}) {
        options = {
            ...defaultOptions,
            ...options,
        };
        this.data = data;
        this.onLoadAll = options.onLoadAll;
        this.onEachStepLoad = options.onEachStepLoad;
    }


    // load image frame
    loadFrame = async () => {

    };

    loadFont = async () => {

    };

    loadCardImage = async () => {

    };

    loadAll = async () => {

    };
}
