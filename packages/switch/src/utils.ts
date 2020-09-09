import memoize from 'micro-memoize';

import { IThemeNamespace, getThemedState, ITheme } from '@xcritical/theme';

import { getAppearanceTheme } from '@xcritical/theme/src';

import { ISwitchTheme } from './interfaces';
import { switchThemeNamespace, defaultSwitchTheme } from './theme';


export const getSwitchStyles = memoize((
  theme?: IThemeNamespace<ISwitchTheme>,
  propertyPath?: string[],
): ITheme<ISwitchTheme> => {
  const func = getThemedState(switchThemeNamespace, defaultSwitchTheme);

  return func(theme, propertyPath);
});

export const switchAppearanceTheme = (
  theme: ISwitchTheme,
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): ITheme<ISwitchTheme> => {
  const func = getAppearanceTheme(switchThemeNamespace, defaultSwitchTheme);

  return func(theme, appearanceName, propertyPath, baseAppearance);
};
