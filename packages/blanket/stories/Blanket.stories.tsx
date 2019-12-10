/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import Blanket, { blanketThemeNamespace } from '../src';
import { BlanketTheme } from '../src/interfaces';


const generateTheme = (
  baseBgColor: string,
  textColor: string,
): BlanketTheme => ({
  appearance: {
    myaccount: {
      background: baseBgColor,
      color: textColor,
      fontWeight: 600,
      opacity: 0.5,
      zIndex: 100,
    },
  },
});

const theme = generateTheme('#575857', '#A7A7A7');

const BasicBlanket = () => {
  const [isTinted, setIsTinted] = React.useState(false);

  const handleClick = (): void => {
    setIsTinted(!isTinted);
  };

  return (
    <ThemeProvider theme={ { [blanketThemeNamespace]: theme } }>
      <Blanket isTinted={ isTinted } onBlanketClicked={ handleClick } />
      <div>Click to any place for show/hide Blanket</div>
    </ThemeProvider>
  );
};

storiesOf('Blanket', module)
  .add('Basic', () => (
    <BasicBlanket />
  ));
