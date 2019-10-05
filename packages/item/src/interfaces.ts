import { ITheme } from '@xcritical/theme';



export type ICSSWideKeyword = 'initial' | 'inherit' | 'unset';
export interface IPadding {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
}


export interface IFont {
  weight?: ICSSWideKeyword | 'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

export interface IDivided {
  color: string;
}

export interface IItemTheme {
  padding?: IPadding;
  prefixSpacing?: number;
  postfixSpacing?: number;
  borderRadius?: number;
  outline?: string;
  font?: IFont;
  divided?: IDivided;
  background?: string;
  color?: string;
}

export type ItemTheme = ITheme<IItemTheme>;

export interface IItemProps {
  divided?: boolean;
  children?: any;
  prefix?: any | any[];
  postfix?: any | any[];
  shouldAllowMultiline?: boolean;
  appearance?: string;
  baseAppearance?: string;
  hidden?: boolean;
  isRTL?: boolean;
  disabled?: boolean;
  selected?: boolean;
  value?: any;
  theme: ItemTheme;
  role?: string;
  title?: string;
  textPosition?: string;
  onClick?: any;
}

export interface IItemGroupProps {
  children?: any;
  divided?: boolean;
  appearance?: string;
  baseAppearance?: string;
}


export interface IPrefixPostfixProps {
  theme: ItemTheme;
  appearance: string;
  baseAppearance: string;
  isRTL: boolean;
}

export interface IContentProps {
  allowMultiline: boolean;
  isRTL: boolean;
  textPosition: string;
}

export interface IRootProps extends IItemProps {
  isHidden?: boolean;
  onClick?: any;
  tabIndex?: any;
  appearance: string;
  baseAppearance: string;
}