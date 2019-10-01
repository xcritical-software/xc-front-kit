import kindOf from 'kind-of';

import { AllType } from '../interfaces';


export const cloneRegExp = (val: RegExp): RegExp => {
  const RegExpConstructor: any = val.constructor;
  const re = new RegExpConstructor(val.source, val.flags);
  re.lastIndex = val.lastIndex;
  return re;
};

export const cloneArrayBuffer = (val: ArrayBuffer): ArrayBuffer => {
  const ArrayBufferConstructor: any = val.constructor;
  const res = new ArrayBufferConstructor(val.byteLength);
  new Uint8Array(res).set(new Uint8Array(val));
  return res;
};

export const cloneTypedArray = (val: Uint8Array): Uint8Array => {
  const Uint8ArrayConstructor: any = val.constructor;
  const result = new Uint8ArrayConstructor(val.buffer, val.byteOffset, val.length);
  return result;
};

export const cloneSymbol = (val: symbol): symbol => Object(Symbol.prototype.valueOf.call(val));

const cloneShallow = (val: AllType): AllType => {
  switch (kindOf(val)) {
    case 'array':
      return val.slice();
    case 'object':
      return Object.assign({}, val);
    case 'date':
      return new val.constructor(Number(val));
    case 'map':
      return new Map(val);
    case 'set':
      return new Set(val);
    case 'symbol':
      return cloneSymbol(val);
    case 'arraybuffer':
      return cloneArrayBuffer(val);
    case 'float32array':
    case 'float64array':
    case 'int16array':
    case 'int32array':
    case 'int8array':
    case 'uint16array':
    case 'uint32array':
    case 'uint8clampedarray':
    case 'uint8array':
      return cloneTypedArray(val);
    case 'regexp':
      return cloneRegExp(val);
    case 'error':
      return Object.create(val);
    default: {
      return val;
    }
  }
};

export default cloneShallow;
