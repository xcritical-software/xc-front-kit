import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  sidebarTheme,
  getBaseStyle,
  getElementStyles,
} from '../utils';
import {
  ISidebarProps,
  ISidebarStates,
  IResponsiveWrapper,
  IChildWrapper,
  ICloseOpenButton,
  IScrollbarProps,
} from '../interfaces';


export const Root = styled.div.attrs(({ offsetLeft }: ISidebarStates) => ({
  style: {
    width: `${offsetLeft}px`,
  },
}))<ISidebarProps & ISidebarStates>`
  ${({ theme }) => getBaseStyle(theme)};
  float: ${({ isRTL }) => (isRTL ? 'right' : 'left')};
`;

export const SidebarWrapper = styled.div<ISidebarProps>`
  ${({ theme }) => getElementStyles(theme, 'sidebarContainer')}
  flex-direction: ${({ isRTL }) => (isRTL ? 'row-reverse' : 'row')};
  right: ${({ isRTL }) => (isRTL ? 0 : 'none')};
`;

export const NavComponentWrapper = styled.div<ISidebarProps>`
  ${({ theme }) => getElementStyles(theme, 'navContainer')}
`;

export const ChildWrapper = styled.div<IChildWrapper>`
  ${({ theme }) => getElementStyles(theme, 'childContainer')}
  ${({
    theme, animate,
  }) => (animate ? sidebarTheme(theme, 'childContainer').transition : null)};
`;

export const ResponsiveWrapper = styled.div<ISidebarProps & IResponsiveWrapper>`
  ${({ theme }) => getElementStyles(theme, 'responsiveContainer')}
  flex-direction: ${({ isRTL }) => (isRTL ? 'row-reverse' : 'row')};
  ${({
    theme, animate,
  }) => (animate ? sidebarTheme(theme, 'responsiveContainer').transition : null)};
`;

export const CloseOpenButton = styled.button<ISidebarProps & ICloseOpenButton>`
  ${({ theme }) => getElementStyles(theme, 'closeOpenButton')}
  transform: ${({ toRight, isRTL }) => {
    if (isRTL) {
      return toRight ? 'rotateZ(180deg)' : 'rotateZ(-360deg)';
    }

    return toRight ? 'rotateZ(-360deg)' : 'rotateZ(180deg)';
  }};
  transition-timing-function: 'linear';
  &:focus {
    outline: none;
  }
`;

export const SeparatorWrapper = styled.div<ISidebarProps>`
  ${({ theme }) => getElementStyles(theme, 'separatorContainer')}
`;

export const Separator = styled.div<ISidebarProps>`
  ${({ theme }) => getElementStyles(theme, 'separator')}
`;

export const AntiSelect = styled.div<ISidebarProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
`;

export const Scrollbar = styled(Scrollbars).attrs(({ width, marginLeft }: IScrollbarProps) => ({
  style: {
    width,
    marginLeft,
  },
}))<ISidebarProps & IResponsiveWrapper & IScrollbarProps>`
  ${({
    theme, animate,
  }) => (animate ? sidebarTheme(theme, 'scrollbar').transition : null)};
`;
