import styled from 'styled-components';

import { Scrollbars } from 'react-custom-scrollbars';
import { sidebarTheme, getStylesWithoutTransition, getTransition } from './utils';

import {
  ISidebarProps,
  ISidebarStates,
  IResponsiveWrapper,
  IChildWrapper,
  ICloseOpenButton,
  ISeparatorWrapper,
  IScrollbarProps,
} from './interfaces';


export const Root = styled.div.attrs(({ offsetLeft }: ISidebarStates) => ({
  style: {
    width: `${offsetLeft}px`,
  },
}))<ISidebarProps & ISidebarStates>`
  ${({ theme }) => sidebarTheme(theme, ['rootContainer'])};
  float: ${({ isRTL }) => (isRTL ? 'right' : 'left')};
`;

export const SidebarWrapper = styled.div<ISidebarProps>`
  ${({ theme }) => sidebarTheme(theme, ['sidebarContainer'])};
  flex-direction: ${({ isRTL }) => (isRTL ? 'row-reverse' : 'row')};
  right: ${({ isRTL }) => (isRTL ? 0 : 'none')};
`;

export const NavComponentWrapper = styled.div<ISidebarProps>`
  ${({ theme }) => sidebarTheme(theme, ['navContainer'])}
`;

export const ChildWrapper = styled.div<IChildWrapper>`
  ${({ theme }) => getStylesWithoutTransition(theme, ['childContainer'])};
  ${({ theme, animate }) => getTransition(theme, animate, ['childContainer', 'transition'])};
`;

export const ResponsiveWrapper = styled.div.attrs<IResponsiveWrapper>(({ width }) => ({
  style: {
    width,
  },
}))<IResponsiveWrapper>`
  ${({ theme }) => getStylesWithoutTransition(theme, ['responsiveContainer'])};
  ${({ theme, animate }) => getTransition(theme, animate, ['responsiveContainer', 'transition'])};
  flex-direction: ${({ isRTL }) => (isRTL ? 'row-reverse' : 'row')};
`;

export const CloseOpenButton = styled.button<ISidebarProps & ICloseOpenButton>`
  ${({ theme }) => sidebarTheme(theme, ['closeOpenButton'])};
  
  transform: translateX(-50%) ${({ toRight, isRTL }) => {
    if (isRTL) {
      return toRight ? 'rotateZ(180deg)' : 'rotateZ(-360deg)';
    }

    return toRight ? 'rotateZ(-360deg)' : 'rotateZ(180deg)';
  }};

  &:focus {
    outline: none;
  }
`;

export const SeparatorWrapper = styled.div<ISeparatorWrapper>`
  ${({ theme }) => sidebarTheme(theme, ['separatorContainer'])};

  position: absolute;
  top: 0;
  ${({ isRTL, separatorWidth }) => (isRTL ? `left: -${separatorWidth}px` : `right: -${separatorWidth}px`)};
  width: ${({ separatorWidth }) => `${separatorWidth}px`};
`;

export const Separator = styled.div<ISidebarProps>`
  ${({ theme }) => sidebarTheme(theme, ['separator'])};
  
  position: absolute;
  ${({ isRTL }) => (isRTL ? 'right: 0' : 'left: 0')};
`;

export const AntiSelect = styled.div<ISidebarProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
`;

export const Scrollbar = styled(Scrollbars)
  .attrs<IScrollbarProps>(({ width, animate }) => ({
  style: {
    width,
    transition: animate ? '0.5s' : 'none',
  },
}))<IScrollbarProps>``;
