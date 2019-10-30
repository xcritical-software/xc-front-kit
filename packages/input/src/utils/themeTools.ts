import { darken } from 'polished';


export const generateApperance = ({
  background, color, height, boxShadowColor, padding, font, border, borderRadius, transition,
}) => ({
  background,
  color,
  height,
  boxShadowColor: boxShadowColor || darken(0.95, background),
  padding,
  font,
  border,
  borderRadius,
  transition,
  hover: {
    background: darken(0.1, background),
    color,
    height,
    boxShadowColor: boxShadowColor || darken(0.95, background),
    padding,
    font,
    border,
    borderRadius,
    transition,
  },
  focus: {
    background: darken(0.1, background),
    color,
    height,
    boxShadowColor: boxShadowColor || darken(0.95, background),
    padding,
    font,
    border,
    borderRadius,
    transition,
  },
  selected: {
    background: darken(0.1, background),
    color,
    height,
    boxShadowColor: boxShadowColor || darken(0.95, background),
    padding,
    font,
    border,
    borderRadius,
    transition,
  },
  active: {
    background: darken(0.1, background),
    color,
    height,
    boxShadowColor: boxShadowColor || darken(0.95, background),
    padding,
    font,
    border,
    borderRadius,
    transition,
  },
  disabled: {
    background,
    color,
    height,
    boxShadowColor: boxShadowColor || darken(0.95, background),
    padding,
    font,
    border,
    borderRadius,
    transition,
  },
  invalid: {
    background,
    color,
    height,
    boxShadowColor: boxShadowColor || darken(0.95, background),
    padding,
    font,
    border,
    borderRadius,
    transition,
  },
});
