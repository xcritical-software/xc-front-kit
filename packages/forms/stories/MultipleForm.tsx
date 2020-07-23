/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
import React from 'react';

import Form from '../src';

import { Input } from './SampleComponents';


const multipleForm = () => (
  <>
    <h1>Form 1</h1>
    <Form name="form1">
      <div>
        <label>First Name</label>
        <div>
          <Form.Field
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
          <Form.Field
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
          <Form.Field
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
          <Form.Field
            name="lastName"
            component={ Input }
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
    </Form>
  </>
);


export default multipleForm;
