import memoizee from 'micro-memoize';
import get from 'lodash.get';
import { css, FlattenSimpleInterpolation, FlattenInterpolation } from 'styled-components';
import { isNil } from 'utilitify';

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
  IReturnWithArgsFunction,
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
  const styles = sidebarAppearanceTheme(theme, appearance, baseAppearance);

  return css`
    ${styles}
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

export const getWidthStyles: IReturnFunctionForConcreteProp<
IReturnWithArgsFunction<any, FlattenSimpleInterpolation>
> = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  let width = sidebarAppearanceTheme(theme, appearance, baseAppearance, ['width']);

  if (!width) {
    width = 'auto';
  }

  return memoizee((
    elementName,
    shouldFitContainer,
  ) => {
    const element = sidebarAppearanceTheme(theme, appearance, baseAppearance, elementName);

    return css`
      width: ${shouldFitContainer ? '100%' : get(element, ['width'], width)};
    `;
  });
});

export const getBackgroundColorStyles: IReturnFunctionForConcreteProp<
IReturnWithArgsFunction<any, FlattenSimpleInterpolation>
> = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  let backgroundColor = sidebarAppearanceTheme(theme, appearance, baseAppearance, ['backgroundColor']);

  if (!backgroundColor) {
    backgroundColor = 'transparent';
  }

  return memoizee((
    elementName,
  ) => {
    const element = sidebarAppearanceTheme(theme, appearance, baseAppearance, elementName);

    return css`
      background-color: ${get(element, ['backgroundColor'], backgroundColor)};
    `;
  });
});

export const getZIndexStyles: IReturnFunctionForConcreteProp<
IReturnWithArgsFunction<any, FlattenSimpleInterpolation>
> = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  let zIndex = sidebarAppearanceTheme(theme, appearance, baseAppearance, ['zIndex']);

  if (!zIndex) {
    zIndex = 'unset';
  }

  return memoizee((
    elementName,
  ) => {
    const element = sidebarAppearanceTheme(theme, appearance, baseAppearance, elementName);

    return css`
      z-index: ${get(element, ['zIndex'], zIndex)};
    `;
  });
});

export const getPaddingStyles: IReturnFunctionForConcreteProp<
IReturnWithArgsFunction<any, FlattenSimpleInterpolation>
> = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  let commonPadding = sidebarAppearanceTheme(theme, appearance, baseAppearance, ['padding']);

  if (!commonPadding) {
    commonPadding = 0;
  }

  return memoizee((elementName) => {
    const elementPadding = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'padding']);
    const padding = !isNil(elementPadding) ? elementPadding : commonPadding;

    const elementPaddingLeft = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'paddingLeft']);
    const elementPaddingRight = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'paddingRight']);
    const elementPaddingBottom = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'paddingBottom']);
    const elementPaddingTop = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'paddingTop']);

    return css`
      padding-left: ${!isNil(elementPaddingLeft) ? elementPaddingLeft : padding};
      padding-right: ${!isNil(elementPaddingRight) ? elementPaddingRight : padding};
      padding-bottom: ${!isNil(elementPaddingBottom) ? elementPaddingBottom : padding};
      padding-top: ${!isNil(elementPaddingTop) ? elementPaddingTop : padding};
    `;
  });
});

export const getMarginStyles: IReturnFunctionForConcreteProp<
IReturnWithArgsFunction<any, FlattenSimpleInterpolation>
> = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  let commonMargin = sidebarAppearanceTheme(theme, appearance, baseAppearance, ['margin']);

  if (!commonMargin) {
    commonMargin = 0;
  }

  return memoizee((elementName) => {
    const elementMargin = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'margin']);
    const margin = !isNil(elementMargin) ? elementMargin : commonMargin;

    const elementMarginLeft = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'marginLeft']);
    const elementMarginRight = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'marginRight']);
    const elementMarginBottom = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'marginBottom']);
    const elementMarginTop = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'marginTop']);

    return css`
      margin-left: ${!isNil(elementMarginLeft) ? elementMarginLeft : margin};
      margin-right: ${!isNil(elementMarginRight) ? elementMarginRight : margin};
      margin-bottom: ${!isNil(elementMarginBottom) ? elementMarginBottom : margin};
      margin-top: ${!isNil(elementMarginTop) ? elementMarginTop : margin};
    `;
  });
});

export const getBorderStyles: IReturnFunctionForConcreteProp<
IReturnWithArgsFunction<any, FlattenSimpleInterpolation>
> = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  let commonBorder = sidebarAppearanceTheme(theme, appearance, baseAppearance, ['border']);

  if (!commonBorder) {
    commonBorder = 'none';
  }

  return memoizee((elementName) => {
    const elementBorder = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'border']);
    const border = !isNil(elementBorder) ? elementBorder : commonBorder;

    if (border) {
      return css`
        border: ${border};
      `;
    }

    const elementBorderWidth = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'borderWidth']);
    const elementBorderStyle = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'borderStyle']);
    const elementBorderColor = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'borderColor']);

    return css`
      border-width: ${!isNil(elementBorderWidth) ? elementBorderWidth : 0};
      border-style: ${!isNil(elementBorderStyle) ? elementBorderStyle : 'none'};
      border-color: ${!isNil(elementBorderColor) ? elementBorderColor : 'none'};
    `;
  });
});

export const getBorderRadiusStyles: IReturnFunctionForConcreteProp<
IReturnWithArgsFunction<any, FlattenSimpleInterpolation>
> = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  let commonBorderRadius = sidebarAppearanceTheme(theme, appearance, baseAppearance, ['borderRadius']);

  if (!commonBorderRadius) {
    commonBorderRadius = 'none';
  }

  return memoizee((elementName) => {
    const elementBorderRadius = sidebarAppearanceTheme(theme, appearance, baseAppearance, [elementName, 'borderRadius']);
    const borderRadius = !isNil(elementBorderRadius) ? elementBorderRadius : commonBorderRadius;

    if (borderRadius) {
      return css`
        border-radius: ${borderRadius};
      `;
    }

    const elementBorderBottomLeftRadius = sidebarAppearanceTheme(
      theme, appearance, baseAppearance, [elementName, 'borderBottomLeftRadius'],
    );
    const elementBorderBottomRightRadius = sidebarAppearanceTheme(
      theme, appearance, baseAppearance, [elementName, 'borderBottomRightRadius'],
    );
    const elementBorderTopRightRadius = sidebarAppearanceTheme(
      theme, appearance, baseAppearance, [elementName, 'borderTopRightRadius'],
    );
    const elementBorderTopLeftRadius = sidebarAppearanceTheme(
      theme, appearance, baseAppearance, [elementName, 'borderTopLeftRadius'],
    );

    return css`
      border-bottom-left-radius: ${!isNil(elementBorderBottomLeftRadius) ? elementBorderBottomLeftRadius : 0};
      border-bottom-right-radius: ${!isNil(elementBorderBottomRightRadius) ? elementBorderBottomRightRadius : 0};
      border-top-right-radius: ${!isNil(elementBorderTopRightRadius) ? elementBorderTopRightRadius : 0};
      border-top-left-radius: ${!isNil(elementBorderTopLeftRadius) ? elementBorderTopLeftRadius : 0};
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
