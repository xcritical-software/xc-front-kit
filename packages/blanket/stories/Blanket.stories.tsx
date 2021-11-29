/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import Blanket, { blanketThemeNamespace, IBlanketTheme } from '../src';

const emptyTheme = {};

const theme = {
  [blanketThemeNamespace]: {
    background: '#575857',
    color: '#A7A7A7',
    fontWeight: 600,
    opacity: 0.7,
    zIndex: 100,
  } as IBlanketTheme,
};

const BasicBlanket: React.FC<any> = ({ blanketTheme }) => {
  const [isTinted, setIsTinted] = React.useState(false);

  const handleClick = (): void => {
    setIsTinted(!isTinted);
  };

  return (
    <ThemeProvider theme={blanketTheme}>
      <Blanket
        className="at-custom-class"
        isTinted={isTinted}
        onBlanketClicked={handleClick}
      />
      <div>Click to any place for show/hide Blanket</div>
    </ThemeProvider>
  );
};

storiesOf('Blanket', module)
  .add('Basic', () => <BasicBlanket blanketTheme={emptyTheme} />)
  .add('With Theme', () => <BasicBlanket blanketTheme={theme} />);
