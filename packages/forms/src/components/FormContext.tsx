import React from 'react';

import { IFormContext } from '../interfaces';


export const FormContext = React.createContext<IFormContext>({
  formName: 'defaultForm',
  fields: [],
});
export const FormProvider = FormContext.Provider;

export const withForm = (Component: React.ComponentType<any>) => (props: any) => (
  <FormContext.Consumer>
    { ({ formName, fields }) => (
      <Component
        formName={ formName }
        fields={ fields }
        { ...props }
      />
    ) }
  </FormContext.Consumer>
);
