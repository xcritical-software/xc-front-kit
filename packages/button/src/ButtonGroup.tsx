import React from 'react';

import { StyledButtonGroup } from './styled';
import { IButtonGroupProps } from './interfaces';


export const ButtonGroup: React.FC<IButtonGroupProps> = ({
  children,
  theme,
  baseAppearance = 'default',
  appearance = 'default',
}) => (
  <StyledButtonGroup
    theme={ theme }
    baseAppearance={ baseAppearance }
    appearance={ appearance }
  >
    { children }
  </StyledButtonGroup>
);
