import styled from 'styled-components';

import { getModalStyles } from './utils';
import { IModalTheme } from './interfaces';

interface IThemeProps {
  appearance: string;
}

interface IModalContent extends IThemeProps {
  theme: IModalTheme;
  zIndex?: number | undefined;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
}

export const ModalContent = styled.div<IModalContent>`
  ${({ theme, appearance }) => getModalStyles(theme, appearance, ['content'])};
  z-index: ${({ theme, appearance, zIndex }) =>
    zIndex ?? getModalStyles(theme, appearance, ['content', 'zIndex'])};
  max-width: ${({ theme, appearance, maxWidth }) =>
    maxWidth ?? getModalStyles(theme, appearance, ['content', 'maxWidth'])};
  min-width: ${({ theme, appearance, minWidth }) =>
    minWidth ?? getModalStyles(theme, appearance, ['content', 'minWidth'])};
  width: ${({ theme, appearance, width }) =>
    width ?? getModalStyles(theme, appearance, ['content', 'width'])};

  max-height: ${({ theme, appearance, maxHeight }) =>
    maxHeight ?? getModalStyles(theme, appearance, ['content', 'maxHeight'])};
  min-height: ${({ theme, appearance, minHeight }) =>
    minHeight ?? getModalStyles(theme, appearance, ['content', 'minHeight'])};
  height: ${({ theme, appearance, height }) =>
    height ?? getModalStyles(theme, appearance, ['content', 'height'])};
`;

export const ModalHeaderWrapper = styled.div<IThemeProps>`
  ${({ theme, appearance }) =>
    getModalStyles(theme, appearance, ['headerWrapper'])};
`;

export const ModalIconClose = styled.div<IThemeProps>`
  ${({ theme, appearance }) =>
    getModalStyles(theme, appearance, ['iconClose'])};
`;

export const ModalHeader = styled.div<IThemeProps>`
  ${({ theme, appearance }) => getModalStyles(theme, appearance, ['header'])};
`;

export const ModalBody = styled.div<IThemeProps>`
  ${({ theme, appearance }) => getModalStyles(theme, appearance, ['body'])};
`;
