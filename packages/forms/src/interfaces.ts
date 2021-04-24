import { DetailedHTMLProps, FormHTMLAttributes } from 'react';


export interface IFormProps
  extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  name: string;
  namespace?: string;
}

export interface IFormContext {
  formName: string;
  fields: string[];
  namespace?: string;
}

export interface IFormFieldState {
  changed: boolean;
  touch: boolean;
}

export interface IFormState<TModel = { [fieldName: string]: any }> {
  source: TModel;
  model: TModel;
  isNew: boolean;
  isChanged: boolean;
  errors: Partial<Record<keyof TModel, any>>;
  fields: Partial<Record<keyof TModel, IFormFieldState>>;
  showAllErrors: boolean;
}

export interface IFormStateMap {
  [formName: string]: IFormState;
}

export type FormFieldProps<TComponentProps> = TComponentProps & {
  component: React.ComponentType<TComponentProps & IFormFieldComponentProps>;
  name: string;
  innerRef?: any;
  onChange?: IFormFieldComponentProps['onChange'];
};

export interface IFormFieldComponentProps {
  onChange: (...args: any[]) => void;
  invalid: boolean;
  error?: string | string[];
  value: any;
}

export interface IForm {
  Field: React.ComponentType<FormFieldProps<any>>;
}
