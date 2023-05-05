
const loadImage = (path, {onLoad}) => {
    const image = new Image();
    image.src = path;
    if (!image.complete) {
        image.onload = () => {
            onLoad?.();
        };
    }
    return image;
};

export default loadImage;
