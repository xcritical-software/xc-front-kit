export const XCRITICAL_FORM_INIT = 'XCRITICAL_FORM_INIT';
export const XCRITICAL_FORM_PROPERTY_CHANGE = 'XCRITICAL_FORM_PROPERTY_CHANGE';
export const XCRITICAL_FORM_SAVED = 'XCRITICAL_FORM_SAVED';
export const XCRITICAL_FORM_DELETE = 'XCRITICAL_FORM_DELETE';
export const XCRITICAL_FORM_ERROR = 'XCRITICAL_FORM_ERROR';
export const XCRITICAL_FORM_RESET = 'XCRITICAL_FORM_RESET';
export const XCRITICAL_FORM_SHOW_ERRORS = 'XCRITICAL_FORM_SHOW_ERRORS';
export const XCRITICAL_FORM_SET_FIELDS_META = 'XCRITICAL_FORM_SET_FIELDS_META';
export const XCRITICAL_FORM_SET_FIELD_META = 'XCRITICAL_FORM_SET_FIELD_META';

export type FormActionType =
  typeof XCRITICAL_FORM_INIT |
  typeof XCRITICAL_FORM_PROPERTY_CHANGE |
  typeof XCRITICAL_FORM_SAVED |
  typeof XCRITICAL_FORM_DELETE |
  typeof XCRITICAL_FORM_ERROR |
  typeof XCRITICAL_FORM_RESET |
  typeof XCRITICAL_FORM_SET_FIELDS_META |
  typeof XCRITICAL_FORM_SET_FIELD_META |
  typeof XCRITICAL_FORM_SHOW_ERRORS;

export interface IFormAction {
  type: FormActionType;
  meta: {
    formName: string;
    isNew?: boolean;
  };
  payload?: any;
}


export function xcriticalFormPropertyChange<
  TFormModel extends {} = {},
  TPropertyName extends keyof TFormModel = keyof TFormModel
>(
  name: string,
  property: TPropertyName,
  value: TFormModel[TPropertyName],
): IFormAction {
  return {
    type: XCRITICAL_FORM_PROPERTY_CHANGE,
    meta: {
      formName: name,
    },
    payload: {
      field: property,
      value,
    },

  };
}

/**
 * @deprecated don't use this action
 */
export function xcriticalFormChange(name: string, model: any): IFormAction {
  return {
    type: XCRITICAL_FORM_INIT,
    payload: model,
    meta: {
      formName: name,
    },
  };
}

export function xcriticalFormInit(name: string, model: any): IFormAction {
  return {
    type: XCRITICAL_FORM_INIT,
    payload: model,
    meta: {
      formName: name,
    },
  };
}


export function xcriticalFormSaved(name: string): IFormAction {
  return {
    type: XCRITICAL_FORM_SAVED,
    meta: {
      formName: name,
    },
  };
}

export function xcriticalFormDelete(name: string): IFormAction {
  return {
    type: XCRITICAL_FORM_DELETE,
    meta: {
      formName: name,
    },
  };
}

export function xcriticalFormError(name: string, error: any): IFormAction {
  return {
    type: XCRITICAL_FORM_ERROR,
    payload: error,
    meta: {
      formName: name,
    },
  };
}

export function xcriticalFormReset(name: string): IFormAction {
  return {
    type: XCRITICAL_FORM_RESET,
    meta: {
      formName: name,
    },
  };
}

export function xcriticalFormShowErrors(name: string, value: boolean): IFormAction {
  return {
    type: XCRITICAL_FORM_SHOW_ERRORS,
    meta: {
      formName: name,
    },
    payload: value,
  };
}


export function xcriticalFormSetFieldsMeta(name: string, model: any): IFormAction {
  return {
    type: XCRITICAL_FORM_SET_FIELDS_META,
    meta: {
      formName: name,
    },
    payload: model,
  };
}

export function xcriticalFormSetFieldMeta(name: string,
  property: string,
  value: any): IFormAction {
  return {
    type: XCRITICAL_FORM_SET_FIELD_META,
    meta: {
      formName: name,
    },
    payload: {
      field: property,
      value,
    },

  };
}
