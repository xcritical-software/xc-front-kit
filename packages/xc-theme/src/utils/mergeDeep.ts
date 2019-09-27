import union from './arrUnion';
import cloneDeep from './cloneDeep';
import { isObject } from './isObject';
import { AllType } from '../interfaces';


const merge = (target: AllType, obj: AllType): AllType => {
  Object.keys(obj).forEach((key: string): void => {
    const oldVal = obj[key];
    const newVal = target[key];

    if (isObject(newVal) && isObject(oldVal)) {
      target[key] = merge(newVal, oldVal);
    } else if (Array.isArray(newVal)) {
      target[key] = union([], newVal, oldVal);
    } else {
      target[key] = cloneDeep(oldVal);
    }
  });

  return target;
};

const mergeDeep = (orig: AllType, ...rest: AllType[]): AllType => {
  const source = !isObject(orig) && !Array.isArray(orig) ? {} : { ...orig };
  const target = cloneDeep(source);

  rest.forEach((val: AllType): void => {
    if (isObject(val) || Array.isArray(val)) {
      merge(target, val);
    }
  });

  return target;
};

export default mergeDeep;
