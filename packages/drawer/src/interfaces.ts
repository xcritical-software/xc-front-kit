import { ITheme, ICSSProperties } from '@xcritical/theme';

export interface IDrawerTheme extends ICSSProperties {
  borderRadius?: number;
  outline?: string;
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
