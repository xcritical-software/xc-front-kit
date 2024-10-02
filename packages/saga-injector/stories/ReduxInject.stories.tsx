import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import { createStore, ReduxInject } from '../src';

import { ComponentWithInject } from './ComponentWithInject';

const meta: Meta<typeof ReduxInject> = {
  component: ReduxInject,
};

type Story = StoryObj<typeof ReduxInject>;

const store = createStore({}, {});

export const Default: Story = {
  decorators: [],
  name: 'Default',
  parameters: {},
  render: () => (
    <Provider store={store}>
      <ComponentWithInject />
    </Provider>
  ),
};

export default meta;
