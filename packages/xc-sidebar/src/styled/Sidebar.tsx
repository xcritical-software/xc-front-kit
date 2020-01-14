import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  getBaseStyle,
  getPropertyStyles,
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
  ${({ theme, appearance, baseAppearance }) => getBaseStyle(theme, appearance, baseAppearance)};
  float: ${({ isRTL }) => (isRTL ? 'right' : 'left')};
`;

export const SidebarWrapper = styled.div<ISidebarProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'sidebarContainer', appearance, baseAppearance)}
  flex-direction: ${({ isRTL }) => (isRTL ? 'row-reverse' : 'row')};
  right: ${({ isRTL }) => (isRTL ? 0 : 'none')};
`;

export const NavComponentWrapper = styled.div<ISidebarProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'navContainer', appearance, baseAppearance)}
`;

export const ChildWrapper = styled.div<IChildWrapper>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'childContainer', appearance, baseAppearance)}
  ${({
    theme, appearance, baseAppearance, animate,
  }) => (animate ? getPropertyStyles(theme, 'transition', appearance, baseAppearance)('childContainer') : null)};
`;

export const ResponsiveWrapper = styled.div<ISidebarProps & IResponsiveWrapper>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'responsiveContainer', appearance, baseAppearance)}
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
    theme, appearance, baseAppearance, animate,
  }) => (animate ? getPropertyStyles(theme, 'transition', appearance, baseAppearance)('scrollbar') : null)};
`;
