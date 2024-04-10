/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Grid from '../src';

import { columns, rows, totals } from './data';

const meta: Meta<typeof Grid> = {
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Basic: Story = {
  decorators: [],
  name: 'Basic',
  parameters: {},
  render: () => (
    <>
      <div style={{ height: '500px' }}>
        <Grid
          columns={columns}
          items={rows}
          totals={totals}
          shouldFitContainer
          width={document.documentElement.clientWidth - 100}
          height={document.documentElement.clientHeight - 100}
        />
      </div>
    </>
  ),
};
