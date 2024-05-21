import { css, RuleSet } from 'styled-components';
import get from 'lodash.get';
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
  IReturnFunction,
  GetPropStyles,
} from '../interfaces';

export const inlineEditTheme = memoize(
  (
    theme: ITheme<IInlineEditTheme>,
    propertyPath?: string | string[]
  ): AllType => {
    const func = getThemedState(
      inlineEditThemeNamespace,
      defaultInlineEditTheme
    );

    return func(theme, propertyPath);
  }
);

const inlineEditAppearanceTheme = memoize(
  (
    theme: ITheme<IInlineEditTheme> = {},
    appearanceName: string,
    baseAppearance: string,
    propertyPath?: string | string[]
  ): ITheme<IInlineEditTheme> | AllType => {
    const func = getAppearanceTheme(
      inlineEditThemeNamespace,
      defaultInlineEditTheme
    );

    return func(theme, appearanceName, propertyPath, baseAppearance);
  }
);

export const getInlineEditStatesStyle = (stateName: string): AllType =>
  memoize(
    (
      theme: ITheme<IInlineEditTheme> = {},
      appearance: string,
      baseAppearance: string
    ): AllType => {
      const styles = inlineEditAppearanceTheme(
        theme,
        appearance || '',
        baseAppearance || '',
        [stateName]
      );

      return styles;
    }
  );

export const getElementStyles: IReturnFunction<AllType> = memoize(
  (theme, elementName, appearance, baseAppearance) => {
    const styles = inlineEditAppearanceTheme(
      theme,
      appearance as string,
      baseAppearance as string,
      elementName
    );

    return styles;
  }
);

export const getPropertyStyles: GetPropStyles<RuleSet<AllType>> = memoize(
  (
    theme,
    propertyPath,
    appearance,
    baseAppearance,
    defaultPropertyValue = 'inherit'
  ) => {
    let property = inlineEditAppearanceTheme(
      theme,
      appearance as string,
      baseAppearance as string,
      [propertyPath]
    );

    if (!property) {
      property = defaultPropertyValue;
    }

    return memoize((elementName: string) => {
      const element = inlineEditAppearanceTheme(
        theme,
        appearance as string,
        baseAppearance as string,
        elementName
      );

      return css`
        ${() => `${propertyPath}: ${get(element, [propertyPath], property)}`};
      `;
    });
  }
);
