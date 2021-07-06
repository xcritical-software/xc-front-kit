import React, { MutableRefObject } from 'react';

export function useCombinedRefs<T>(
  initialValue: T | null,
  ...refs: MutableRefObject<T>[]
): MutableRefObject<T | null> {
  const targetRef = React.useRef<T>(initialValue);

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref || !targetRef.current) return;

      ref.current = targetRef.current;
    });
  }, [refs]);

  return targetRef;
}
