import { SetStateAction, useEffect } from 'react';

import { useStateCallback } from './useStateCallback';

export function useStateFromProp<S>(
  initialValue: S | (() => S),
  onChange?: (arg: S) => void,
  ignoreInintialChanges?: boolean
): [S, (state: SetStateAction<S>, cb?: (state: S) => void) => void] {
  const [value, setValue] = useStateCallback(initialValue, onChange);

  useEffect(
    () =>
      initialValue !== value
        ? setValue(initialValue, ignoreInintialChanges ? undefined : onChange)
        : undefined,
    [initialValue]
  );

  return [value, setValue];
}
