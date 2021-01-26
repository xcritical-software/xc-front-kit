import React from 'react';

import { IFormContext } from '../interfaces';


export const FormContext = React.createContext<IFormContext>({
  formName: 'defaultForm',
  fields: [],
});
export const FormProvider = FormContext.Provider;

export const withForm = (Component: React.ComponentType<any>) => React.forwardRef(
  (props: any, ref) => (
    <FormContext.Consumer>
      { ({ formName, fields, namespace }) => (
        <Component
          formName={ formName }
          fields={ fields }
          namespace={ namespace }
          ref={ ref }
          { ...props }
        />
      ) }
    </FormContext.Consumer>
  ),
);
