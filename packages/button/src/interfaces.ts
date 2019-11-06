import {
  ITheme, IThemeNamespace, ICSSProperties,
} from '@xcritical/theme';
// eslint-disable-next-line import/no-unresolved
import {
  FlattenInterpolation, ThemedStyledProps,
} from 'styled-components';


export type ICSSWideKeyword = 'initial' | 'inherit' | 'unset';

export interface IBaseButtonTheme extends ICSSProperties {
  prefixSpacing?: number;
  postfixSpacing?: number;
  boxShadowColor?: string;
  _outline?: ICSSProperties;
}

export type ButtonTheme = ITheme<IBaseButtonTheme>;

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
