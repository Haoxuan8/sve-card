import {defaultsDeep} from "lodash";

const UR_postion = {
  0: [0, 0, 142, 210],
  1: [142, 0, 118, 210],
  2: [260, 0, 149, 210],
  3: [409, 0, 140, 210],
  4: [549, 0, 172, 210],
  5: [721, 0, 131, 210],
  6: [852, 0, 137, 210],
  7: [989, 0, 137, 210],
  8: [1126, 0, 146, 210],
  9: [1272, 0, 134, 210],
};

const normal_cost_position = {
  0: [0, 0, 174, 234],
  1: [174, 0, 145, 234],
  2: [319, 0, 174, 234],
  3: [493, 0, 174, 234],
  4: [667, 0, 198, 234],
  5: [865, 0, 174, 234],
  6: [1039, 0, 174, 234],
  7: [1213, 0, 174, 234],
  8: [1387, 0, 174, 234],
  9: [1561, 0, 174, 234],
};

const normal_status_position = {
  0: [1735, 0, 142, 210],
  1: [1877, 0, 118, 210],
  2: [1995, 0, 149, 210],
  3: [2144, 0, 140, 210],
  4: [2284, 0, 172, 210],
  5: [2456, 0, 131, 210],
  6: [2587, 0, 137, 210],
  7: [2724, 0, 137, 210],
  8: [2861, 0, 146, 210],
  9: [3007, 0, 134, 210],
};

const defaultOptions = {
  isUR: false,
  isCost: false,
};

const getNumberPosition = (number, options = {}) => {
  defaultsDeep(options, defaultOptions);
  const {isUR, isCost} = options;
  if (isUR) {
    return UR_postion[number];
  } else {
    return isCost ? normal_cost_position[number] : normal_status_position[number];
  }
};

export default getNumberPosition;