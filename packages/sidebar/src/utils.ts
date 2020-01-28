import { getThemedState } from '@xcritical/theme';
import { CSSObject } from 'styled-components';

import { sidebarThemeNamespace, defaultSidebarTheme } from './theme';
import { SidebarTheme } from './interfaces';


export function sidebarTheme(
  theme: SidebarTheme,
  propertyPath?: string | string[],
): CSSObject {
  const func = getThemedState(sidebarThemeNamespace, defaultSidebarTheme);
  return func(theme, propertyPath);
}

export function getStylesWithoutTransition(
  theme: SidebarTheme,
  propertyPath?: string | string[],
): CSSObject {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { transition, ...styles } = sidebarTheme(theme, propertyPath);

  return styles;
}

export function getTransition(
  theme: SidebarTheme,
  animate: boolean,
  propertyPath?: string | string[],
): string | null {
  return animate ? `transition: ${sidebarTheme(theme, propertyPath)}` : null;
}
