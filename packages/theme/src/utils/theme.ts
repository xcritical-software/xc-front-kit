import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import memoize from 'memoizee';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import { mergeDeep } from 'utilitify';
import {
  IFont,
  ITheme,
  IThemeNamespace,
  OneOrManyString,
} from '../interfaces';


interface IFuncStateTheme {
  (propertyPath: string, defaultValue: string): ITheme;
}

export const getAppearancePath = (
  appearanceName = 'default', propertyPath?: OneOrManyString,
// eslint-disable-next-line function-paren-newline
): string[] => {
  const res = [
    'appearance',
    appearanceName,
    ...(Array.isArray(propertyPath) ? propertyPath : [propertyPath]),
  ].filter(item => !!item) as string[];

  return res;
};

export const mergeBaseTheme = memoize(
  (namespace: string,
    defaultTheme: ITheme,
    theme: IThemeNamespace): ITheme => (
    namespace && theme[namespace] && !isEmpty(theme[namespace])
      ? mergeDeep(defaultTheme, theme[namespace])
      : defaultTheme),
);


export const getThemedState = (namespace: string, defaultTheme: ITheme) => (
  theme: IThemeNamespace = {}, propertyPath: OneOrManyString | undefined,
): ITheme => {
  const componentTheme = mergeBaseTheme(namespace, defaultTheme, theme);
  return propertyPath ? get(componentTheme, propertyPath) : componentTheme;
};

export const compileAppearanceTheme = memoize(
  (namespace: string,
    defaultTheme: ITheme,
    theme: IThemeNamespace,
    appearanceName: string,
    baseAppearanceName: string): ITheme => {
    const themeExtractor = getThemedState(namespace, defaultTheme);

    if (appearanceName !== baseAppearanceName) {
      return mergeDeep(
        themeExtractor(theme, getAppearancePath(baseAppearanceName)) || {},
        themeExtractor(theme, getAppearancePath(appearanceName)) || {},
      );
    }

    return themeExtractor(theme, getAppearancePath(appearanceName)) || {};
  },
);


export const getStatesTheme = (
  theme: ITheme, stateName: string, baseState = 'default',
): IFuncStateTheme => {
  const merged = mergeDeep(
    get(theme, baseState) || {},
    get(theme, stateName) || {},
  );

  return (
    propertyPath: string,
    defaultValue: string,
  ): ITheme => (propertyPath ? get(merged, propertyPath, defaultValue) : merged);
};

export const getAppearanceTheme = (
  namespace: string,
  defaultTheme: ITheme,
) => (theme: IThemeNamespace,
  appearanceName: string,
  propertyPath: string,
  baseAppearanceName = 'default'): ITheme => {
  const themeExtractor = getThemedState(namespace, defaultTheme);

  const compiledTheme = compileAppearanceTheme(
    namespace,
    defaultTheme,
    theme,
    appearanceName,
    baseAppearanceName,
  );

  if (propertyPath) {
    return get(compiledTheme, propertyPath) || themeExtractor(theme, propertyPath);
  }

  return compiledTheme;
};

export const getFontStyle = ({ size, weight, lineHeightRatio = 1.69 }: IFont<number>): FlattenSimpleInterpolation => css`
        ${weight ? `font-weight: ${weight}` : null};
        ${size ? `font-size: ${size}px; line-height: ${size * lineHeightRatio}px;` : null};
      `;

export const getFontObj = (
  { size, weight, lineHeightRatio = 1.69 }: IFont<number> = {},
): IFont<string> => ({
  ...weight && ({ fontWeight: weight }),
  ...size && ({ fontSize: `${size}px`, lineHeight: `${size * lineHeightRatio}px;` }),
});
