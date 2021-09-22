import memoizee from 'micro-memoize';

import { getAppearanceTheme, AllType } from '@xcritical/theme';

import { drawerThemeNamespace, defaultDrawerTheme } from './theme';
import { DrawerTheme, IReturnFunction } from './interfaces';

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
  (theme, elementName, appearance, baseAppearance) => {
    const styles = drawerAppearanceTheme(
      theme,
      appearance,
      baseAppearance,
      elementName
    );

    return styles;
  }
);
