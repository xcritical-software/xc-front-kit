import { ITheme, IThemeNamespace, IIndents } from '@xcritical/theme';
import {
  FlattenInterpolation, ThemedStyledProps,
} from 'styled-components';


export type ICSSWideKeyword = 'initial' | 'inherit' | 'unset';

export interface IFont {
  weight?: ICSSWideKeyword | 'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  size?: number;
}

export interface IButtonTheme {
  padding?: IIndents;
  prefixSpacing?: number;
  postfixSpacing?: number;
  borderRadius?: number;
  borderColor?: string;
  font?: IFont;
  background?: string;
  color?: string;
  fontWeight?: number;
  boxShadowColor?: string;

  outline?: IButtonTheme;
  selected?: IButtonTheme;
  active?: IButtonTheme;
  hover?: IButtonTheme;
  disabled?: IButtonTheme;
}

export type ButtonTheme = ITheme<IButtonTheme>;

export interface IButtonApperanceProps {
  theme?: IThemeNamespace<ButtonTheme>;
  appearance?: string;
  baseAppearance?: string;
}

export interface IIsRTL {
  isRTL?: boolean;
}

export interface IPrefixProps extends IButtonApperanceProps, IIsRTL {
}

export interface IContentProps extends IIsRTL {
  textPosition?: string;
}

export interface IShouldFitContent {
  shouldFitContent?: boolean;
}

export interface ISpacing {
  spacing?: 'compact' | 'default' | 'none';
}

type HtmlAttributes = Pick<React.AllHTMLAttributes<HTMLElement>,
Exclude<keyof React.AllHTMLAttributes<HTMLElement>, keyof IOnlyButtonProps | 'css'>
> & { css?: FlattenInterpolation<ThemedStyledProps<IButtonProps, any>> };

export interface IOnlyButtonProps {
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  shouldAllowMultiline?: boolean;
  outline?: boolean;
  href?: string;
  selected?: boolean;
  textPosition?: string;
  height?: string;
  component?: React.ReactNode;
}

export interface IButtonProps
  extends HtmlAttributes,
  IButtonApperanceProps,
  IIsRTL,
  ISpacing,
  IShouldFitContent,
  IOnlyButtonProps {

}
