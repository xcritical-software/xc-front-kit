import React from 'react';
import { withTheme } from 'styled-components';

import { Root } from './styled';
import { IBlanketProps } from './interfaces';


export const PureBlanket = ({
  appearance,
  baseAppearance,
  canClickThrough = false,
  isTinted = false,
  onBlanketClicked = () => {},
}: IBlanketProps) => {
  const onClick = canClickThrough ? undefined : onBlanketClicked;

  return (
    <Root
      appearance={ appearance }
      baseAppearance={ baseAppearance }
      canClickThrough={ canClickThrough }
      isTinted={ isTinted }
      onClick={ onClick }
    />
  );
};

export const Blanket = React.memo(withTheme(PureBlanket));
