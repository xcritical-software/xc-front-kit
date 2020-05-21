import React from 'react';
import { Popover, popoverThemeNamespace } from '@xcritical/popover';

import { DropdownRoot, Blanket } from './styled';


export const Dropdown = ({
  target,
  children,
  isOpen,
  filterTheme,
  onClose,
}: any) => {
  const popoverTheme = {
    [popoverThemeNamespace]: {
      appearance: {
        default: filterTheme.popover,
      },
    },
  };

  const blanketZIndex = filterTheme.dropdownBlanketZIndex;

  return (
    <DropdownRoot>
      <Popover
        preventOverflowViewport
        visible={ isOpen }
        content={ children }
        withArrow={ false }
        theme={ popoverTheme }
        position="bottom left"
      >
        { target }
      </Popover>
      { isOpen && <Blanket zIndex={ blanketZIndex } onClick={ onClose } /> }
    </DropdownRoot>
  );
};
