import styled from 'styled-components';
import { rtlSide } from '@xcritical/theme';

import {
  getPaddingStyle,
  itemTheme,
  getBaseStyle,
  getItemInteractiveStyles,
  getFontSize,
} from '../utils';
import { IPrefixPostfixProps, IContentProps, IRootProps } from '../interfaces';


export const Root = styled.div<IRootProps>`
  ${getPaddingStyle};
  ${getBaseStyle}
  ${getFontSize}
  box-sizing: border-box;
  cursor: pointer;
  display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  border-radius: ${({ theme, appearance, baseAppearance }) => itemTheme(theme, appearance, baseAppearance, 'borderRadius')}px;
  flex: none;
  direction: ${({ isRTL }) => (isRTL ? 'rtl' : 'ltr')};
  ${getItemInteractiveStyles}

  ${({
    theme, appearance, baseAppearance, divided,
  }) => divided
    && `
    border-bottom: solid 1px ${itemTheme(theme, appearance, baseAppearance, ['divided', 'color'])};
  `};
`;


const PrefixPostfixBase = styled.span<IPrefixPostfixProps>`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  direction: inherit;
`;

export const Prefix = styled(PrefixPostfixBase)<IPrefixPostfixProps>`
  margin-${({ isRTL }) => (isRTL ? 'left' : 'right')}: ${({ theme, appearance, baseAppearance }) => itemTheme(theme, appearance, baseAppearance, 'prefixSpacing')}px;
`;

export const Postfix = styled(PrefixPostfixBase)`
  margin-${({ isRTL }) => (isRTL ? 'right' : 'left')}: ${({ theme, appearance, baseAppearance }) => itemTheme(theme, appearance, baseAppearance, 'postfixSpacing')}px;
`;


export const ContentWrapper = styled.span`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0;
  overflow: hidden;

  &:first-child {
    margin: 0;
  }
`;


export const Content = styled.span<IContentProps>`
  display: block;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${({ allowMultiline }) => (allowMultiline ? 'normal' : 'nowrap')};
  text-align: ${({ isRTL, textPosition = 'center' }) => rtlSide(isRTL, textPosition)};
`;
