import { CSSObject } from 'styled-components';

import { ITheme, ICSSProperties } from '@xcritical/theme';

export interface IDrawerTheme {
  transition?: string;
  wrapper?: CSSObject;
  contentWrapper?: CSSObject;
  headerWrapper?: CSSObject;
  titleWrapper?: CSSObject;
  body?: CSSObject;
  separator?: CSSObject;
  antiSelect?: CSSObject;
  closeIconWrapper?: CSSObject;
  blanketWrapper?: CSSObject;
}

export type DrawerTheme = ITheme<IDrawerTheme>;

export interface IReturnFunction<TValue> {
  (
    theme: DrawerTheme,
    elementName: string,
    appearance: string,
    baseAppearance: string
  ): TValue;
}

export interface IStyles {
  [index: string]: string | number | null;
}
