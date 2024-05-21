import styled from 'styled-components';

import { getElementStyles } from './utils';

export interface IThemeProps {
  appearance: string;
  baseAppearance: string;
}

interface IWrapperProps extends IThemeProps {
  width: number;
  isRTL: boolean;
  transition: string;
}
export const Wrapper = styled.div.attrs<IWrapperProps>(
  ({ width, transition }) => ({
    style: {
      width: `${width}px`,
      transition,
    },
  })
)`
  flex-direction: ${({ isRTL }) => (isRTL ? 'row-reverse' : 'row')};
  ${({ isRTL }) => (isRTL ? 'right: 0px' : 'left: 0px')};
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'wrapper', appearance, baseAppearance)};
`;

export const Content = styled.div<IThemeProps>`
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'contentWrapper', appearance, baseAppearance)};
`;

export const HeaderWrapper = styled.div<IThemeProps>`
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'headerWrapper', appearance, baseAppearance)}
`;

export const TitleWrapper = styled.div<IThemeProps>`
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'titleWrapper', appearance, baseAppearance)}
`;

export const Body = styled.div<IThemeProps>`
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'body', appearance, baseAppearance)}
`;

interface ISeparatorProps extends IThemeProps {
  isMovable: boolean;
  isRTL: boolean;
}
export const Separator = styled.div<ISeparatorProps>`
  ${({ isRTL }) => (isRTL ? 'left: 0' : 'right: 0')};
  cursor: ${({ isMovable }) => (isMovable ? 'w-resize' : 'default')};
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'separator', appearance, baseAppearance)}
`;

interface IAntiSelectProps extends IThemeProps {
  isRTL: boolean;
}
export const AntiSelect = styled.div<IAntiSelectProps>`
  ${({ isRTL }) => (isRTL ? 'right: 0' : 'left: 0')};
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'antiSelect', appearance, baseAppearance)}
`;

export const CloseIconWrapper = styled.button<IThemeProps>`
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'closeIconWrapper', appearance, baseAppearance)}
`;

interface IBlanketWrapperProps extends IThemeProps {
  visible: boolean;
  transition: string;
}
export const BlanketWrapper = styled.div.attrs<IBlanketWrapperProps>(
  ({ transition }) => ({
    style: {
      transition,
    },
  })
)`
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'blanketWrapper', appearance, baseAppearance)}
`;
