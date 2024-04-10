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
  argTypes: {
    shouldChangeColumnsWidth: {
      control: 'boolean',
      defaultValue: false,
      name: 'Should change columns width',
    },
    shouldMovingColumns: {
      control: 'boolean',
      defaultValue: false,
      name: 'Should moving columns',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Basic: Story = {
  args: {
    shouldChangeColumnsWidth: true,
    shouldMovingColumns: false,
  },
  decorators: [],
  name: 'Basic',
  parameters: {},
  render: ({ shouldChangeColumnsWidth, shouldMovingColumns }) => (
    <>
      <div style={{ height: '500px' }}>
        <Grid
          columns={columns}
          items={rows}
          totals={totals}
          shouldFitContainer
          shouldChangeColumnsWidth={shouldChangeColumnsWidth}
          shouldMovingColumns={shouldMovingColumns}
          width={document.documentElement.clientWidth - 100}
          height={document.documentElement.clientHeight - 100}
        />
      </div>
    </>
  ),
};
