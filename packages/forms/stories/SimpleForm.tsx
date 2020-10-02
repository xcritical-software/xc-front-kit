/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
import React from 'react';

import Input from '@xcritical/input';
import Select from '@xcritical/select';
import Button from '@xcritical/button';

import Form, { FormField } from '../src';

import { Textarea } from './SampleComponents';


const selectItems = { ff0000: { name: 'Red' }, '00ff00': { name: 'Green' }, '0000ff': { name: 'Blue' } };

const simpleForm = () => (
  <Form name="default">
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
    <div>
      <label>Email</label>
      <div>
        <FormField
          name="email"
          component={ Input }
          type="email"
          placeholder="Email"
        />
        <FormField name="favoriteColor" component={ Select } items={ selectItems } />
      </div>
    </div>
    <div>
      <label>Sex</label>
      <div>
        <label>
          <FormField name="sex" component={ Input } type="radio" value="male" />

          Male
        </label>
        <label>
          <FormField name="sex" component={ Input } type="radio" value="female" />

          Female
        </label>
      </div>
    </div>
    <div>
      <label>Favorite Color</label>
      <div>
        <FormField name="favoriteColor" component={ Select } items={ selectItems } />
      </div>
    </div>
    <div>
      <label htmlFor="employed">Employed</label>
      <div>
        <FormField
          name="employed"
          id="employed"
          component={ Input }
          type="checkbox"
        />
      </div>
    </div>
    <div>
      <label>Notes</label>
      <div>
        <FormField name="notes" component={ Textarea } />
      </div>
    </div>
    <div>
      <Button type="submit">Submit</Button>
      <Button type="button">
        Clear Values
      </Button>
    </div>
    <FormField
      id="text"
      name="text"
      type="text"
      placeholder="text"
      appearance="lg"
      component={ Input }
    />
  </Form>
);


export default simpleForm;
