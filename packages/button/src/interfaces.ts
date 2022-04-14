import React from 'react';
import { CSSObject } from 'styled-components';

import {
  ITheme,
  IThemeNamespace,
  ICSSProperties,
  IThemeBase,
} from '@xcritical/theme';

/* BUTTON */
export type ButtonTags = 'button' | 'span' | 'a';
export type ICSSWideKeyword = 'initial' | 'inherit' | 'unset';

export interface IBaseButtonTheme extends ICSSProperties {
  prefixSpacing?: number;
  postfixSpacing?: number;
  boxShadowColor?: string;
  buttonContentWrapper?: IThemeBase<ICSSProperties>;
  buttonContent?: IThemeBase<ICSSProperties>;
  _outline?: ICSSProperties;
}

export type ButtonTheme = ITheme<IBaseButtonTheme>;

export interface IButtonAppearanceProps {
  theme?: IThemeNamespace<ButtonTheme>;
  appearance?: string;
  baseAppearance?: string;
}

export interface IInnerComponentAppearanceProps {
  theme: IThemeNamespace<ButtonTheme>;
  appearance: string;
  baseAppearance: string;
}

export interface IIsRTL {
  isRTL?: boolean;
}

export interface IPrefixProps extends IInnerComponentAppearanceProps, IIsRTL {}

export interface IContentProps extends IIsRTL, IInnerComponentAppearanceProps {
  textPosition?: string;
}

export interface IShouldFitContent {
  shouldFitContent?: boolean;
}

export interface ISpacing {
  spacing?: 'compact' | 'default' | 'none';
}

export interface IOnlyButtonProps {
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  shouldAllowMultiline?: boolean;
  ghost?: boolean;
  href?: string;
  selected?: boolean;
  textPosition?: string;
  height?: string;
  component?: React.ElementType;
}

export interface IButtonProps
  extends IButtonAppearanceProps,
    IIsRTL,
    ISpacing,
    IShouldFitContent,
    IOnlyButtonProps {
  [key: string]: any;
}

export interface IStyledButtonProps extends IButtonProps {
  baseAppearance: string;
  appearance: string;
  spacing: 'compact' | 'default' | 'none';
  ghost: boolean;
  shouldFitContent: boolean;
}

/* BUTTON GROUP */
// TODO ITheme unnecessary here but without it getButtonGroupStyles throw linter error.
export type ButtonGroupTheme = ITheme<CSSObject>;

export interface IButtonGroup {
  theme?: IThemeNamespace<ButtonGroupTheme>;
  className?: string;
}
