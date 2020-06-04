import get from 'lodash.get';
import { Reducer } from 'redux';
import { setIn, isDifference } from 'utilitify';

import {
  XCRITICAL_FORM_INIT,
  XCRITICAL_FORM_PROPERTY_CHANGE,
  XCRITICAL_FORM_DELETE,
  XCRITICAL_FORM_ERROR,
  XCRITICAL_FORM_RESET,
  XCRITICAL_FORM_SAVED,
  FormActionType,
  IFormAction,
} from './actions';

import { reducerDictionary } from './utils';
import { IFormState } from './interfaces';


const behaviors: Record<FormActionType, Function> = {
  [XCRITICAL_FORM_INIT]: (_state: IFormState, {
    payload,
    meta: { isNew = !payload },
  }: IFormAction) => ({
    source: payload,
    model: payload,
    isNew,
    isChanged: false,
    errors: {},
  }),
  [XCRITICAL_FORM_PROPERTY_CHANGE]: (
    state: IFormState, {
      payload: {
        field,
        value,
      },
    }: IFormAction,
  ) => {
    const $value = value !== '' ? value : null;

    const model = setIn(state.model, $value, field);
    const isChanged = isDifference(model, state.source);
    const errors = setIn(state.errors, false, field);

    return {
      ...state,
      model,
      errors,
      isChanged,
    };
  },
  [XCRITICAL_FORM_ERROR]: (state: IFormState, { payload }: IFormAction) => ({
    ...state,
    errors: {
      ...payload,
    },
  }),
  [XCRITICAL_FORM_DELETE]: () => null,
  [XCRITICAL_FORM_RESET]: (state: IFormState) => ({
    ...state,
    isChanged: false,
    model: state.source,
    errors: {},
  }),
  [XCRITICAL_FORM_SAVED]: (state: IFormState) => ({
    ...state,
    isChanged: false,
    source: state.model,
  }),
};

const reducer: Reducer<IFormState> = (state = {
  isNew: true,
  source: {},
  model: {},
  errors: {},
  isChanged: false,
}, action) => {
  const behavior = behaviors[action.type];
  return behavior ? behavior(state, action) : state;
};

export const formSelector = (state: any, formName: string): any => {
  if (!formName) {
    return state;
  }

  return get(state.form, formName, state);
};

export default reducerDictionary(reducer, 'formName');
