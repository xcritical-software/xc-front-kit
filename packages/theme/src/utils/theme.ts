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
  IApperanceStateFunc,
} from '../interfaces';


interface IFuncStateTheme<T = ITheme> {
  (propertyPath?: string, defaultValue?: any): T;
}

export const getAppearancePath = (
  appearanceName = 'default', propertyPath?: OneOrManyString,
// eslint-disable-next-line function-paren-newline
): string[] => {
  const res = [
    'appearance',
    appearanceName,
    ...(Array.isArray(propertyPath) ? propertyPath : [propertyPath]),
  ].filter((item) => !!item) as string[];

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


export function getStatesTheme<T>(
  theme: T,
  stateName: string,
  baseState = 'default',
): IFuncStateTheme<T> {
  const merged = mergeDeep(
    get(theme, baseState, {}),
    get(theme, stateName, {}),
  );

  return (
    propertyPath?: string,
    defaultValue?: any,
  ): T | any => (propertyPath ? get(merged, propertyPath, defaultValue) : merged);
}

export function getAppearanceTheme<T>(
  namespace: string,
  defaultTheme: ITheme | ITheme<T>,
): IApperanceStateFunc<T> {
  return function func(
    theme,
    appearanceName,
    propertyPath,
    baseAppearanceName,
  ): ITheme | ITheme<T> {
    const themeExtractor = getThemedState(namespace, defaultTheme);

    const compiledTheme = compileAppearanceTheme(
      namespace,
      defaultTheme,
      theme,
      appearanceName,
      baseAppearanceName || 'default',
    );

    if (propertyPath) {
      return get(compiledTheme, propertyPath) || themeExtractor(theme, propertyPath);
    }

    return compiledTheme;
  };
}

export const getFontStyle = ({
  size,
  weight,
  lineHeight,
  lineHeightRatio = 1.69,
}: IFont): FlattenSimpleInterpolation => css`
        ${weight ? `font-weight: ${weight}` : null};
        ${size ? `font-size: ${size}px; line-height: ${lineHeight || lineHeightRatio};` : null};
      `;

export const getFontObj = ({
  size,
  weight,
  lineHeight,
  lineHeightRatio = 1.69,
}: IFont = {}): React.CSSProperties => ({
  ...weight && ({ fontWeight: weight }),
  ...size && ({ fontSize: `${size}px`, lineHeight: lineHeight || lineHeightRatio }),
});
