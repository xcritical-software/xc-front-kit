import {
  getThemedState,
  IThemeNamespace,
} from '@xcritical/theme';

import {
  sidebarThemeNamespace,
  sidebarThemeStyle,
} from '../theme';

import { SidebarTheme } from '../interfaces';


export function sidebarTheme(
  theme: IThemeNamespace,
  propertyPath?: string | string[] | undefined,
): SidebarTheme {
  const func = getThemedState(sidebarThemeNamespace, sidebarThemeStyle);
  return func(theme, propertyPath);
}
