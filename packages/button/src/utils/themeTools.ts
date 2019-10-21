import { darken } from 'polished';

import { IButtonTheme, IFont } from '../interfaces';


interface IGenApperance {
  background?: string;
  color?: string;
  boxShadowColor?: string;
  font?: IFont;
  outline?: IButtonTheme;
  borderColor?: string;
}

export const generateApperance = ({
  background = '',
  color,
  boxShadowColor,
  font,
  outline,
  borderColor = '',
}: IGenApperance): IButtonTheme => ({
  background,
  color,
  boxShadowColor: boxShadowColor || darken(0.1, background),
  font,
  outline,
  borderColor: borderColor || background,
  hover: {
    background: darken(0.1, background),
    color,
    boxShadowColor: boxShadowColor || darken(0.1, background),
    font,
    outline: {
      background,
      color,
      borderColor: borderColor || background,
    },
  },
  selected: {
    background: darken(0.1, background),
    color,
    boxShadowColor: boxShadowColor || darken(0.1, background),
    font,
    outline,
    borderColor: borderColor || background,
  },
  active: {
    background: darken(0.1, background),
    color,
    boxShadowColor: boxShadowColor || darken(0.1, background),
    font,
    outline,
    borderColor: borderColor || background,
  },
  disabled: {
    background,
    color,
    boxShadowColor: boxShadowColor || darken(0.1, background),
    font,
    outline,
    borderColor: borderColor || background,
  },
});
