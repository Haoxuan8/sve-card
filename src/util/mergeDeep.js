import {isPlainObject, forEach} from "lodash";
const mergeDeep = (object1, object2) => {
    if (object1 == null || object2 == null) {
        return object2;
    } else if (!isPlainObject(object1) || !isPlainObject(object2)) {
        return object2;
    } else if (object1 === object2) {
        return object2;
    } else {
        const obj = {
            ...object1,
        };
        forEach(object2, (value, key) => {
            if (key in object1) {
                obj[key] = mergeDeep(object1[key], value);
            } else {
                obj[key] = value;
            }
        });

        return obj;
    }
};

export default mergeDeep;
