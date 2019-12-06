import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  getBaseStyle,
  getWidthStyles,
  getPropertyStyles,
  getBackgroundColorStyles,
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


export const Root = styled.div<ISidebarProps & ISidebarStates>`
  ${({ theme, appearance, baseAppearance }) => getBaseStyle(theme, appearance, baseAppearance)};
  width: ${({ offsetLeft }) => offsetLeft}px;
  float: ${({ isRTL }) => (isRTL ? 'right' : 'left')};
`;

export const SidebarWrapper = styled.div<ISidebarProps>`
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'color', appearance, baseAppearance)('sidebarContainer')};
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'height', appearance, baseAppearance, '100vh')('sidebarContainer')};
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'position', appearance, baseAppearance, 'fixed')('sidebarContainer')};
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'display', appearance, baseAppearance, 'flex')('sidebarContainer')};
  flex-wrap: nowrap;
  flex-direction: ${({ isRTL }) => (isRTL ? 'row-reverse' : 'row')};
  right: ${({ isRTL }) => (isRTL ? 0 : 'none')};
`;

export const NavComponentWrapper = styled.div<ISidebarProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'navContainer', appearance, baseAppearance)}
`;

export const ChildWrapper = styled.div<IChildWrapper>`
  ${({ theme, appearance, baseAppearance }) => getBackgroundColorStyles(theme, appearance, baseAppearance)('childContainer')};
  overflow-y: auto;
  overflow-x: hidden;
  ${({
    theme, appearance, baseAppearance, animate,
  }) => (animate ? getPropertyStyles(theme, 'transition', appearance, baseAppearance)('childContainer') : null)};
`;

export const ResponsiveWrapper = styled.div<ISidebarProps & IResponsiveWrapper>`
  ${({ theme, appearance, baseAppearance }) => getBackgroundColorStyles(theme, appearance, baseAppearance)('responsiveContainer')};
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'display', appearance, baseAppearance, 'flex')('responsiveContainer')};
  flex-wrap: nowrap;
  flex-direction: ${({ isRTL }) => (isRTL ? 'row-reverse' : 'row')};
  ${({
    theme, appearance, baseAppearance, animate,
  }) => (animate ? getPropertyStyles(theme, 'transition', appearance, baseAppearance)('responsiveContainer') : null)};
`;

export const CloseOpenButton = styled.button<ISidebarProps & ICloseOpenButton>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'closeOpenButton', appearance, baseAppearance)}
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
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'separatorContainer', appearance, baseAppearance)}
`;

export const Separator = styled.div<ISidebarProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'separator', appearance, baseAppearance)}
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'color', appearance, baseAppearance)('separator')};
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'right', appearance, baseAppearance)('separator')};
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'height', appearance, baseAppearance)('separator')};
  ${({ theme, appearance, baseAppearance }) => getBackgroundColorStyles(theme, appearance, baseAppearance)('separator')};
  ${({ theme, appearance, baseAppearance }) => getWidthStyles(theme, appearance, baseAppearance)('separator')};
`;

export const AntiSelect = styled.div<ISidebarProps>`
  position: absolute;
  top: 0;
  left: ${({ isRTL }) => (isRTL ? 'none' : '0')};
  right: ${({ isRTL }) => (isRTL ? '0' : 'none')};
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
    theme, appearance, baseAppearance, animate,
  }) => (animate ? getPropertyStyles(theme, 'transition', appearance, baseAppearance)('scrollbar') : null)};
`;
