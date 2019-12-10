import memoizee from 'micro-memoize';
import { css, FlattenSimpleInterpolation, FlattenInterpolation } from 'styled-components';
import get from 'lodash.get';

import {
  getAppearanceTheme,
  getThemedState,
  AllType,
} from '@xcritical/theme';

import { drawerThemeNamespace, drawerThemeStyle } from '../theme';
import {
  DrawerTheme,
  IDrawerProps,
  IReturnFunction,
  GetPropStyles,
  IIconWrapperProps,
} from '../interfaces';


export const drawerTheme = (
  theme: DrawerTheme,
  propertyPath?: string | string[],
): AllType => {
  const func = getThemedState(drawerThemeNamespace, drawerThemeStyle);
  return func(theme, propertyPath);
};

export const drawerAppearanceTheme = (
  theme: DrawerTheme,
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): AllType => {
  const func = getAppearanceTheme(drawerThemeNamespace, drawerThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
};

export const getBaseStyle = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}: IDrawerProps): FlattenSimpleInterpolation => {
  const background: string = drawerAppearanceTheme(theme, appearance, baseAppearance, 'backgroundColor');
  const color = drawerAppearanceTheme(theme, appearance, baseAppearance, 'color');
  const baseStyles = drawerTheme(theme);
  const styles = drawerAppearanceTheme(theme, appearance, baseAppearance);
  const fontWeight = drawerAppearanceTheme(theme, appearance, baseAppearance, 'fontWeight');

  return css`
    ${baseStyles}
    ${styles}
    background: ${background};
    color: ${color};
    font-weight: ${fontWeight};
    &:focus {
      color: ${color};
    }
  `;
};

export const getElementStyles: IReturnFunction<any> = memoizee((
  theme,
  elementName,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  const styles = drawerAppearanceTheme(theme, appearance, baseAppearance, elementName);

  return styles;
});

export const getDrawerStatesStyle = (stateName: string) => ({
  theme,
  baseAppearance = 'default',
  appearance = 'default',
}: IDrawerProps): FlattenInterpolation<any> => {
  const styles = drawerAppearanceTheme(theme, appearance, baseAppearance, stateName);

  return css`
    ${styles}

    &:focus {
      color: inherit;
    }
  `;
};

export const getDrawerInteractiveStyles = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  disabled,
}: IDrawerProps): FlattenInterpolation<any> => {
  const standardFocus = css`
    &:focus {
      box-shadow: 0 0 0 2px ${drawerAppearanceTheme(theme, appearance, baseAppearance, ['focus', 'outline'])} inset;
    }
  `;

  if (disabled) {
    return css`
      cursor: not-allowed;
      ${getDrawerStatesStyle('disabled')}
      ${standardFocus};
    `;
  }

  return css`
    &:hover {
      ${getDrawerStatesStyle('hover')};
    }

    &:active {
      ${getDrawerStatesStyle('active')};
    }

    ${standardFocus};
  `;
};

export const getDrawerIconInteractiveStyles = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  onClick,
}: IDrawerProps & IIconWrapperProps): FlattenInterpolation<any> => {
  const iconStyles = getElementStyles(theme, 'iconWrapper', appearance, baseAppearance);

  if (!iconStyles) return css``;

  const { hover, active } = iconStyles;

  return css`
    &:hover {
      background-color: ${() => (onClick ? hover.backgroundColor : undefined)};
    }

    &:active {
      background-color:  ${() => (onClick ? active.backgroundColor : undefined)};
      outline: 0;
    }
  `;
};

export const getPropertyStyles: GetPropStyles<FlattenInterpolation<any>> = memoizee((
  theme,
  propertyPath,
  appearance = 'default',
  baseAppearance = 'default',
  defaultPropertyValue = 'inherit',
) => {
  let property = drawerAppearanceTheme(theme, appearance, baseAppearance, [propertyPath]);

  if (!property) {
    property = defaultPropertyValue;
  }

  return memoizee((
    elementName: string,
  ) => {
    const element = drawerAppearanceTheme(theme, appearance, baseAppearance, elementName);

    return css`
      ${() => `${propertyPath}: ${get(element, [propertyPath], property)}`};
    `;
  });
});
