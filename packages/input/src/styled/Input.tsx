import styled, { css } from 'styled-components';

import {
  getComponentStyle,
  inputApperanceTheme,
  getInputInteractiveStyles,
  getCloseIconInteractiveStyles,
  getRootInputStyles,
  getRootInputInteractiveStyles,
} from '../utils';
import { ISubComponentProps, IStyledInput } from '../interfaces';


const inputStyles = css<ISubComponentProps>`
  ${({ theme, appearance, baseAppearance }) => getComponentStyle(theme, appearance, baseAppearance, 'control')}
`;

export const Root = styled.div<ISubComponentProps>`
  display: inline-flex;
  flex-direction: ${({ isRTL }) => (isRTL ? 'row-reverse' : 'row')};
  flex-wrap: nowrap;
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-start;
  width: ${({ shouldFitContainer }) => (shouldFitContainer ? '100%' : 'auto')};
  ${getRootInputStyles}
  ${getRootInputInteractiveStyles}
  ${({ css: cssInner }: any) => (cssInner || null)}
`;

const PrefixSuffixBase = styled.span<ISubComponentProps>`
  ${inputStyles}
  direction: inherit;
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

export const Prefix = styled(PrefixSuffixBase)`
  margin-${({ isRTL }) => (isRTL ? 'left' : 'right')}: ${({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}) => inputApperanceTheme(theme, appearance, baseAppearance, 'prefixSpacing')}px;
`;

export const Postfix = styled(PrefixSuffixBase)`
  margin-${({ isRTL }) => (isRTL ? 'right' : 'left')}: ${(
  { theme, appearance = 'default', baseAppearance = 'default' },
) => inputApperanceTheme(theme, appearance, baseAppearance, 'postfixSpacing')}px;
`;

export const StyledInput = styled.input<IStyledInput>`
  direction: ${({ isRTL }) => (isRTL ? 'rtl' : 'ltr')};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  outline: 0;
  padding: 0;
  margin: 0;
  ${({ theme, appearance, baseAppearance }) => getComponentStyle(theme, appearance, baseAppearance, 'input')}
  ${getInputInteractiveStyles}
`;


export const ClearIconWrapper = styled.div<ISubComponentProps>`
  ${({
    theme,
    appearance,
    baseAppearance,
  }) => getComponentStyle(theme, appearance, baseAppearance, 'clearWrapper')}
  ${getCloseIconInteractiveStyles}
`;
