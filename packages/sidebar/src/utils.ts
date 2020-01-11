import { getThemedState, IThemeNamespace } from '@xcritical/theme';

import { sidebarThemeNamespace, defaultSidebarTheme } from './theme';
import { ISidebarTheme } from './interfaces';


export const sidebarTheme = (
  theme: IThemeNamespace<ISidebarTheme>,
  propertyPath?: string,
): ISidebarTheme => {
  const func = getThemedState(sidebarThemeNamespace, defaultSidebarTheme);
  return func(theme, propertyPath) as ISidebarTheme;
};
