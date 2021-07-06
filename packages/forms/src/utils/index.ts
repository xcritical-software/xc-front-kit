import { Reducer, Action, Store } from 'redux';
import get from 'lodash.get';
import { setIn } from 'utilitify';

import { IFormAction } from '../actions';

export const reducerDictionary = ($reducer: Reducer, propName: string) => (
  state: Store,
  action: Action<IFormAction>
) => {
  const name = get(action, ['meta', propName]);

  if (!name) {
    return state || {};
  }

  const reducerState = get(state, name);
  const result = $reducer(reducerState, action);

  return result === reducerState ? state : setIn(state, result, name);
};

export const isEvent = ({
  stopPropagation,
  preventDefault,
}: Record<string, any>): boolean => !!(stopPropagation && preventDefault);

export const getValueFromNativeComponent = (event: Event): any => {
  if (isEvent(event)) {
    const detypedEvent: any = event;
    const {
      target: { type, value, checked, files, options },
      dataTransfer,
    } = detypedEvent;

    if (type === 'checkbox') {
      return !!checked;
    }

    if (type === 'file') {
      return files || dataTransfer?.files;
    }

    if (type === 'select-multiple') {
      return options;
    }

    return value;
  }

  return event;
};
