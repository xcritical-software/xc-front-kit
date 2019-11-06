import React, { CSSProperties } from 'react';
import { IThemeNamespace } from '@xcritical/theme';
import styled from 'styled-components';
import { FormatOptionLabelContext, FormatOptionLabelMeta } from 'react-select/src/Select';
import { getPaddingStyles, getCustomStyles } from '../utils';
import {
  IOptionProps, IPrefixProps, IOptionItem, ISelectBaseTheme,
} from '../interfaces';


const LabelPrefixPostfixBase = styled.span<IPrefixProps>`
direction: inherit;
align-items: center;
display: flex;
flex-shrink: 0;
`;


export const LabelPrefix = styled(LabelPrefixPostfixBase)`
margin-${({ isRTL }) => (isRTL ? 'left' : 'right')}: ${(
  { theme, appearance = 'default', baseAppearance = 'default' },
) => getCustomStyles(theme, appearance, baseAppearance)('labelText', 'prefixSpacing')}px;
`;

export const LabelPostfix = styled(LabelPrefixPostfixBase)`
margin-${({ isRTL }) => (isRTL ? 'right' : 'left')}: ${(
  { theme, appearance = 'default', baseAppearance = 'default' },
) => getCustomStyles(theme, appearance, baseAppearance)('labelText', 'prefixSpacing')}px;
`;


const labelCSS = (context: FormatOptionLabelContext): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  top: context === 'value' ? '1px' : '0',
});

const textCSS = (
  isRTL: boolean,
  theme: IThemeNamespace<ISelectBaseTheme>,
  appearance: string,
  baseAppearance: string,
): CSSProperties => {
  let paddingRight;
  let paddingLeft;

  const padding = getPaddingStyles(theme, appearance, baseAppearance)('labelText');

  if (isRTL) {
    paddingRight = (padding && padding.paddingRight) || 0;
  } else {
    paddingLeft = (padding && padding.paddingLeft) || 0;
  }

  return {
    paddingLeft,
    paddingRight,
  };
};

const Option: React.FC<IOptionProps> = React.memo<IOptionProps>(({
  context,
  prefix,
  postfix,
  children,
  isRTL,
  theme = {},
  appearance = 'default',
  baseAppearance = 'default',
}) => (
  <div style={ labelCSS(context) }>
    { !!prefix && (
      <LabelPrefix
        theme={ theme }
        appearance={ appearance }
        baseAppearance={ baseAppearance }
        isRTL={ isRTL }
      >
        { prefix }
      </LabelPrefix>
    ) }

    <span style={ textCSS(isRTL, theme, appearance, baseAppearance) }>{ children }</span>

    { !!postfix && (
      <LabelPostfix
        theme={ theme }
        appearance={ appearance }
        baseAppearance={ baseAppearance }
        isRTL={ isRTL }
      >
        { postfix }
      </LabelPostfix>
    ) }
  </div>
));

export const getFormatOptionLabel = (
  theme: IThemeNamespace<ISelectBaseTheme>,
  appearance: string,
  baseAppearance: string,
  isRTL: boolean,
): any => (
  opt: IOptionItem,
  { context }: FormatOptionLabelMeta<IOptionProps>,
) => (
  <Option
    theme={ theme }
    appearance={ appearance }
    baseAppearance={ baseAppearance }
    prefix={ opt.prefix }
    postfix={ opt.postfix }
    context={ context }
    isRTL={ isRTL }
  >
    { opt.label }
  </Option>
);
