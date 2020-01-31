import styled from 'styled-components';

import { getModalStyles } from './utils';
import { IModalTheme } from './interfaces';


export const ModalContent = styled.div<{ theme: IModalTheme; maxZIndex: number }>`
  ${({ theme }) => getModalStyles(theme, ['content'])};
  z-index: ${({ theme, maxZIndex }) => (maxZIndex ? maxZIndex + 1 : getModalStyles(theme, ['zIndex']))};
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
