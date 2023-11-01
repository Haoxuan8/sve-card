class ImageLoader {
    pathLoadingMap = {};
    pathImageMap = {};

    loadImage = (path, {onLoad}) => {
        if (this.pathImageMap[path]) return this.pathImageMap[path];
        if (this.pathLoadingMap[path] === true) {
            return null;
        }
        const image = new Image();
        image.src = path;
        this.pathLoadingMap[path] = true;
        image.onload = () => {
            this.pathLoadingMap[path] = false;
            this.pathImageMap[path] = image;
            onLoad?.();
        };
        return null;
    };
}

export default ImageLoader;
