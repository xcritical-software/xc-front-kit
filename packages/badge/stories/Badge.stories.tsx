/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Badge from '@xcritical/badge';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';


const Head = styled.h1<any>`
  font-size: ${({ size }: any) => `${size}px`};
`;


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
  <div style={ { display: 'table', minWidth: '280px' } } { ...props } />
);
const Row = (props: any) => (
  <div style={ { display: 'table-row' } } { ...props } />
);
const Cell = (props: any) => (
  <div style={ { display: 'table-cell', padding: 4 } } { ...props } />
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
      <Head size={ 13 }>
Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={ 15 }>
Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={ 16 }>
Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={ 17 }>
Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={ 18 }>
Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={ 19 }>
Example heading
        <Badge>New</Badge>
      </Head>
    </>
  )).add('Apperance', () => (
    <Table>
      { appearances.map((a) => (
        <Row key={ a }>
          <Cell>
            <Badge appearance={ a } key={ `${a}` }>
              { capitalize(a) }
            </Badge>
          </Cell>
          <Cell>
            <Badge appearance={ a } ghost key={ `${a}_outline` }>
              { capitalize(a) }
            </Badge>
          </Cell>
        </Row>
      )) }
    </Table>
  ));
