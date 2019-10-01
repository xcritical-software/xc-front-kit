import { isObject, isObjectObject, isPlainObject } from '../src';


const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};

describe('This is the tests for the "is Object" util', () => {
  test('isObject checking', () => {
    expect(isObject(obj)).toEqual(true);
    expect(isObject(null)).toEqual(false);
    expect(isObject(1)).toEqual(false);
  });

  test('isObjectObject checking', () => {
    expect(isObjectObject(obj)).toEqual(true);
    expect(isObjectObject(null)).toEqual(false);
    expect(isObjectObject(1)).toEqual(false);
  });

  test('isPlainObject checking', () => {
    expect(isPlainObject(obj)).toEqual(true);
    expect(isPlainObject(null)).toEqual(false);
    expect(isPlainObject(1)).toEqual(false);
  });
});
