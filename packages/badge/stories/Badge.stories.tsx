/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { darken } from 'polished';
import { withKnobs } from '@storybook/addon-knobs';
import styled, { ThemeProvider } from 'styled-components';

import Badge, { badgeThemeNamespace } from '@xcritical/badge';
import { colors } from '@xcritical/theme';

const Head = styled.h1<any>`
  font-size: ${({ size }: any) => `${size}px`};
`;

const theme = {
  [badgeThemeNamespace]: {
    backgroundColor: darken(0.1, colors.GRAY),
    ghost: {
      borderColor: darken(0.1, colors.GRAY),
      background: darken(0.1, colors.WHITE),
    },
    appearance: {
      default: {},
      primary: {
        background: darken(0.1, colors.PRIMARY),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.PRIMARY),
          borderColor: darken(0.1, colors.PRIMARY),
          background: darken(0.1, colors.WHITE),
        },
      },
      secondary: {
        background: darken(0.1, colors.SECONDARY),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.SECONDARY),
          borderColor: darken(0.1, colors.SECONDARY),
          background: darken(0.1, colors.WHITE),
        },
      },
      success: {
        background: darken(0.1, colors.SUCCESS),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.SUCCESS),
          borderColor: darken(0.1, colors.SUCCESS),
          background: darken(0.1, colors.WHITE),
        },
      },
      danger: {
        background: darken(0.1, colors.DANGER),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.DANGER),
          borderColor: darken(0.1, colors.DANGER),
          background: darken(0.1, colors.WHITE),
        },
      },
      warning: {
        background: darken(0.1, colors.WARNING),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.WARNING),
          borderColor: darken(0.1, colors.WARNING),
          background: darken(0.1, colors.WHITE),
        },
      },
      info: {
        background: darken(0.1, colors.INFO),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.INFO),
          borderColor: darken(0.1, colors.INFO),
          background: darken(0.1, colors.WHITE),
        },
      },
      dark: {
        background: darken(0.1, colors.DARK),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.DARK),
          borderColor: darken(0.1, colors.DARK),
          background: darken(0.1, colors.WHITE),
        },
      },
      light: {
        background: darken(0.1, colors.LIGHT),
        color: darken(0.1, colors.CHAROCOAL),
        ghost: {
          color: darken(0.1, colors.LIGHT),
          borderColor: darken(0.1, colors.LIGHT),
          background: darken(0.1, colors.CHAROCOAL),
        },
      },
    },
  },
};

const appearances = [
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
  'light',
  'dark',
];

const Table = (props: any) => (
  <div style={{ display: 'table', minWidth: '280px' }} {...props} />
);
const Row = (props: any) => <div style={{ display: 'table-row' }} {...props} />;
const Cell = (props: any) => (
  <div style={{ display: 'table-cell', padding: 4 }} {...props} />
);

function capitalize(str: string) {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return str.charAt(0).toUpperCase() + str.slice(1);
}

storiesOf('Badge', module)
  .addDecorator(withKnobs)
  .add('Basic', () => (
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
  ))
  .add('Apperance', () => (
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
  ))
  .add('Custom theme', () => (
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
  ));
