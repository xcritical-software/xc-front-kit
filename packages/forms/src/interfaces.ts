import { DetailedHTMLProps, FormHTMLAttributes } from 'react';


export interface IFormProps
  extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  name: string;
}

export interface IFormContext {
  formName: string;
  fields: string[];
}

export interface IFormState {
  source?: { [fieldName: string]: any };
  model?: { [fieldName: string]: any };
  isNew: boolean;
  isChanged: boolean;
  errors: { [fieldName: string]: string };
}

export interface IFormStateMap {
  [formName: string]: IFormState;
}

export interface IFormFieldProps extends React.ComponentProps<any> {
  component: React.ComponentType<any>;
  name: string;
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
  Field: React.ComponentType<IFormFieldProps>;
}
