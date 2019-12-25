import styled from 'styled-components';

import { ICommonProps } from '../interfaces';
import {
  inlineEditTheme,
  getInlineEditStatesStyle,
  getElementStyles,
} from '../utils';


/* Read View components */
export const ReadViewWrapper = styled.div`
  line-height: 1;
`;

export const ReadViewContentWrapper = styled.div<ICommonProps>`
  width: ${({ readViewFitContainerWidth }) => (readViewFitContainerWidth ? '100%' : 'auto')};
  ${({ theme }) => inlineEditTheme(theme)}
  :hover {
    ${({ theme, appearance, baseAppearance }) => getInlineEditStatesStyle('hover')(theme, appearance, baseAppearance)}
  }
`;

export const ContentWrapper = styled.div<ICommonProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'contentWrapper', appearance, baseAppearance)}
`;

export const EditButton = styled.button<ICommonProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'editButton', appearance, baseAppearance)}
`;

/* Action Buttons  */
export const ButtonsWrapper = styled.div<ICommonProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'actionButtonsWrapper', appearance, baseAppearance)}
`;

export const ButtonWrapper = styled.div<ICommonProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'actionButtonWrapper', appearance, baseAppearance)}
`;

export const Button = styled.button<ICommonProps>`
  ${({ theme, appearance, baseAppearance }) => getElementStyles(theme, 'button', appearance, baseAppearance)}
`;
