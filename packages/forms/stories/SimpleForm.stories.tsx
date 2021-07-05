/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
import React, { useRef } from 'react';

import { storiesOf } from '@storybook/react';

import { Provider } from 'react-redux';

import Input from '@xcritical/input';
import Select from '@xcritical/select';
import Button from '@xcritical/button';

import Form, { FormField } from '../src';

import { Textarea } from './SampleComponents';
import store from './store';


const selectItems = { ff0000: { name: 'Red' }, '00ff00': { name: 'Green' }, '0000ff': { name: 'Blue' } };

storiesOf('Form', module)
  .addDecorator((Story) => (
    <Provider store={ store }>
      <Story />
    </Provider>
  ))
  .add('Simple Form', () => {
    const ref = useRef<HTMLInputElement>();
    const handleFocus = (e) => {
      e.preventDefault();
      ref.current.focus();
    };

    return (
      <Form name="default">
        <div>
          <button onClick={ handleFocus }>Focus to FirstName</button>
          <br />
          <label>First Name</label>
          <div>
            <FormField
              name="firstName"
              component={ Input }
              type="text"
              placeholder="First Name"
              innerRef={ ref }
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
  });
