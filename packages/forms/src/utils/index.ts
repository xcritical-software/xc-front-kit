import { Reducer } from 'redux';
import get from 'lodash.get';
import { setIn } from 'utilitify';


export const reducerDictionary = ($reducer:
Reducer,
propName: string) => (state = {}, action: any = {}) => {
  const name = get(action, ['meta', propName]);
  if (!name) {
    return state;
  }
  const reducerState = get(state, name);
  const result = $reducer(reducerState, action);
  return result === reducerState ? state : setIn(state, result, name);
};
