import { darken } from 'polished';


export const generateApperance = ({
  background, color, boxShadowColor, font, outline, borderColor,
}) => ({
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
