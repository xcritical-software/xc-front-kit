import styled from 'styled-components';

import {
  getBaseStyle,
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
} from '../interfaces';


export const Root = styled.div<ISidebarProps & ISidebarStates>`
  ${({ theme, appearance, baseAppearance }) => getBaseStyle(theme, appearance, baseAppearance)};
  width: ${({ offsetLeft }): number => offsetLeft}px;
`;

export const SidebarWrapper = styled.div<ISidebarProps>`
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'color', appearance, baseAppearance)('sidebarContainer')};
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'height', appearance, baseAppearance)('sidebarContainer')};
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'position', appearance, baseAppearance)('sidebarContainer')};
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'display', appearance, baseAppearance, 'flex')('sidebarContainer')};
  flex-wrap: nowrap;
  flex-direction: ${({ isRTL }): string => (isRTL ? 'row-reverse' : 'row')};
  right: ${({ isRTL }): string | number => (isRTL ? 0 : 'none')};
`;

export const NavComponentWrapper = styled.div<ISidebarProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'navContainer', appearance, baseAppearance)}
`;

export const ChildWrapper = styled.div<IChildWrapper>`
  ${({ theme, appearance, baseAppearance }) => getBackgroundColorStyles(theme, appearance, baseAppearance)('childContainer')};
  overflow-y: auto;
  overflow-x: hidden;
  ${({ animate }): string | null => (animate ? 'transition: .5s' : null)};
`;

export const ResponsiveWrapper = styled.div<ISidebarProps & IResponsiveWrapper>`
  ${({ theme, appearance, baseAppearance }) => getPropertyStyles(theme, 'display', appearance, baseAppearance, 'flex')('responsiveContainer')};
  flex-wrap: nowrap;
  flex-direction: ${({ isRTL }): string => (isRTL ? 'row-reverse' : 'row')};
  ${({ animate }: IResponsiveWrapper): string | null => (animate ? 'transition: .5s' : null)}
`;

export const CloseOpenButton = styled.button<ISidebarProps & ICloseOpenButton>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'closeOpenButton', appearance, baseAppearance)}
  transform: ${({ toRight, isRTL }): string => {
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
  right: ${({ isRTL }): string => (isRTL ? '-10px' : '0')};
`;

export const AntiSelect = styled.div<ISidebarProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'antiSelect', appearance, baseAppearance)}
`;
