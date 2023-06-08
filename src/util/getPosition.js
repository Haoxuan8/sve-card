
const getPosition = (position, scale, left, top) => {
    return [left + position[0] * scale, top + position[1] * scale, position[2] != null && position[2] * scale, position[3] != null && position[3] * scale].filter(it => it !== false);
};

export default getPosition;