/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '@xcritical/input';

import Form, {
  formSelector,
  xcriticalFormError,
  xcriticalFormInit,
  xcriticalFormShowErrors,
  xcriticalFormSetFieldsMeta,
} from '../src';

import { InputWithErrorWrapper } from './SampleComponents';


const errors = {
  firstName: 'error to firstName field',
  lastName: 'error to lastName field',
  age: 'error to age field',
};

const initData = {
  firstName: '123',
  lastName: '123',
  age: '123',
};

const FORM_NAME = 'error-form';

const validate = (model) => ({
  firstName: model.firstName === '123' ? errors.firstName : null,
  lastName: model.lastName === '123' ? errors.lastName : null,
  age: model.age === '123' ? errors.age : null,
});

const InputWithError = ({ error, ...props }) => (
  <InputWithErrorWrapper>
    <Input { ...props } />
    <br />
    { error && <span>{ error }</span> }
  </InputWithErrorWrapper>
);

const changedMeta = {
  firstName: {
    touch: true,
    changed: true,
  },
  lastName: {
    touch: true,
    changed: true,
  },
  age: {
    touch: false,
    changed: false,
  },
};

const ErrorsForm = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => formSelector(state, FORM_NAME));

  useEffect(() => {
    const validationErrors = validate(form.model);
    dispatch(xcriticalFormError(FORM_NAME, validationErrors));
  }, [form.model]);


  useEffect(() => {
    dispatch(xcriticalFormError(FORM_NAME, errors));
    dispatch(xcriticalFormInit(FORM_NAME, initData));
  }, [dispatch]);

  const handleToggleShowErrors = () => {
    dispatch(xcriticalFormShowErrors(FORM_NAME, !form.showAllErrors));
  };

  const handleChangeMeta = () => {
    dispatch(xcriticalFormSetFieldsMeta(FORM_NAME, changedMeta));
  };

  return (
    <>
      <h1>Form with errors</h1>
      <p>Error value = 123</p>
      <Form name={ FORM_NAME }>
        <div>
          <label>First Name</label>
          <div>
            <Form.Field
              name="firstName"
              component={ InputWithError }
              type="text"
              placeholder="First Name"
            />
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <Form.Field
              name="lastName"
              component={ InputWithError }
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div>
          <label>Age</label>
          <div>
            <Form.Field
              name="age"
              component={ InputWithError }
              type="text"
              placeholder="Age"
            />
          </div>
        </div>
      </Form>
      <button
        style={ { marginBottom: '10px' } }
        onClick={ handleToggleShowErrors }
      >
        Toggle showAllActions
      </button>
      <br />
      <button
        onClick={ handleChangeMeta }
      >
        Change first and last fields meta to toched, changed
      </button>
    </>
  );
};


export default ErrorsForm;
