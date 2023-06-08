
const pathLoadingMap = {};
const pathImageMap = {};

const loadImage = (path, {onLoad, cors = false}) => {
    if (pathImageMap[path]) return pathImageMap[path];
    if (pathLoadingMap[path] === true) {
        return null;
    }
    const image = new Image();
    if (cors) {
        pathLoadingMap[path] = true;
        fetch(path).then(res => res.blob()).then(blob => {
            const url = URL.createObjectURL(blob);
            image.onload = () => {
                pathLoadingMap[path] = false;
                pathImageMap[path] = image;
                URL.revokeObjectURL(url);
                onLoad?.();
            };
            image.src = url;
        });
    } else {
        image.src = path;
        pathLoadingMap[path] = true;
        image.onload = () => {
            pathLoadingMap[path] = false;
            pathImageMap[path] = image;
            onLoad?.();
        };
    }
    return null;
};

export default loadImage;
