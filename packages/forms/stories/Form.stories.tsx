/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import Form from '../src';
import store from './store';


const Input = styled.input`
`;
const Textarea = styled.textarea`
`;
const Select = styled.select`
`;


storiesOf('Form', module)
  .add('Simple Form', () => (
    <Provider store={ store }>
      <Form name="default">
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
        <div>
          <label>Email</label>
          <div>
            <Form.Field
              name="email"
              component={ Input }
              type="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div>
          <label>Sex</label>
          <div>
            <label>
              <Form.Field name="sex" component={ Input } type="radio" value="male" />

            Male
            </label>
            <label>
              <Form.Field name="sex" component={ Input } type="radio" value="female" />

            Female
            </label>
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
          <div>
            <Form.Field name="favoriteColor" component={ Select }>
              <option />
              <option value="ff0000">Red</option>
              <option value="00ff00">Green</option>
              <option value="0000ff">Blue</option>
            </Form.Field>
          </div>
        </div>
        <div>
          <label htmlFor="employed">Employed</label>
          <div>
            <Form.Field
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
            <Form.Field name="notes" component={ Textarea } />
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button">
          Clear Values
          </button>
        </div>
        <Form.Field
          id="text"
          name="text"
          type="text"
          placeholder="text"
          appearance="lg"
          component={ Input }
        />
      </Form>
    </Provider>
  ));
