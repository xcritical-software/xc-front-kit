import { Reducer, Action, Store } from 'redux';
import get from 'lodash.get';
import { setIn } from 'utilitify';

import { IFormAction } from '../actions';


export const reducerDictionary = (
  $reducer: Reducer,
  propName: string,
) => (state: Store, action: Action<IFormAction>) => {
  const name = get(action, ['meta', propName]);
  if (!name) {
    return state;
  }
  const reducerState = get(state, name);
  const result = $reducer(reducerState, action);
  return result === reducerState ? state : setIn(state, result, name);
};
