import { getAppearanceTheme } from '@xcritical/theme';

import { IThemed } from '../interfaces';
import { buttonGroupThemeNamespace, defaultButtonGroupTheme } from '../theme';


export const getButtonGroupProperty = ({
  theme,
  baseAppearance,
  appearance,
}: IThemed): (propertyPath: string[]) => any => {
  const func = getAppearanceTheme(buttonGroupThemeNamespace, defaultButtonGroupTheme);

  return (propertyPath) => func(theme, appearance, propertyPath, baseAppearance);
};
