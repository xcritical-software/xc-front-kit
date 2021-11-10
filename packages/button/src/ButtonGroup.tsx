import React from 'react';

import { StyledButtonGroup } from './styled';
import { IButtonGroup } from './interfaces';

export const ButtonGroup: React.FC<IButtonGroup> = ({
  children,
  theme,
  className = '',
}) => (
  <StyledButtonGroup className={`${className} at-button-group`} theme={theme}>
    {children}
  </StyledButtonGroup>
);
