import {
  getThemedState,
  ITheme,
  IThemeNamespace,
} from '@xcritical/theme';

import {
  gridThemeNamespace,
  tableTheme,
} from '../theme/theme';


export interface ITableTheme extends ITheme {
  width?: string;
  tableHeight?: string;
  headBorderBottom?: {
    width?: string;
    style?: string;
    color?: string;
  };
  rowColor?: string;
  evenRowColor?: string;
  activeRowColor?: string;
  headerBackgroundColor?: string;
  headerHoverColor?: string;
  cell?: {
    borderRight?: {
      width?: string;
      color?: string;
      style?: string;
    };
    padding?: {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
    };
    font?: {
      size?: string;
      weight?: string;
      color?: string;
    };
  };
  header?: {
    font?: {
      size?: string;
      weight?: string;
      color?: string;
    };
    padding?: {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
    };
  };
}

export type IThemeProp<T> = T;

export function gridTheme<T>(
  theme: IThemeNamespace,
  propertyPath?: string | undefined,
): ITableTheme | IThemeProp<T> {
  const func = getThemedState(gridThemeNamespace, tableTheme);
  return func(theme, propertyPath) as ITableTheme | T;
}
