import { ThemeProvider } from 'styled-components';
import React from 'react';

import Blanket, { blanketThemeNamespace, IBlanketTheme } from '../src';

export const theme = {
  [blanketThemeNamespace]: {
    background: '#575857',
    color: '#A7A7A7',
    fontWeight: 600,
    opacity: 0.7,
    zIndex: 100,
  } as IBlanketTheme,
};

export const BasicBlanket: React.FC<any> = ({ blanketTheme }) => {
  const [isTinted, setIsTinted] = React.useState(false);

  const handleClick = (): void => {
    setIsTinted(!isTinted);
  };

  return (
    <ThemeProvider theme={blanketTheme}>
      <Blanket
        className="at-blanket"
        isTinted={isTinted}
        onBlanketClicked={handleClick}
      />
      <div>Click to any place for show/hide Blanket</div>
    </ThemeProvider>
  );
};
