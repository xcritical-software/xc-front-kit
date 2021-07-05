import styled from 'styled-components';

import { rtlSide } from '@xcritical/theme';

import {
  itemAppearanceTheme,
  getBaseStyle,
  getItemInteractiveStyles,
} from '../utils';
import {
  IPrefixPostfixProps,
  IContentWrapperProps,
  IRootProps,
  IWrapperProps,
} from '../interfaces';

export const Root = styled.div<IRootProps>`
  ${getBaseStyle}
  box-sizing: border-box;
  display: ${({ isHidden }): string => (isHidden ? 'none' : 'flex')};
  border-radius: ${({ theme, appearance, baseAppearance }): string =>
    itemAppearanceTheme(theme, appearance, baseAppearance, 'borderRadius')}px;
  flex: none;
  direction: ${({ isRTL }): string => (isRTL ? 'rtl' : 'ltr')};
  ${getItemInteractiveStyles}

  ${({ theme, appearance, baseAppearance, divided }): any =>
    divided &&
    `
    border-bottom: solid 1px ${itemAppearanceTheme(
      theme,
      appearance,
      baseAppearance,
      ['divided', 'color']
    )};
  `};
`;

const PrefixPostfixBase = styled.span<IPrefixPostfixProps>`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  direction: inherit;
`;

export const Prefix = styled(PrefixPostfixBase)<IPrefixPostfixProps>`
  margin-${({ isRTL }): string => (isRTL ? 'left' : 'right')}: ${({
  theme,
  appearance,
  baseAppearance,
}): string =>
  itemAppearanceTheme(theme, appearance, baseAppearance, 'prefixSpacing')}px;
`;

export const Postfix = styled(PrefixPostfixBase)`
  margin-${({ isRTL }): string => (isRTL ? 'right' : 'left')}: ${({
  theme,
  appearance,
  baseAppearance,
}): string =>
  itemAppearanceTheme(theme, appearance, baseAppearance, 'postfixSpacing')}px;
`;

export const Wrapper = styled.span<IWrapperProps>`
  ${({ theme, appearance, baseAppearance }) =>
    itemAppearanceTheme(theme, appearance, baseAppearance, 'wrapper')};
`;

export const ContentWrapper = styled.span<IContentWrapperProps>`
  white-space: ${({ allowMultiline }): string =>
    allowMultiline ? 'normal' : 'nowrap'};
  text-align: ${({ isRTL, textPosition = 'center' }): string =>
    rtlSide(isRTL, textPosition)};
  ${({ theme, appearance, baseAppearance }) =>
    itemAppearanceTheme(theme, appearance, baseAppearance, 'contentWrapper')};
`;
