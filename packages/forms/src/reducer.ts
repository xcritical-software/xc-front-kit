import get from 'lodash.get';
import { Reducer } from 'redux';
import { setIn, isDifference } from 'utilitify';

import { useSelector } from 'react-redux';

import {
  XCRITICAL_FORM_INIT,
  XCRITICAL_FORM_PROPERTY_CHANGE,
  XCRITICAL_FORM_DELETE,
  XCRITICAL_FORM_ERROR,
  XCRITICAL_FORM_RESET,
  XCRITICAL_FORM_SAVED,
  XCRITICAL_FORM_SHOW_ERRORS,
  XCRITICAL_FORM_SET_FIELDS_META,
  XCRITICAL_FORM_SET_FIELD_META,
  FormActionType,
  IFormAction,
} from './actions';

import { reducerDictionary } from './utils';
import { IFormState } from './interfaces';


const initialState: IFormState = {
  isNew: true,
  source: {},
  model: {},
  errors: {},
  isChanged: false,
  fields: {},
  showAllErrors: false,
};

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
    const fieldsMeta = {
      touch: true,
      changed: value !== get(state, ['source', ...field.split('.')]),
    };

    const fields = setIn(state.fields, fieldsMeta, field);

    return {
      ...state,
      model,
      errors,
      isChanged,
      fields,
    };
  },
  [XCRITICAL_FORM_ERROR]: (state: IFormState, { payload }: IFormAction) => ({
    ...state,
    errors: {
      ...payload,
    },
  }),
  [XCRITICAL_FORM_DELETE]: () => undefined,
  [XCRITICAL_FORM_RESET]: (state: IFormState) => ({
    ...state,
    isChanged: false,
    model: state.source,
    errors: {},
    fields: {},
    showAllErrors: false,
  }),
  [XCRITICAL_FORM_SAVED]: (state: IFormState) => ({
    ...state,
    isChanged: false,
    source: state.model,
    showAllErrors: true,
  }),
  [XCRITICAL_FORM_SHOW_ERRORS]: (state: IFormState, { payload }: IFormAction) => ({
    ...state,
    showAllErrors: payload,
  }),
  [XCRITICAL_FORM_SET_FIELDS_META]: (state: IFormState, { payload }: IFormAction) => ({
    ...state,
    fields: {
      ...payload,
    },
  }),
  [XCRITICAL_FORM_SET_FIELD_META]: (
    state: IFormState, {
      payload: {
        field,
        value,
      },
    }: IFormAction,
  ) => {
    const fields = setIn(state.fields, value, field);

    return {
      ...state,
      fields,
    };
  },
};

const reducer: Reducer<IFormState> = (state = initialState, action) => {
  const behavior = behaviors[action.type];

  return behavior ? behavior(state, action) : state;
};

export const formSelector = <TFormFields extends Record<string | number, any>>(
  state: any,
  formName: string,
  namespace?: string,
): IFormState<TFormFields> => (
  namespace
    ? get(state, `${namespace}.${formName}`, initialState)
    : get(state.form, formName, initialState)
);

export function useFormSelector<TFormModel = any>(formName: string, namespace?: string) {
  return useSelector<any, IFormState<TFormModel>>((
    state,
  ) => formSelector(state, formName, namespace));
}

export default reducerDictionary(reducer, 'formName');
