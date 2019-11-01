import React, { ReactElement } from 'react';
import Popper, { IContent } from '@xcritical/popper';

import { IPopover } from './interfaces';
import { Content, Arrow, PopperWrapper } from './styles';


export const Popover: React.FC<IPopover> = ({
  position,
  content,
  autoFlip,
  children,
  visible = false,
  withArrow = true,
  fullWidthContent = false,
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}) => {
  const PopoverContent = (popperProps: IContent): ReactElement => (
    <Content
      ref={ popperProps.contentRef }
      data-content-position={ popperProps.position }
      fullWidthContent={ fullWidthContent }
      theme={ theme }
      appearance={ appearance }
      baseAppearance={ baseAppearance }
      style={ popperProps.popperStyles }
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
    <PopperWrapper>
      <Popper
        position={ position }
        autoFlip={ autoFlip }
        content={ visible && PopoverContent }
      >
        { children }
      </Popper>
    </PopperWrapper>
  );
};
