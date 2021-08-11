/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { storiesOf } from '@storybook/react';

import Input, { IInputProps } from '@xcritical/input';

import Form, {
  xcriticalFormError,
  xcriticalFormInit,
  xcriticalFormShowErrors,
  xcriticalFormSetFieldsMeta,
  FormField,
  useForm,
} from '../src';

import { InputWithErrorWrapper } from './SampleComponents';
import store from './store';

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
  firstName: model?.firstName === '123' ? errors.firstName : null,
  lastName: model?.lastName === '123' ? errors.lastName : null,
  age: model?.age === '123' ? errors.age : null,
});

const InputWithError = ({
  error,
  ...props
}: IInputProps & { error?: string }) => (
  <InputWithErrorWrapper>
    <Input {...props} />
    <br />
    {error && <span>{error}</span>}
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

storiesOf('Form', module)
  .addDecorator((Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ))
  .add('Error Form', () => {
    const dispatch = useDispatch();

    const form = useForm(FORM_NAME);

    useEffect(() => {
      const validationErrors = validate(form.model);
      dispatch(xcriticalFormError(FORM_NAME, validationErrors));
    }, [dispatch, form.model]);

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
        <Form name={FORM_NAME}>
          <div>
            <label>First Name</label>
            <div>
              <FormField
                name="firstName"
                component={InputWithError}
                type="text"
                placeholder="First Name"
              />
            </div>
          </div>
          <div>
            <label>Last Name</label>
            <div>
              <FormField
                name="lastName"
                component={InputWithError}
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div>
            <label>Age</label>
            <div>
              <FormField
                name="age"
                component={InputWithError}
                type="text"
                placeholder="Age"
              />
            </div>
          </div>
        </Form>
        <button
          type="button"
          style={{ marginBottom: '10px' }}
          onClick={handleToggleShowErrors}>
          Toggle showAllActions
        </button>
        <br />
        <button type="button" onClick={handleChangeMeta}>
          Change first and last fields meta to touched, changed
        </button>
      </>
    );
  });
