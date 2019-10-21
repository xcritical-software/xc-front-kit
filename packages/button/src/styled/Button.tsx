import styled, { css } from 'styled-components';
import { rtlSide } from '@xcritical/theme';

import {
  getPaddingStyle,
  buttonTheme,
  getButtonStyles,
  getItemInteractiveStyles,
  getFontSize,
} from '../utils';
import { IPrefixProps, IButtonProps, IContentProps } from '../interfaces';


const style = css<IButtonProps>`  
${getButtonStyles};
${getPaddingStyle};  
${getFontSize}
${getItemInteractiveStyles}
${({ height }) => (height ? `height: ${height}` : null)}
${({ css: cssInner }) => (cssInner || null)}
direction: ${({ isRTL }) => (isRTL ? 'rtl' : 'ltr')};
`;

export const Root = (tag: string) => styled[tag]`
  ${style}
`;

const PrefixPostfixBase = styled.span<IPrefixProps>`
  direction: inherit;
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

export const Prefix = styled(PrefixPostfixBase)`
  margin-${({ isRTL }) => (isRTL ? 'left' : 'right')}: ${({ theme, appearance = 'default', baseAppearance = 'default' }) => buttonTheme(theme, appearance, baseAppearance, 'prefixSpacing')}px;
`;

export const Postfix = styled(PrefixPostfixBase)`
  margin-${({ isRTL }) => (isRTL ? 'right' : 'left')}: ${(
  { theme, appearance = 'default', baseAppearance = 'default' },
) => buttonTheme(theme, appearance, baseAppearance, 'postfixSpacing')}px;
`;

export const ContentWrapper = styled.span`
  direction: inherit;
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
  direction: inherit;
  display: block;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: 'nowrap';
  text-align: ${({ isRTL, textPosition = 'center' }) => rtlSide(isRTL || false, textPosition)};
`;
