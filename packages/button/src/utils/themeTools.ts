import { darken } from 'polished';

import { IThemeBase } from '@xcritical/theme';
import { IBaseButtonTheme, ICSSWideKeyword } from '../interfaces';


interface IGenApperance {
  background?: string;
  color?: string;
  boxShadowColor?: string;
  outline?: IBaseButtonTheme;
  borderColor?: string;
  fontWeight?: ICSSWideKeyword | 'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

export const generateApperance = ({
  background = '',
  color,
  boxShadowColor,
  fontWeight,
  outline: _outline,
  borderColor = '',
}: IGenApperance): IThemeBase<IBaseButtonTheme> => ({
  background,
  color,
  fill: color,
  boxShadowColor: boxShadowColor ?? darken(0.1, background),
  ...fontWeight && { fontWeight },
  _outline,
  borderColor: borderColor || background,
  hover: {
    background: darken(0.1, background),
    color,
    boxShadowColor: boxShadowColor ?? darken(0.1, background),
    ...fontWeight && { fontWeight },
  },
  selected: {
    background: darken(0.1, background),
    color,
    boxShadowColor: boxShadowColor ?? darken(0.1, background),
    ...fontWeight && { fontWeight },

    _outline,
    borderColor: borderColor || background,
  },
  active: {
    background: darken(0.1, background),
    color,
    boxShadowColor: boxShadowColor ?? darken(0.1, background),
    ...fontWeight && { fontWeight },

    _outline,
    borderColor: borderColor || background,
  },
  disabled: {
    background,
    color,
    boxShadowColor: boxShadowColor ?? darken(0.1, background),
    ...fontWeight && { fontWeight },

    _outline,
    borderColor: borderColor || background,
  },
});
