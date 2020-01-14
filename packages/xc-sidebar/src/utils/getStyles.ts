import memoizee from 'micro-memoize';
import get from 'lodash.get';
import { css, FlattenSimpleInterpolation, FlattenInterpolation } from 'styled-components';

import {
  getThemedState,
  getAppearanceTheme,
  IThemeNamespace,
  AllType,
} from '@xcritical/theme';

import {
  sidebarThemeNamespace,
  sidebarThemeStyle,
} from '../theme';

import {
  SidebarTheme,
  IReturnFunctionForElementStyles,
  IReturnFunctionForConcreteProp,
  GetPropStyles,
} from '../interfaces';


export function sidebarTheme(
  theme: IThemeNamespace,
  propertyPath?: string | undefined,
): SidebarTheme {
  const func = getThemedState(sidebarThemeNamespace, sidebarThemeStyle);
  return func(theme, propertyPath);
}

export const sidebarAppearanceTheme = (
  theme: SidebarTheme,
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): AllType => {
  const func = getAppearanceTheme(sidebarThemeNamespace, sidebarThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
};

export const getBaseStyle: IReturnFunctionForConcreteProp<FlattenSimpleInterpolation> = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  const background = sidebarAppearanceTheme(theme, appearance, baseAppearance, 'background');
  const color = sidebarAppearanceTheme(theme, appearance, baseAppearance, 'color');
  const zIndex = sidebarAppearanceTheme(theme, appearance, baseAppearance, 'zIndex');

  return css`
    background: ${background};
    color: ${color};
    z-index: ${zIndex};
    height: 100%;
    min-height: 100vh;
  `;
});

export const getPropertyStyles: GetPropStyles<FlattenInterpolation<any>> = memoizee((
  theme,
  propertyPath,
  appearance = 'default',
  baseAppearance = 'default',
  defaultPropertyValue = 'inherit',
) => {
  let property = sidebarAppearanceTheme(theme, appearance, baseAppearance, [propertyPath]);

  if (!property) {
    property = defaultPropertyValue;
  }

  return memoizee((
    elementName,
  ) => {
    const element = sidebarAppearanceTheme(theme, appearance, baseAppearance, elementName);

    return css`
      ${() => `${propertyPath}: ${get(element, [propertyPath], property)}`};
    `;
  });
});

export const getElementStyles: IReturnFunctionForElementStyles<any> = memoizee((
  theme,
  elementName,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  const styles = sidebarAppearanceTheme(theme, appearance, baseAppearance, elementName);

  return styles;
});
