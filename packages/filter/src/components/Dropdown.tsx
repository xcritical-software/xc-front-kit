import React, { useMemo } from 'react';
import { IThemeNamespace } from '@xcritical/theme';
import { Popover, popoverThemeNamespace, IPopoverTheme } from '@xcritical/popover';

import { IDropdownProps } from '../interfaces';
import { DropdownRoot, Blanket } from './styled';


export const Dropdown: React.FC<IDropdownProps> = ({
  target,
  children,
  isOpen,
  filterTheme,
  onClose,
}) => {
  const popoverTheme: IThemeNamespace<IPopoverTheme> = useMemo(() => ({
    [popoverThemeNamespace]: {
      appearance: {
        default: filterTheme.popover ?? {},
      },
    },
  }), [filterTheme.popover]);

  const { dropdownBlanketZIndex } = filterTheme;

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
      { isOpen && <Blanket zIndex={ dropdownBlanketZIndex } onClick={ onClose } /> }
    </DropdownRoot>
  );
};
