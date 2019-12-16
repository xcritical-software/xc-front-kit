import memoize from 'micro-memoize';
import { getThemedState, IThemeNamespace } from '@xcritical/theme';

import { ButtonGroupTheme } from '../interfaces';
import { buttonGroupThemeNamespace, defaultButtonGroupTheme } from '../theme';


export const getButtonGroupStyles = memoize((
  theme: IThemeNamespace<ButtonGroupTheme> = {},
  propertyPath?: string | string[],
): ButtonGroupTheme => {
  const func = getThemedState(buttonGroupThemeNamespace, defaultButtonGroupTheme);
  return func(theme, propertyPath);
});
