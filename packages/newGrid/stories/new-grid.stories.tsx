import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { ThemeProvider } from 'styled-components';
// import { darken, mix } from 'polished';
// import { action } from '@storybook/addon-actions';
import { columns, rows, totals } from './data'


import App from "../src/App";
export default App;


storiesOf('New Grid', module)
  .add('Basic', () => (
    <div>
      <App
        columns={columns}
        items={rows}
        totals={totals}
        width={document.documentElement.clientWidth - 100}
        height={document.documentElement.clientHeight - 100}
      />
    </div>
  ))



  // <App
  //   columns={columns}
  //   items={rows}
  //   totals={totals}
  //   width={document.documentElement.clientWidth - 100}
  //   height={document.documentElement.clientHeight - 100}
  // />
