import { cloneDeep, cloneObjectDeep } from '/src';


const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};

const arr = [{ a: 1 }, { b: 2 }];

const customCloneArray = (arrStr: string[]): string[] => [...arrStr];

describe('This is the tests for the "deep clone" utils', () => {
  test('cloneDeep checking', () => {
    expect(cloneDeep(obj)).toEqual(obj);
    expect(cloneDeep(arr)).toEqual(arr);
    expect(cloneDeep(1)).toEqual(1);
  });

  test('cloneObjectDeep checking', () => {
    expect(cloneObjectDeep(['1', '2'], customCloneArray)).toEqual(['1', '2']);
    expect(cloneObjectDeep(['1', '2'])).toEqual(['1', '2']);
  });
});
