/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import Badge from '@xcritical/badge';

import {
  Cell,
  Head,
  Row,
  Table,
  appearances,
  capitalize,
  theme,
} from './Components';

const meta: Meta<typeof Badge> = {
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Basic: Story = {
  decorators: [],
  name: 'Basic',
  parameters: {},
  render: () => (
    <>
      A simple text with
      <Badge>badge</Badge>
      <Head size={13}>
        Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={15}>
        Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={16}>
        Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={17}>
        Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={18}>
        Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={19}>
        Example heading
        <Badge>New</Badge>
      </Head>
    </>
  ),
};

export const Apperance: Story = {
  decorators: [],
  name: 'Apperance',
  parameters: {},
  render: () => (
    <Table>
      {appearances.map((a) => (
        <Row key={a}>
          <Cell>
            <Badge appearance={a} key={`${a}`}>
              {capitalize(a)}
            </Badge>
          </Cell>
          <Cell>
            <Badge appearance={a} ghost key={`${a}_outline`}>
              {capitalize(a)}
            </Badge>
          </Cell>
        </Row>
      ))}
    </Table>
  ),
};

export const CustomTheme: Story = {
  decorators: [],
  name: 'Custom theme',
  parameters: {},
  render: () => (
    <ThemeProvider theme={theme}>
      <Table>
        {appearances.map((a) => (
          <Row key={a}>
            <Cell>
              <Badge appearance={a} key={`${a}`}>
                {capitalize(a)}
              </Badge>
            </Cell>
            <Cell>
              <Badge appearance={a} ghost key={`${a}_outline`}>
                {capitalize(a)}
              </Badge>
            </Cell>
          </Row>
        ))}
      </Table>
    </ThemeProvider>
  ),
};
