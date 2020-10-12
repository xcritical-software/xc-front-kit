import styled from 'styled-components';

import { getModalStyles } from './utils';
import { IModalTheme } from './interfaces';


interface IModalContent {
  theme: IModalTheme;
  zIndex?: number | undefined;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
}

export const ModalContent = styled.div<IModalContent>`
  ${({ theme }) => getModalStyles(theme, ['content'])};
  z-index: ${({ theme, zIndex }) => (zIndex ?? getModalStyles(theme, ['zIndex']))};
  max-width: ${({ theme, maxWidth }) => (maxWidth ?? getModalStyles(theme, ['maxWidth']))};
  min-width: ${({ theme, minWidth }) => (minWidth ?? getModalStyles(theme, ['minWidth']))};
  width: ${({ theme, width }) => (width ?? getModalStyles(theme, ['width']))};
`;

export const ModalHeaderWrapper = styled.div`
  ${({ theme }) => getModalStyles(theme, ['headerWrapper'])};
`;

export const ModalIconClose = styled.div`
  ${({ theme }) => getModalStyles(theme, ['iconClose'])};
`;

export const ModalHeader = styled.div`
  ${({ theme }) => getModalStyles(theme, ['header'])};
`;

export const ModalBody = styled.div`
  ${({ theme }) => getModalStyles(theme, ['body'])};
`;
