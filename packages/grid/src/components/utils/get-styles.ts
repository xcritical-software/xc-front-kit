import {
  getThemedState,
  IThemeNamespace,
} from '@xcritical/theme';

import {
  gridThemeNamespace,
  tableTheme,

} from '../theme/theme';

import { ITableTheme } from '../../interfaces';


export type IThemeProp<T> = T;

export function gridTheme<T>(
  theme: IThemeNamespace,
  propertyPath?: string | undefined,
): ITableTheme | IThemeProp<T> {
  const func = getThemedState(gridThemeNamespace, tableTheme);
  return func(theme, propertyPath) as ITableTheme | T;
}
