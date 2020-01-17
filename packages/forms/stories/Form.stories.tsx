/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import store from './store';
import SimpleForm from './SimpleForm';
import MultipleForm from './MultipleForm';
import MirroringForm from './MirroringForm';
import ConnectedForm from './ConnectedForm';


storiesOf('Form', module)
  .add('Simple Form', () => (
    <Provider store={ store }>
      <SimpleForm />
    </Provider>
  ))
  .add('Mutiple Form', () => (
    <Provider store={ store }>
      <MultipleForm />
    </Provider>
  ))
  .add('Mirror Form', () => (
    <Provider store={ store }>
      <MirroringForm />
    </Provider>
  ))
  .add('Connected Form', () => (
    <Provider store={ store }>
      <ConnectedForm />
    </Provider>
  ));
