import React, { PropsWithChildren } from 'react';

import { StyledButtonGroup } from './styled';
import { IButtonGroup } from './interfaces';

export const ButtonGroup: React.FC<IButtonGroup & PropsWithChildren> = ({
  children,
  theme,
  className,
}) => (
  <StyledButtonGroup className={className} theme={theme}>
    {children}
  </StyledButtonGroup>
);
