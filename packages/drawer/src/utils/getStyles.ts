import memoizee from 'micro-memoize';
import { css, FlattenInterpolation } from 'styled-components';

import { getAppearanceTheme, AllType } from '@xcritical/theme';

import { drawerThemeNamespace, defaultDrawerTheme } from '../theme';
import {
  DrawerTheme,
  IDrawerProps,
  IReturnFunction,
  IIconWrapperProps,
} from '../interfaces';

export const drawerAppearanceTheme = (
  theme: DrawerTheme,
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[]
): AllType => {
  const func = getAppearanceTheme(drawerThemeNamespace, defaultDrawerTheme);

  return func(theme, appearanceName, propertyPath, baseAppearance);
};

export const getElementStyles: IReturnFunction<any> = memoizee(
  (theme, elementName, appearance = 'default', baseAppearance = 'default') => {
    const styles = drawerAppearanceTheme(
      theme,
      appearance,
      baseAppearance,
      elementName
    );

    return styles;
  }
);

export const getDrawerIconInteractiveStyles = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  onClick,
}: IDrawerProps & IIconWrapperProps): FlattenInterpolation<any> => {
  const iconStyles = getElementStyles(
    theme,
    'iconWrapper',
    appearance,
    baseAppearance
  );

  if (!iconStyles) return css``;

  const { hover, active } = iconStyles;

  return css`
    &:hover {
      background-color: ${() => (onClick ? hover?.backgroundColor : undefined)};
    }

    &:active {
      background-color: ${() =>
        onClick ? active?.backgroundColor : undefined};
      outline: 0;
    }
  `;
};
