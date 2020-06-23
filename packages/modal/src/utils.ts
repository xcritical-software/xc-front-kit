import memoize from 'micro-memoize';

import { getThemedState, IThemeNamespace } from '@xcritical/theme';
import { blanketThemeNamespace, IBlanketTheme } from '@xcritical/blanket';


import { IModalTheme } from './interfaces';
import { modalThemeNamespace, defaultModalTheme } from './theme';


export const getModalStyles = memoize((
  theme?: IThemeNamespace<IModalTheme>,
  propertyPath?: string[],
): any => {
  const func = getThemedState(modalThemeNamespace, defaultModalTheme);

  return func(theme, propertyPath);
});

export const getModalBlanketTheme = memoize((
  theme?: IThemeNamespace<IModalTheme>,
): IThemeNamespace<IBlanketTheme> => ({
  [blanketThemeNamespace]: getModalStyles(theme, ['blanket']),
}));
