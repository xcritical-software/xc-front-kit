import {
  getThemedState,
  ITheme,
  IThemeNamespace,
} from '@xcritical/xc-theme';

import {
  sidebarThemeNamespace,
  sidebarThemeStyle,
} from '../theme';


export interface ISidebarTheme extends ITheme {
  leftBackground: string;
  rightBackground: string;
  color?: string;
  separatorColor: string;
  minWidth: number;
  maxWidth: number;
  leftWidth: number;
}

export type IThemeProp<T> = T;

export function sidebarTheme<T>(
  theme: IThemeNamespace,
  propertyPath?: string | undefined,
): ISidebarTheme | IThemeProp<T> {
  const func = getThemedState(sidebarThemeNamespace, sidebarThemeStyle);
  return func(theme, propertyPath) as ISidebarTheme | T;
}
