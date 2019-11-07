/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Grid from '../src';
import { mockTheme, withoutColorLines } from './mock-theme';
import { generateMockData } from './generateMocks';


const data = generateMockData(20, 100);

const { rows, columns } = data;
const Div = styled.div`
height: 500px;
`;

storiesOf('Grid', module)
  .add(' default', () => (
    <Grid
      columns={ columns }
      rows={ rows }
    />
  )).add('Themed', () => (
    <Grid
      columns={ columns }
      rows={ rows }
      theme={ mockTheme }
    />
  )).add('With Scroll', () => (
    <Div>
      <Grid
        columns={ columns }
        rows={ rows }
      />
    </Div>
  ))
  .add('Without Color Lines', () => (
    <Div>
      <Grid
        columns={ columns }
        rows={ rows }
        theme={ withoutColorLines }
      />
    </Div>
  ))
  .add('Multiline Table Data', () => (
    <Grid
      columns={ columns }
      rows={ rows }
      multiline
    />
  ));
