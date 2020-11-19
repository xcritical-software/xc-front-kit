import React from 'react';
import { isNil, isObject } from 'utilitify';

import { IFormProps, IForm } from '../interfaces';

import { withForm, FormProvider } from './FormContext';
import { FormField } from './ConnectedFormField';


export const PureForm: React.FC<IFormProps> & IForm = ({
  name,
  children,
  namespace,
  ...otherProps
}) => {
  const fieldNames: string[] = [];

  const findChildPropName = (child: React.ReactElement): void => {
    if (!isNil(child) && child.props) {
      Object.keys(child.props).forEach((key) => {
        const currentChildValue = child.props[key];

        if (key === 'children') {
          if (Array.isArray(currentChildValue)) {
            React.Children.forEach(currentChildValue, findChildPropName);
          } else if (isObject(currentChildValue)) {
            findChildPropName(currentChildValue as React.ReactElement);
          }
        } else if (key === 'name') {
          fieldNames.push(currentChildValue);
        }
      });
    }
  };

  React.Children.forEach(children, findChildPropName);

  return (
    <form name={ name } { ...otherProps }>
      <FormProvider value={ { formName: name, fields: fieldNames, namespace } }>
        { children }
      </FormProvider>
    </form>
  );
};

PureForm.Field = withForm(FormField);

export default PureForm;
