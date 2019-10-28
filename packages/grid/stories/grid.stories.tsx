/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Grid from '../src';
import { mockTheme } from './mock-theme';
import { generateMockData } from './generateMocks';


const data = generateMockData(20, 100);

const mockRows = data.rows;
const mockColumns = data.columns;

const Div = styled.div`
height: 500px;
`;
const columns = mockColumns.map((el: any, i: number) => (
  {
    title: el.toUpperCase(),
    order: i,
    field: el,
    isExpandable: i === 0,
    render: /* Math.random() > 0.3 ? */ null/* : returnOne */,
    width: 200,
  }
));


storiesOf('Grid', module)
  .add(' default', () => (
    <Grid
      columns={ columns }
      rows={ mockRows }
    />
  )).add('Themed', () => (
    <Grid
      columns={ columns }
      rows={ mockRows }
      theme={ mockTheme }
    />
  )).add('With Scroll', () => (
    <Div>
      <Grid
        columns={ columns }
        rows={ mockRows }
      />
    </Div>
  ));
