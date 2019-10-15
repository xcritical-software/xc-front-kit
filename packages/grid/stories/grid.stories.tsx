import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Grid from '../src';
import { mockColumns, mockRows } from './mock-rows';
import { mockTheme } from './mock-theme';


const Div = styled.div`
height: 500px;
`;

storiesOf('Grid', module)
  .add(' default', () => (
    <Grid
      columns={ mockColumns }
      rows={ mockRows }
    />
  )).add('Themed', () => (
    <Grid
      columns={ mockColumns }
      rows={ mockRows }
      theme={ mockTheme }
    />
  )).add('WithWrapper', () => (
    <Div>
      <Grid
        columns={ mockColumns }
        rows={ mockRows }
      />
    </Div>
  ));
