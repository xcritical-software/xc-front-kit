import memoize from 'micro-memoize';
import { CSSObject } from 'styled-components';

import { getThemedState, IThemeNamespace } from '@xcritical/theme';

import { ButtonGroupTheme } from '../interfaces';
import { buttonGroupThemeNamespace, defaultButtonGroupTheme } from '../theme';

export const getButtonGroupStyles = memoize(
  (
    theme: IThemeNamespace<ButtonGroupTheme> = {},
    propertyPath?: string | string[]
  ) => {
    const func = getThemedState(
      buttonGroupThemeNamespace,
      defaultButtonGroupTheme
    );

    // TODO: need return type improvements
    return func(theme, propertyPath) as CSSObject;
  }
);
