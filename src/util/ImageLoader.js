class ImageLoader {
    pathLoadingMap = {};
    pathImageMap = {};

    loadImage = (path, {onLoad, cors = false}) => {
        if (this.pathImageMap[path]) return this.pathImageMap[path];
        if (this.pathLoadingMap[path] === true) {
            return null;
        }
        const image = new Image();
        if (cors) {
            this.pathLoadingMap[path] = true;
            fetch(path).then(res => res.blob()).then(blob => {
                const url = URL.createObjectURL(blob);
                image.onload = () => {
                    this.pathLoadingMap[path] = false;
                    this.pathImageMap[path] = image;
                    URL.revokeObjectURL(url);
                    onLoad?.();
                };
                image.src = url;
            });
        } else {
            image.src = path;
            this.pathLoadingMap[path] = true;
            image.onload = () => {
                this.pathLoadingMap[path] = false;
                this.pathImageMap[path] = image;
                onLoad?.();
            };
        }
        return null;
    };
}

export default ImageLoader;
