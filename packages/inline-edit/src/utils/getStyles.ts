import {
  css,
  CSSObject,
  FlattenSimpleInterpolation,
  FlattenInterpolation,
} from 'styled-components';
import get from 'lodash.get';
import { mergeDeep } from 'utilitify';
import memoize from 'micro-memoize';

import {
  getThemedState,
  getAppearanceTheme,
  ITheme,
  AllType,
} from '@xcritical/theme';

import { inlineEditThemeNamespace, defaultInlineEditTheme } from '../theme';
import {
  IInlineEditTheme,
  ICommonProps,
  IReturnFunction,
  GetPropStyles,
} from '../interfaces';


export const inlineEditTheme = memoize((
  theme: ITheme<IInlineEditTheme>,
  propertyPath?: string | string[],
): AllType => {
  const func = getThemedState(inlineEditThemeNamespace, defaultInlineEditTheme);
  return func(theme, propertyPath);
});

const inlineEditAppearanceTheme = memoize((
  theme: ITheme<IInlineEditTheme> = {},
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): ITheme<IInlineEditTheme> | any => {
  const func = getAppearanceTheme(inlineEditThemeNamespace, defaultInlineEditTheme);
  return func(theme, appearanceName, propertyPath, baseAppearance);
});

export const getInlineEditThemeStylesByProperty = memoize((
  theme: ITheme<IInlineEditTheme>,
) => (propertyPath: string[]): CSSObject => {
  const customBlanketTheme = get(theme, inlineEditThemeNamespace);
  const mergedTheme = mergeDeep(defaultInlineEditTheme, customBlanketTheme);

  return get(mergedTheme, propertyPath);
});

export const getBaseStyle = memoize(({
  theme,
}: ICommonProps): FlattenSimpleInterpolation => {
  const baseStyles = inlineEditTheme(theme);

  return css`
    ${baseStyles}
  `;
});

export const getInlineEditStatesStyle = (stateName: string): any => memoize((
  theme: ITheme<IInlineEditTheme> = {},
  appearance: string,
  baseAppearance: string,
): any => {
  const styles = inlineEditAppearanceTheme(theme, appearance || '', baseAppearance || '', [stateName]);
  return styles;
});

export const getElementStyles: IReturnFunction<any> = memoize((
  theme,
  elementName,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  const styles = inlineEditAppearanceTheme(theme, appearance, baseAppearance, elementName);
  return styles;
});

export const getPropertyStyles: GetPropStyles<FlattenInterpolation<any>> = memoize((
  theme,
  propertyPath,
  appearance = 'default',
  baseAppearance = 'default',
  defaultPropertyValue = 'inherit',
) => {
  let property = inlineEditAppearanceTheme(theme, appearance, baseAppearance, [propertyPath]);

  if (!property) {
    property = defaultPropertyValue;
  }

  return memoize((
    elementName: string,
  ) => {
    const element = inlineEditAppearanceTheme(theme, appearance, baseAppearance, elementName);

    return css`
      ${() => `${propertyPath}: ${get(element, [propertyPath], property)}`};
    `;
  });
});
