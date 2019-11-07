import { ITheme, ICSSProperties } from '@xcritical/theme';


export interface IDivided {
  color: string;
}

export interface IItemTheme extends ICSSProperties {
  prefixSpacing?: number;
  postfixSpacing?: number;
  borderRadius?: number;
  outline?: string;
  divided?: IDivided;
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
