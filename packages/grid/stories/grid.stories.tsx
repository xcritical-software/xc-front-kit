import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '../src';
import { mockColumns, mockRows } from './mock-rows';
// import { tableTheme } from '../src/components/theme/theme';
import { mockTheme } from './mock-theme';


storiesOf('Grid', module)
  .add(' default', () => (
    <Grid
      columns={ mockColumns }
      rows={ mockRows }
      // theme={ tableTheme }
    />
  )).add('Themed', () => (
    <Grid
      columns={ mockColumns }
      rows={ mockRows }
      theme={ mockTheme }
    />
  ));
