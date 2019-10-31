import {
  getThemedState,
  ITheme,
  IThemeNamespace,
} from '@xcritical/theme';

import {
  filterThemeNamespace,
  defaultTheme,
} from '../theme';


export interface IFilterTheme extends ITheme {
  backgroundTopPanel: 'red';
  tag: {
    padding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    margin: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    border: {
      radius: number;
      color: string;
      style: string;
      width: number;
    };
    backgroundColor: string;
    font: string;
  };
  buttonsAppearances: {
    more: string;
    apply: string;
    add: string;
    reset: string;
  };
}

export type IThemeProp<T> = T;

export function filterTheme<T>(
  theme: IThemeNamespace,
  propertyPath?: string | undefined,
): IFilterTheme | IThemeProp<T> {
  const func = getThemedState(filterThemeNamespace, defaultTheme);
  return func(theme, propertyPath) as IFilterTheme | T;
}
