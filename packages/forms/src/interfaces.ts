import { DetailedHTMLProps, FormHTMLAttributes } from 'react';


export interface IFormProps
  extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  name: string;
}

export interface IFormContext {
  formName: string;
  fields: string[];
}

export interface IFormState<TModel = { [fieldName: string]: any }> {
  source?: TModel;
  model?: TModel;
  isNew: boolean;
  isChanged: boolean;
  errors: { [fieldName: string]: string };
}

export interface IFormStateMap {
  [formName: string]: IFormState;
}

export interface IFormFieldPropsWithoutContext extends React.ComponentProps<any> {
  component: React.ComponentType<any>;
  name: string;
}

export interface IFormFieldProps extends IFormFieldPropsWithoutContext {
  formName: string;
}

export interface IFormConnectedFieldProps extends React.ComponentProps<any> {
  invalid: boolean;
  error?: string;
  value: any;
}

export interface IFormConnectedFieldDispatch {
  onChange(value: any, action: Function): void;
}

export interface IForm {
  Field: React.ComponentType<IFormFieldPropsWithoutContext>;
}
