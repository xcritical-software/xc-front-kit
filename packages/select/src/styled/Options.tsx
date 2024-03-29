import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import {
  FormatOptionLabelContext,
  FormatOptionLabelMeta,
} from 'react-select/dist/declarations/src/Select';

import { IThemeNamespace } from '@xcritical/theme';

import { getPaddingStyles, getCustomStyles } from '../utils';
import {
  IOptionProps,
  IPrefixProps,
  IOptionItem,
  ISelectBaseTheme,
} from '../interfaces';

const LabelPrefixPostfixBase = styled.span<IPrefixProps>`
  direction: inherit;
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

export const LabelPrefix = styled(LabelPrefixPostfixBase)`
margin-${({ isRTL }) => (isRTL ? 'left' : 'right')}: ${({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}) =>
  getCustomStyles(
    theme,
    appearance,
    baseAppearance
  )('labelText', 'prefixSpacing')}px;
`;

export const LabelPostfix = styled(LabelPrefixPostfixBase)`
margin-${({ isRTL }) => (isRTL ? 'right' : 'left')}: ${({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}) =>
  getCustomStyles(
    theme,
    appearance,
    baseAppearance
  )('labelText', 'prefixSpacing')}px;
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
  baseAppearance: string
): CSSProperties => {
  let paddingRight;
  let paddingLeft;

  const padding = getPaddingStyles(
    theme,
    appearance,
    baseAppearance
  )('labelText');

  if (isRTL) {
    paddingRight = padding.paddingRight || 0;
  } else {
    paddingLeft = padding.paddingLeft || 0;
  }

  return {
    paddingLeft,
    paddingRight,
  };
};

const Option: React.FC<IOptionProps> = React.memo<IOptionProps>(
  ({
    classNamePrefix,
    name,
    context,
    prefix,
    postfix,
    children,
    isRTL,
    theme = {},
    appearance = 'default',
    baseAppearance = 'default',
  }) => (
    <div
      style={labelCSS(context)}
      className={classNamePrefix && `${classNamePrefix}__option--${name}`}>
      {!!prefix && (
        <LabelPrefix
          theme={theme}
          appearance={appearance}
          baseAppearance={baseAppearance}
          isRTL={isRTL}>
          {prefix}
        </LabelPrefix>
      )}

      <span
        className={classNamePrefix && `${classNamePrefix}__option-span`}
        style={textCSS(isRTL, theme, appearance, baseAppearance)}>
        {children}
      </span>

      {!!postfix && (
        <LabelPostfix
          className={
            classNamePrefix && `${classNamePrefix}__option-label-postfix`
          }
          theme={theme}
          appearance={appearance}
          baseAppearance={baseAppearance}
          isRTL={isRTL}>
          {postfix}
        </LabelPostfix>
      )}
    </div>
  )
);
export const getFormatOptionLabel =
  (
    classNamePrefix,
    theme: IThemeNamespace<ISelectBaseTheme>,
    appearance: string,
    baseAppearance: string,
    isRTL: boolean
  ): any =>
  (
    { label, value, prefix, postfix }: IOptionItem,
    { context }: FormatOptionLabelMeta<IOptionProps>
  ) =>
    (
      <Option
        classNamePrefix={classNamePrefix}
        theme={theme}
        name={value}
        appearance={appearance}
        baseAppearance={baseAppearance}
        prefix={prefix}
        postfix={postfix}
        context={context}
        isRTL={isRTL}>
        {label}
      </Option>
    );
