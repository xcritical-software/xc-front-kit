import styled from 'styled-components';

import {
  IDrawerProps,
  IDrawerStates,
  IDrawerWrapperProps,
  IIconWrapperProps,
} from '../interfaces';

import { getElementStyles, getDrawerIconInteractiveStyles } from '../utils';
import { transitionDurationMs, transitionTimingFunction } from '../consts';


export const Wrapper = styled.div.attrs((
  { style, width }: IDrawerWrapperProps & IDrawerStates,
) => ({
  style: {
    ...style,
    width,
  },
}))<IDrawerProps & IDrawerWrapperProps & IDrawerStates>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'drawerWrapper', appearance, baseAppearance)}
  ${({ isRTL }) => (isRTL ? 'right: 0;' : 'left: 0;')}
  display: flex;
  flex-direction: ${({ isRTL }) => (isRTL ? 'row-reverse' : 'row')};
`;

export const Content = styled.div.attrs(({ width }: IDrawerStates) => ({
  style: {
    width,
  },
}))<IDrawerProps & IDrawerStates>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'drawerContent', appearance, baseAppearance)};
  display: ${({ isOpen }): string => (isOpen ? 'block' : 'none')};
  transition: transform ${transitionDurationMs}ms ${transitionTimingFunction}, width ${transitionDurationMs}ms ${transitionTimingFunction};
`;

export const SeparatorWrapper = styled.div<IDrawerProps & IDrawerStates>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'separatorWrapper', appearance, baseAppearance)};
  cursor: ${({ isMovable }) => (isMovable ? 'w-resize' : 'default')};
`;

export const Separator = styled.div<IDrawerProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'separator', appearance, baseAppearance)};
  right: ${({ isRTL }): string => (isRTL ? '-10px' : '0')};
`;

export const AntiSelect = styled.div<IDrawerProps>`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  ${({ isRTL }) => (isRTL ? 'right: 0' : 'left: 0')}
`;

export const IconWrapper = styled.button<IDrawerProps & IIconWrapperProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'iconWrapper', appearance, baseAppearance)}
  ${({
    theme, appearance, baseAppearance, onClick,
  }) => getDrawerIconInteractiveStyles({
    theme, appearance, baseAppearance, onClick,
  })}
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

export * from './transitions';
