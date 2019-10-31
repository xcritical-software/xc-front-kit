import styled, { css } from 'styled-components';

import {
  getBackgroundStyle,
  getColorStyle,
  getPaddingStyle,
  getWidthStyle,
  getHeightStyle,
  getFontStyle,
  getBorderStyle,
  getBorderRadiusStyle,
  getTransitionStyle,
  getInputInteractiveStyles,
  getRootInputInteractiveStyles,
  getPrefixSuffixStyles,
} from '../utils';
import { IInputProps } from '../interfaces';


const styles = css`
  ${getHeightStyle}
  ${getBackgroundStyle}
`;

const rootStyles = css`
  ${getBorderRadiusStyle}
`;

const inputStyles = css`
  ${(props) => getColorStyle(props, 'control')}
  ${(props) => getFontStyle(props, 'control')}
  ${(props) => getHeightStyle(props, 'control')}
  ${(props) => getBackgroundStyle(props, 'control')}
`;

export const Root = styled.div<IInputProps>`
  ${styles}
  ${rootStyles}
  ${getBorderStyle}
  ${getTransitionStyle}
  ${getRootInputInteractiveStyles}
  display: flex;
  flex-direction: ${({ isRTL }) => (isRTL ? 'row-reverse' : 'row')};
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  ${({ css: cssInner }) => (cssInner || null)}
`;

const PrefixSuffixBase = styled.span`
  ${styles}
  ${inputStyles}
  display: flex;
  align-items: center;
  cursor: inherit;
  text-align: center;
`;

export const Prefix = styled(PrefixSuffixBase)`
  ${getPrefixSuffixStyles('prefixSpacing')}
  ${(props) => getWidthStyle(props, 'prefix')}
`;

export const Suffix = styled(PrefixSuffixBase)`
  ${getPrefixSuffixStyles('suffixSpacing')}
  ${(props) => getWidthStyle(props, 'suffix')}
`;

export const StyledInput = styled.input<IInputProps>`
  ${rootStyles}
  ${inputStyles}
  ${(props) => getPaddingStyle(props, 'control')}
  ${(props) => getWidthStyle(props, 'control')}
  ${getInputInteractiveStyles}
  direction: ${({ isRTL }) => (isRTL ? 'rtl' : 'ltr')};
  border: 1px solid transparent;
  box-sizing: border-box;
  outline: 0;
`;
