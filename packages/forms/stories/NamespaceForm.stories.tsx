/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import Input from '@xcritical/input';

import Form, { FormField } from '../src';

import { storeWithNamespace } from './store';

storiesOf('Form', module)
  .addDecorator((Story) => (
    <Provider store={storeWithNamespace}>
      <Story />
    </Provider>
  ))
  .add('Namespace Form', () => (
    <>
      <h1>Form with namespace</h1>
      <Form name="questionnaires" namespace="questionnaires.form">
        <div>
          <label>First Name</label>
          <div>
            <FormField
              name="firstName"
              component={Input}
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
              component={Input}
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
      </Form>
    </>
  ));
