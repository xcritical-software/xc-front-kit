import { AllType } from '../interfaces';


export const isObject = (val: AllType): boolean => val !== null
  && typeof val === 'object' && Array.isArray(val) === false;

export const isObjectObject = (o: AllType): boolean => isObject(o) === true
  && Object.prototype.toString.call(o) === '[object Object]';

export const isPlainObject = (o: AllType): boolean => {
  if (isObjectObject(o) === false) return false;

  return true;
};
