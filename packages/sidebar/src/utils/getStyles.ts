import memoizee from 'micro-memoize';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import {
  getThemedState,
  IThemeNamespace,
} from '@xcritical/theme';

import {
  sidebarThemeNamespace,
  sidebarThemeStyle,
} from '../theme';

import {
  SidebarTheme,
  IReturnFunctionForElementStyles,
  IReturnFunctionForConcreteProp,
} from '../interfaces';


export function sidebarTheme(
  theme: IThemeNamespace,
  propertyPath?: string | undefined,
): SidebarTheme {
  const func = getThemedState(sidebarThemeNamespace, sidebarThemeStyle);
  return func(theme, propertyPath);
}

export const getBaseStyle: IReturnFunctionForConcreteProp<FlattenSimpleInterpolation> = memoizee((
  theme,
) => {
  const background = sidebarTheme(theme, 'background');
  const color = sidebarTheme(theme, 'color');
  const zIndex = sidebarTheme(theme, 'zIndex');

  return css`
    background: ${background};
    color: ${color};
    z-index: ${zIndex};
    height: 100%;
    min-height: 100vh;
  `;
});

export const getElementStyles: IReturnFunctionForElementStyles<any> = memoizee((
  theme,
  elementName,
) => {
  const styles = sidebarTheme(theme, elementName);

  return styles;
});
