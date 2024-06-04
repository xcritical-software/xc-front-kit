/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Grid, { gridThemeNamespace } from '../src';

import * as countries from './countries';
import {
  columns,
  columnsFixed,
  columnsWithRender,
  createRowsWithRender,
  rows,
  rowsFixed,
  rowsWithChildren,
  totals,
} from './data';
import { AMStheme } from './styled';
import { generateTheme } from './utils';

const meta: Meta<typeof Grid> = {
  component: Grid,
  args: {
    shouldChangeColumnsWidth: true,
    shouldMovingColumns: false,
    disableSelect: false,
    isMultiSelect: false,
    onChangeExpand: action('onChangeExpand'),
    onSelect: action('onSelect'),
  },

  parameters: { actions: { argTypesRegex: '^on.*' } },
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
    disableSelect: {
      control: 'boolean',
      defaultValue: false,
      name: 'Disable select',
    },
    isMultiSelect: {
      control: 'boolean',
      defaultValue: false,
      name: 'Enable multi select',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Basic: Story = {
  decorators: [],
  name: 'Basic',
  parameters: {},
  render: (props) => (
    <>
      <div style={{ height: '500px' }}>
        <Grid
          {...props}
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

export const WithChildren: Story = {
  decorators: [],
  name: 'With childrens',
  parameters: {},
  render: (props) => (
    <>
      <div style={{ height: '500px' }}>
        <Grid
          {...props}
          columns={columns}
          items={rowsWithChildren}
          totals={totals}
          width={document.documentElement.clientWidth - 100}
          height={document.documentElement.clientHeight - 100}
        />
      </div>
    </>
  ),
};

export const FixedBoth: Story = {
  decorators: [],
  name: 'fixed columns (left+right)',
  parameters: {},
  render: (props) => (
    <>
      <div style={{ height: '500px' }}>
        <Grid
          {...props}
          columns={columnsFixed('both').map((el) => ({
            ...el,
            sortable: true,
          }))}
          items={rowsFixed}
          width={document.documentElement.clientWidth - 100}
          height={document.documentElement.clientHeight - 100}
          rowHeight={30}
          theme={AMStheme[gridThemeNamespace]}
        />
      </div>
    </>
  ),
};

type PagePropsAndCustomArgs = React.ComponentProps<typeof Grid> & {
  color: string;
};
export const ThemedWithMultiSelect: StoryObj<PagePropsAndCustomArgs> = {
  decorators: [],
  name: 'Themed and multi select',
  argTypes: {
    color: {
      control: 'color',
      defaultValue: '#023fa1',
      name: 'Theme color',
    },
  },
  args: {
    isMultiSelect: true,
    color: '#023fa1',
  },

  render: ({ color, ...props }) => (
    <Grid
      {...props}
      columns={countries.columns}
      items={countries.items}
      width={document.documentElement.clientWidth - 100}
      height={document.documentElement.clientHeight - 100}
      theme={generateTheme(color)}
    />
  ),
};

export const RenderFunction: Story = {
  decorators: [],
  name: 'Render cell function',
  parameters: {},
  render: (props) => (
    <Grid
      {...props}
      columns={columnsWithRender}
      items={createRowsWithRender()}
      width={document.documentElement.clientWidth - 100}
      height={document.documentElement.clientHeight - 100}
      rowHeight={30}
      theme={AMStheme}
    />
  ),
};
