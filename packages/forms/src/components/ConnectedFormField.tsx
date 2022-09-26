/* eslint-disable no-unused-expressions */
import React, { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import get from 'lodash.get';

import { xcriticalFormPropertyChange } from '../actions';
import { FormFieldProps } from '../interfaces';
import { getValueFromNativeComponent } from '../utils';
import { useForm } from '../hooks';

import { FormContext } from './FormContext';

export const PureFormField = function <TProps>({
  component: Component,
  innerRef,
  name,
  onChange: onChangeProp,
  ...props
}: FormFieldProps<TProps>): React.ReactElement<TProps> {
  const { className, ...$props } = props as any;
  const dispatch = useDispatch();
  const { formName, namespace } = useContext(FormContext);

  const $state = useForm(formName, namespace);

  const $value = get($state, `model.${name}`);
  const value = $value == null ? '' : $value;
  const initialValue = get($state, `source.${name}`);

  const $error = get($state, `errors.${name}`);
  const touch = get($state, `fields.${name}.touch`, false);
  const { showAllErrors } = $state;

  const showError = showAllErrors || touch;
  const error = showError ? $error : null;
  const invalid = showError ? !!error : false;

  const $className = `xc-field-${formName}${
    namespace ? `-${namespace}` : ''
  }__${name} ${className ?? ''}`;

  const onChange = useCallback(
    (...args: any[]) => {
      dispatch(
        xcriticalFormPropertyChange(
          formName,
          name,
          getValueFromNativeComponent(args[0])
        )
      );
      onChangeProp?.(...args);
    },
    [dispatch, formName, name, onChangeProp]
  );

  return (
    <Component
      className={$className}
      {...$props}
      value={value}
      initialValue={initialValue}
      error={error}
      invalid={invalid}
      onChange={onChange}
      name={name}
      ref={innerRef}
    />
  );
};

export const FormField = React.memo(PureFormField) as typeof PureFormField;
