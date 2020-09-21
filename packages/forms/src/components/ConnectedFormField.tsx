import React, { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash.get';

import { xcriticalFormPropertyChange } from '../actions';
import { formSelector } from '../reducer';
import {
  IFormFieldProps, IFormStateMap,
} from '../interfaces';
import { getValueFromNativeComponent } from '../utils';

import { FormContext } from './FormContext';


export const FormField = function<TProps> (
  {
    component: Component,
    name,
    ...props
  }: IFormFieldProps<TProps>,
): React.ReactElement<TProps> {
  const dispatch = useDispatch();
  const { formName, namespace } = useContext(FormContext);
  const $state = useSelector((state: IFormStateMap) => formSelector(state, formName, namespace));

  const value = get($state, `model.${name}`);

  const $error = get($state, `errors.${name}`);
  const touch = get($state, `fields.${name}.touch`, false);
  const { showAllErrors } = $state;

  const showError = showAllErrors || touch;
  const error = showError ? $error : null;
  const invalid = showError ? !!error : false;

  const onChange = useCallback(($value: any) => {
    dispatch(xcriticalFormPropertyChange(formName, name, getValueFromNativeComponent($value)));
  }, [dispatch, formName, name]);

  return (
    <Component
      { ...(props as any) }
      value={ value }
      error={ error }
      invalid={ invalid }
      onChange={ onChange }
    />
  );
};
