import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { isNil } from 'utilitify';

import { xcriticalFormPropertyChange, IFormAction } from '../actions';
import { formSelector } from '../reducer';
import {
  IFormFieldProps,
  IFormConnectedFieldProps,
  IFormConnectedFieldDispatch,
} from '../interfaces';
import { isEvent, getValueFromNativeComponent } from '../utils';


const ConnectedFormField: React.FC<IFormFieldProps> = ({
  component: Component,
  ...props
}) => <Component { ...props } />;

const mapStateToProps = (
  state: any,
  { formName, name, ...rest }: IFormFieldProps,
): IFormConnectedFieldProps => {
  const $state = formSelector(state, formName);
  const value = get($state, `model.${name}`);

  return {
    ...rest,
    value: isNil(value) ? '' : value,
    error: get($state, `errors.${name}`),
    invalid: !!get($state, `errors.${name}`, false),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<IFormAction>,
  { formName, name }: IFormFieldProps,
): IFormConnectedFieldDispatch => ({
  onChange: (value: any, action: Function) => {
    let $value = value;

    if (isEvent(value)) {
      $value = getValueFromNativeComponent(value);
    } else if (action && typeof action === 'function') {
      $value = action(value);
    }

    dispatch(xcriticalFormPropertyChange(formName, name, $value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedFormField);
