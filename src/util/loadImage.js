
const pathLoadingMap = {};

const loadImage = (path, {onLoad}) => {
    const image = new Image();
    if (pathLoadingMap[path] === true) {
        return image;
    }
    image.src = path;
    if (!image.complete) {
        pathLoadingMap[path] = true;
        image.onload = () => {
            pathLoadingMap[path] = false;
            onLoad?.();
        };
    }
    return image;
};

export default loadImage;
