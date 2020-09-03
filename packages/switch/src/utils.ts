import memoize from 'micro-memoize';

import { IThemeNamespace, getThemedState } from '@xcritical/theme';

import { AllType, getAppearanceTheme } from '@xcritical/theme/src';

import { ISwitchTheme } from './interfaces';
import { switchThemeNamespace, defaultSwitchTheme } from './theme';


export const getSwitchStyles = memoize((
  theme?: IThemeNamespace<ISwitchTheme>,
  propertyPath?: string[],
): any => {
  const func = getThemedState(switchThemeNamespace, defaultSwitchTheme);

  return func(theme, propertyPath);
});

export const switchAppearanceTheme = (
  theme: ISwitchTheme,
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): AllType => {
  const func = getAppearanceTheme(switchThemeNamespace, defaultSwitchTheme);

  return func(theme, appearanceName, propertyPath, baseAppearance);
};
