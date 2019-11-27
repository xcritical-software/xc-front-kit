import {
  getThemedState,
  IThemeNamespace,
} from '@xcritical/theme';

import {
  filterThemeNamespace,
  defaultTheme,
} from '../theme';
import { IFilterTheme, IThemeProp } from '../interfaces';


export function filterTheme<T>(
  theme: IThemeNamespace,
  propertyPath?: string | undefined,
): IFilterTheme | IThemeProp<T> {
  const func = getThemedState(filterThemeNamespace, defaultTheme);
  return func(theme, propertyPath) as IFilterTheme | T;
}
