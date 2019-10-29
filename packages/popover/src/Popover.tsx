import React, { ReactElement } from 'react';
import Popper, { IContent } from '@xcritical/popper';

import { IPopover } from './interfaces';
import { Content, Arrow } from './styles';


export const Popover: React.FC<IPopover> = ({
  position,
  content,
  autoFlip,
  children,
  visible = false,
  withArrow = true,
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}) => {
  const PopoverContent = (popperProps: IContent): ReactElement => (
    <Content
      data-content-position={ popperProps.position }
      theme={ theme }
      appearance={ appearance }
      baseAppearance={ baseAppearance }
    >
      { content }
      { withArrow && (
        <Arrow
          x-arrow=""
          style={ popperProps.arrowStyles }
          data-arrow-position={ popperProps.position }
          theme={ theme }
          appearance={ appearance }
          baseAppearance={ baseAppearance }
        />
      ) }
    </Content>
  );

  return (
    <Popper
      position={ position }
      autoFlip={ autoFlip }
      content={ visible && PopoverContent }
    >
      { children }
    </Popper>
  );
};
