import { renderHook } from '@testing-library/react-hooks';

import { useFirstMountState } from '../src/hooks';

/**
 * @jest-environment jsdom
 */

describe('useFirstMountState', () => {
  it('should be true on first render and false after', () => {
    const { result, rerender } = renderHook(() => useFirstMountState());
    expect(result.current).toEqual(true);
    rerender();
    expect(result.current).toEqual(false);
    rerender();
    expect(result.current).toEqual(false);
  });
});
