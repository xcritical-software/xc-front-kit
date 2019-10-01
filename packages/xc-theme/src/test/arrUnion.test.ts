import { union } from '../utils';


describe('This is the tests for the "array union" util', () => {
  test('union checking', () => {
    expect(union([], 'left')).toEqual(['left']);
    expect(union(['one'], null)).toEqual(['one']);
    expect(union(['one'], ['two'])).toEqual(['one', 'two']);
    expect(union(['one', 'two'], ['two', 'three'])).toEqual(['one', 'two', 'three']);
    expect(union([1, 2], [2, 3])).toEqual([1, 2, 3]);

    try {
      expect(union(undefined, 'left'));
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
    }
  });
});
