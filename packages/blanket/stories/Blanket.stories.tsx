/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Blanket from '@xcritical/blanket';

import { BasicBlanket, theme } from './Components';

const emptyTheme = {};

const meta: Meta<typeof Blanket> = {
  component: Blanket,
};

export default meta;
type Story = StoryObj<typeof Blanket>;

export const Basic: Story = {
  decorators: [],
  name: 'Basic',
  parameters: {},
  render: () => <BasicBlanket blanketTheme={emptyTheme} />,
};

export const CustomTheme: Story = {
  decorators: [],
  name: 'Custom theme',
  parameters: {},
  render: () => <BasicBlanket blanketTheme={theme} />,
};
