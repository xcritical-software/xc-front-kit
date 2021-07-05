import React from 'react';

import { StyledButtonGroup } from './styled';
import { IButtonGroup } from './interfaces';

export const ButtonGroup: React.FC<IButtonGroup> = ({ children, theme }) => (
  <StyledButtonGroup theme={theme}>{children}</StyledButtonGroup>
);
