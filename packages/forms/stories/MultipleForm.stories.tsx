/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';

import Form, { FormField } from '../src';

import { Input } from './SampleComponents';
import store from './store';


storiesOf('Form', module)
  .addDecorator((Story) => (
    <Provider store={ store }>
      <Story />
    </Provider>
  ))
  .add('Multiple Form', () => (
    <>
      <h1>Form 1</h1>
      <Form name="form1">
        <div>
          <label>First Name</label>
          <div>
            <FormField
              name="firstName"
              component={ Input }
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
              component={ Input }
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
      </Form>
      <h1>Form 2</h1>
      <Form name="form2">
        <div>
          <label>First Name</label>
          <div>
            <FormField
              name="firstName"
              component={ Input }
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
              component={ Input }
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
      </Form>
    </>
  ));
