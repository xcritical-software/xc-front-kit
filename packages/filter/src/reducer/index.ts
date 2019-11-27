import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { Reducer } from 'redux';
import { setIn, difference } from 'utilitify';

import {
  ADD_FILTER,
  ADD_FILTERS,
  REMOVE_FILTER,
  CHANGE_FILTER,
  OPEN_FILTERS,
  INIT_FILTERS,
  RESET_FILTERS,
  APPLY_FILTERS,
} from '../actions/const';

import { reducerDictionary } from '../utils';
import { IState } from '../interfaces';


const behaviors: Record<FormActionType, Function> = {
  [ADD_FILTER]: addFilters,
  [XCRITICAL_FORM_PROPERTY_CHANGE]: (
    state: IState, {
      payload: {
        field,
        value,
      },
    }: IFormAction,
  ) => {
    const $value = value !== '' ? value : null;

    const model = setIn(state.model, $value, field);
    const diff = difference(model, state.source);
    const errors = setIn(state.errors, false, field);

    return {
      ...state,
      model,
      errors,
      isChanged: !isEmpty(diff),
    };
  },
  [XCRITICAL_FORM_ERROR]: (state: IState, { payload }: IFormAction) => ({
    ...state,
    errors: {
      ...payload,
    },
  }),
  [XCRITICAL_FORM_DELETE]: () => null,
  [XCRITICAL_FORM_RESET]: (state: IState) => ({
    ...state,
    isChanged: false,
    model: state.source,
  }),
  [XCRITICAL_FORM_SAVED]: (state: IState) => ({
    ...state,
    isChanged: false,
    source: state.model,
  }),
};

const reducer: Reducer<IState> = (state = {
  isNew: true,
  source: {},
  model: {},
  errors: {},
  isChanged: false,
}, action) => {
  const behavior = behaviors[action.type];
  return behavior ? behavior(state, action) : state;
};

export const filterSelector = (state: any, filterName: string): any => {
  if (!filterName) {
    return state;
  }

  return get(state.filter, filterName);
};

export default reducerDictionary(reducer, 'filterName');
