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

export interface IFormState<TModel = { [fieldName: string]: any }> {
  source?: TModel;
  model?: TModel;
  isNew: boolean;
  isChanged: boolean;
  errors: { [fieldName: string]: string };
  fields?: TModel;
  showAllErrors: boolean;
}

export interface IFormStateMap {
  [formName: string]: IFormState;
}

export type IFormFieldProps<TComponentProps> = TComponentProps & {
  component: React.ComponentType<TComponentProps & IFormFieldComponentProps>;
  name: string;
};

export interface IFormFieldComponentProps {
  onChange: (value: any) => void;
  invalid: boolean;
  error?: string | string[];
  value: any;
}

export interface IForm {
  Field: React.ComponentType<IFormFieldProps<any>>;
}
