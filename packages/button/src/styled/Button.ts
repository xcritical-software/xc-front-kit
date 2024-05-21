import styled, { css } from 'styled-components';

import { rtlSide } from '@xcritical/theme';

import {
  buttonAppearanceTheme,
  getButtonStyles,
  getItemInteractiveStyles,
} from '../utils';
import { IPrefixProps, IStyledButtonProps, IContentProps } from '../interfaces';

const style = css<IStyledButtonProps>`
  ${({ theme, baseAppearance, appearance, spacing, ghost, shouldFitContent }) =>
    getButtonStyles(
      theme,
      baseAppearance,
      appearance,
      spacing,
      ghost,
      shouldFitContent
    )};
  ${({ disabled, selected }) => getItemInteractiveStyles(disabled, selected)};
  ${({ height }) => (height ? `height: ${height}` : null)}
  ${({ css: cssInner }) => cssInner || null}
  direction: ${({ isRTL }) => (isRTL ? 'rtl' : 'ltr')};
`;

export const StyledButton = styled.div<IStyledButtonProps>`
  align-items: center;
  box-sizing: border-box;
  display: inline-flex;
  font-size: inherit;
  font-style: normal;
  font-weight: normal;
  max-width: 100%;
  outline: none !important;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  border: 1px solid transparent;
  ${style}
`;

const PrefixPostfixBase = styled.span<IPrefixProps>`
  direction: inherit;
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

export const Prefix = styled(PrefixPostfixBase)`
  margin-${({ isRTL }) => (isRTL ? 'left' : 'right')}: ${({
  theme,
  appearance,
  baseAppearance,
}) =>
  buttonAppearanceTheme(theme, appearance, baseAppearance, 'prefixSpacing')}px;
`;

export const Postfix = styled(PrefixPostfixBase)`
  margin-${({ isRTL }) => (isRTL ? 'right' : 'left')}: ${({
  theme,
  appearance,
  baseAppearance,
}) =>
  buttonAppearanceTheme(theme, appearance, baseAppearance, 'postfixSpacing')}px;
`;

export const ContentWrapper = styled.span<IContentProps>`
  direction: inherit;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0;
  overflow: hidden;

  &:first-child {
    margin: 0;
  }

  ${({ theme, appearance, baseAppearance }) =>
    buttonAppearanceTheme(
      theme,
      appearance,
      baseAppearance,
      'buttonContentWrapper'
    )}
`;

export const Content = styled.span<IContentProps>`
  direction: inherit;
  display: block;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: ${({ isRTL, textPosition = 'center' }) =>
    rtlSide(isRTL ?? false, textPosition)};
  ${({ theme, appearance, baseAppearance }) =>
    buttonAppearanceTheme(theme, appearance, baseAppearance, 'buttonContent')}
`;
