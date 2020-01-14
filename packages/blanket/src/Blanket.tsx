import React from 'react';
import { withTheme } from 'styled-components';

import { Root } from './styled';
import { IBlanketProps } from './interfaces';


export const PureBlanket: React.FC<IBlanketProps> = ({
  theme,
  canClickThrough = false,
  isTinted = false,
  onBlanketClicked = () => {},
}) => {
  const onClick = canClickThrough ? undefined : onBlanketClicked;

  return (
    <Root
      theme={ theme }
      canClickThrough={ canClickThrough }
      isTinted={ isTinted }
      onClick={ onClick }
    />
  );
};

export const Blanket = React.memo(withTheme(PureBlanket));
