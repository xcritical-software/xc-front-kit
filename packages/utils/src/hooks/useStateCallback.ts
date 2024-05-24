import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

function useStateCallback<S>(
  initialState: S | (() => S),
  onChange?: (arg: S) => void
): [S, (state: SetStateAction<S>, cb?: (state: S) => void) => void] {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<((state: S) => void) | undefined>(undefined); // init mutable ref container for callbacks

  const setStateCallback = useCallback(
    (state: SetStateAction<S>, cb?: (state: S) => void) => {
      cbRef.current = cb ?? onChange; // store current, passed callback in ref
      setState(state);
    },
    []
  ); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `undefined` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = undefined; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}
export { useStateCallback };
