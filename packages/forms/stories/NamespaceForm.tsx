/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
import React from 'react';

import Input from '@xcritical/input';

import Form from '../src';


const NamespaceForm = () => (
  <>
    <h1>Form with namespace</h1>
    <Form name="questionnaires" namespace="questionnaires.form">
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


export default NamespaceForm;
