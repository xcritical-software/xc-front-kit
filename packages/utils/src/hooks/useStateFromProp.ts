import { SetStateAction, useEffect } from 'react';

import { useStateCallback } from './useStateCallback';

export function useStateFromProp<S>(
  initialValue: S | (() => S),
  onChange?: (arg: S) => void,
  ignoreInintialChanges?: boolean
): [S, (state: SetStateAction<S>, cb?: (state: S) => void) => void] {
  const [value, setValue] = useStateCallback(initialValue);

  useEffect(
    () => setValue(initialValue, ignoreInintialChanges ? undefined : onChange),
    [initialValue]
  );

  return [value, setValue];
}
