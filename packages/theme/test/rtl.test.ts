import { rtlSide, rtlSwapper } from '../src';

describe('This is the tests for the rtl utils', () => {
  test('rtlSide checking', () => {
    expect(rtlSide(true, 'left')).toEqual('right');
    expect(rtlSide(true, 'right')).toEqual('left');
    expect(rtlSide(false, 'left')).toEqual('left');
    expect(rtlSide(true, '')).toEqual('');
  });

  test('rtlSwapper checking', () => {
    expect(rtlSwapper(true, 5, 20)).toEqual([20, 5]);
    expect(rtlSwapper(false, 5, 20)).toEqual([5, 20]);
  });
});
