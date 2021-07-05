import memoize from 'micro-memoize';

import {
  getThemedState,
  getAppearanceTheme,
  IThemeNamespace,
} from '@xcritical/theme';
import { blanketThemeNamespace, IBlanketTheme } from '@xcritical/blanket';

import { IModalTheme } from './interfaces';
import { modalThemeNamespace, defaultModalTheme } from './theme';

export const getModalStyles = memoize(
  (
    theme: IThemeNamespace<IModalTheme>,
    appearanceName: string,
    propertyPath?: string[]
  ): any => {
    const func = getAppearanceTheme(modalThemeNamespace, defaultModalTheme);

    return func(theme, appearanceName, propertyPath);
  }
);

export const getModalBlanketTheme = memoize(
  (theme?: IThemeNamespace<IModalTheme>): IThemeNamespace<IBlanketTheme> => {
    const func = getThemedState(modalThemeNamespace, defaultModalTheme);

    return {
      [blanketThemeNamespace]: func(theme, ['blanket']),
    };
  }
);
