/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import Form from '../src';


const Input = styled.input`
`;


storiesOf('Form', module)
  .add('Basic', () => (
    <div>
      <Form name="default">
        <Form.Field
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          appearance="lg"
          component={ Input }
        />
      </Form>
    </div>
  ));
