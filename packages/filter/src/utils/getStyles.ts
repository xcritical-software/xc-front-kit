import {
  getThemedState,
  ITheme,
  IThemeNamespace,
} from '@xcritical/theme';

import { CSSProperties } from 'styled-components';
import {
  filterThemeNamespace,
  defaultTheme,
} from '../theme';


export interface IFilterTheme extends ITheme {
  tag: CSSProperties;
  topPanel: CSSProperties;
  filtersPanel: CSSProperties;
  filterPanelButtons: CSSProperties;
}

export type IThemeProp<T> = T;

export function filterTheme<T>(
  theme: IThemeNamespace,
  propertyPath?: string | undefined,
): IFilterTheme | IThemeProp<T> {
  const func = getThemedState(filterThemeNamespace, defaultTheme);
  return func(theme, propertyPath) as IFilterTheme | T;
}
