import React from 'react';
import { withTheme } from 'styled-components';

import { Root } from './styled';
import { IBlanketProps } from './interfaces';

export const PureBlanket: React.FC<IBlanketProps> = ({
  theme,
  canClickThrough = false,
  isTinted = false,
  zIndex,
  onBlanketClicked = () => {},
  className = '',
}) => {
  const onClick = canClickThrough ? undefined : onBlanketClicked;

  return (
    <Root
      className={`${className} at-blanket`}
      theme={theme}
      canClickThrough={canClickThrough}
      isTinted={isTinted}
      zIndex={zIndex}
      onClick={onClick}
    />
  );
};

export const Blanket = React.memo(withTheme(PureBlanket));
