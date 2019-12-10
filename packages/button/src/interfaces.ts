import React from 'react';
import { ITheme, IThemeNamespace, ICSSProperties } from '@xcritical/theme';


export type ButtonTags= 'button' | 'span' | 'a';
export type ICSSWideKeyword = 'initial' | 'inherit' | 'unset';

export interface IBaseButtonTheme extends ICSSProperties {
  prefixSpacing?: number;
  postfixSpacing?: number;
  boxShadowColor?: string;
  _outline?: ICSSProperties;
}

export type ButtonTheme = ITheme<IBaseButtonTheme>;

export interface IButtonAppearanceProps {
  theme?: IThemeNamespace<ButtonTheme>;
  appearance?: string;
  baseAppearance?: string;
}

export interface IIsRTL {
  isRTL?: boolean;
}

export interface IPrefixProps extends IButtonAppearanceProps, IIsRTL {}

export interface IContentProps extends IIsRTL {
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
  outline?: boolean;
  href?: string;
  selected?: boolean;
  textPosition?: string;
  height?: string;
  component?: React.ElementType;
}

export interface IButtonProps extends
  IButtonAppearanceProps,
  IIsRTL,
  ISpacing,
  IShouldFitContent,
  IOnlyButtonProps {
  [key: string]: any;
}
