import get from 'lodash.get';
import { Reducer } from 'redux';


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
  XCRITICAL_FORM_CHANGE,
} from '../actions';

import { reducerDictionary } from '../utils';
import { IFormState } from '../interfaces';

import {
  formError,
  formInit,
  formPropertyChange,
  formReset,
  formSaved,
  formSetFieldMeta,
  formSetFieldsMeta,
  formShowErrors,
  formChange,
} from './func';


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
  [XCRITICAL_FORM_INIT]: formInit,
  [XCRITICAL_FORM_PROPERTY_CHANGE]: formPropertyChange,
  [XCRITICAL_FORM_ERROR]: formError,
  [XCRITICAL_FORM_DELETE]: () => undefined,
  [XCRITICAL_FORM_RESET]: formReset,
  [XCRITICAL_FORM_SAVED]: formSaved,
  [XCRITICAL_FORM_SHOW_ERRORS]: formShowErrors,
  [XCRITICAL_FORM_SET_FIELDS_META]: formSetFieldsMeta,
  [XCRITICAL_FORM_SET_FIELD_META]: formSetFieldMeta,
  [XCRITICAL_FORM_CHANGE]: formChange,
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
