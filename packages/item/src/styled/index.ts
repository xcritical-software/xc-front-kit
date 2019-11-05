import styled from 'styled-components';
import { rtlSide } from '@xcritical/theme';

import {
  getPaddingStyle,
  itemTheme,
  getBaseStyle,
  getItemInteractiveStyles,
} from '../utils';
import { IPrefixPostfixProps, IContentProps, IRootProps } from '../interfaces';


export const Root = styled.div<IRootProps>`
  ${getPaddingStyle};
  ${getBaseStyle}
  box-sizing: border-box;
  cursor: pointer;
  display: ${({ isHidden }): string => (isHidden ? 'none' : 'flex')};
  border-radius: ${({ theme, appearance, baseAppearance }): string => itemTheme(theme, appearance, baseAppearance, 'borderRadius')}px;
  flex: none;
  direction: ${({ isRTL }): string => (isRTL ? 'rtl' : 'ltr')};
  ${getItemInteractiveStyles}

  ${({
    theme, appearance, baseAppearance, divided,
  }): any => divided
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
  margin-${({ isRTL }): string => (isRTL ? 'left' : 'right')}: ${({ theme, appearance, baseAppearance }): string => itemTheme(theme, appearance, baseAppearance, 'prefixSpacing')}px;
`;

export const Postfix = styled(PrefixPostfixBase)`
  margin-${({ isRTL }): string => (isRTL ? 'right' : 'left')}: ${({ theme, appearance, baseAppearance }): string => itemTheme(theme, appearance, baseAppearance, 'postfixSpacing')}px;
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
  white-space: ${({ allowMultiline }): string => (allowMultiline ? 'normal' : 'nowrap')};
  text-align: ${({ isRTL, textPosition = 'center' }): string => rtlSide(isRTL, textPosition)};
`;
