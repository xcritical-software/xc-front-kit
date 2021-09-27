import styled from 'styled-components';

import { getElementStyles } from './utils';

export interface IThemeProps {
  appearance: string;
  baseAppearance: string;
}

interface IWrapperProps extends IThemeProps {
  width: number;
  animate: boolean;
  isRTL: boolean;
  transition: string;
}
export const Wrapper = styled.div.attrs(
  ({ width, transition }: IWrapperProps) => ({
    style: {
      width: `${width}px`,
      transition,
    },
  })
)<IWrapperProps>`
  flex-direction: ${({ isRTL }) => (isRTL ? 'row-reverse' : 'row')};
  left: ${({ isRTL, width }) => (isRTL ? `calc(100vw - ${width}px)` : '0px')};
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'wrapper', appearance, baseAppearance)};
`;

interface IContentProps extends IThemeProps {
  width: number;
  animate: boolean;
  transition: string;
}
export const Content = styled.div.attrs(
  ({ width, transition }: IContentProps) => ({
    style: {
      width: `${width}px`,
      transition,
    },
  })
)<IContentProps>`
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'contentWrapper', appearance, baseAppearance)}
`;

interface ISeparatorProps extends IThemeProps {
  isMovable: boolean;
}
export const Separator = styled.div<ISeparatorProps>`
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

interface ICloseIconWrapperProps extends IThemeProps {}

export const CloseIconWrapper = styled.button<ICloseIconWrapperProps>`
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'closeIconWrapper', appearance, baseAppearance)}
`;

interface IBlanketWrapperProps extends IThemeProps {
  visible: boolean;
  transition: string;
}
export const BlanketWrapper = styled.div.attrs(
  ({ transition }: IBlanketWrapperProps) => ({
    style: {
      transition,
    },
  })
)<IBlanketWrapperProps>`
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  ${({ theme, appearance, baseAppearance }) =>
    getElementStyles(theme, 'blanketWrapper', appearance, baseAppearance)}
`;
