import { setIn, isDifference } from 'utilitify';
import get from 'lodash.get';

import { IFormAction } from '../actions';
import { IFormState } from '../interfaces';

export const formInit = (
  _state: IFormState,
  { payload, meta: { isNew = !payload } }: IFormAction
) => ({
  source: payload,
  model: payload,
  isNew,
  isChanged: false,
  errors: {},
});

export const formPropertyChange = (
  state: IFormState,
  { payload: { field, value }, meta: { commit } }: IFormAction
) => {
  const $value = value !== '' ? value : null;

  const model = setIn(state.model, $value, field);
  const source = commit ? setIn(state.source, $value, field) : state.source;
  const isChanged = isDifference(model, source);
  const errors = setIn(state.errors, false, field);
  const fieldsMeta = {
    touch: true,
    changed: value !== get(source, field.split('.')),
  };

  const fields = setIn(state.fields, fieldsMeta, field);

  return {
    ...state,
    model,
    source,
    errors,
    isChanged,
    fields,
  };
};

export const formSetFieldMeta = (
  state: IFormState,
  { payload: { field, value } }: IFormAction
) => {
  const fields = setIn(state.fields, value, field);

  return {
    ...state,
    fields,
  };
};
export const formSetFieldsMeta = (
  state: IFormState,
  { payload }: IFormAction
) => ({
  ...state,
  fields: {
    ...payload,
  },
});
export const formShowErrors = (
  state: IFormState,
  { payload }: IFormAction
) => ({
  ...state,
  showAllErrors: payload,
});
export const formSaved = (state: IFormState) => ({
  ...state,
  isChanged: false,
  source: state.model,
  showAllErrors: true,
});
export const formReset = (state: IFormState) => ({
  ...state,
  isChanged: false,
  model: state.source,
  errors: {},
  fields: {},
  showAllErrors: false,
});
export const formError = (state: IFormState, { payload }: IFormAction) => ({
  ...state,
  errors: {
    ...payload,
  },
});

export const formChange = (
  state: IFormState,
  { payload, meta, type }: IFormAction
) =>
  Object.keys(payload).reduce(
    (acc, el) =>
      formPropertyChange(acc, {
        type,
        payload: { field: el, value: payload[el] },
        meta,
      }),
    state
  );
