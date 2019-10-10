import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '../src';
import { mockColumns, mockRows } from './mock-rows';
import { tableTheme } from '../src/components/theme/theme';


storiesOf('Grid', module)
  .add(' default', () => (
    <Grid
      columns={ mockColumns }
      rows={ mockRows }
      theme={ tableTheme }
    />
  ));
