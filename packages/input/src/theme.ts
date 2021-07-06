/* eslint-disable prefer-destructuring */
import { colors } from '@xcritical/theme';

import { InputTheme } from './interfaces';

export const inputThemeNamespace = '@xcritical\\input';

const color = colors.CHAROCOAL;
const height = 'auto';
const paddingTop = 7;
const paddingRight = 5;
const paddingBottom = 7;
const paddingLeft = 5;
const fontWeight = 600;
const fontSize = 13;
const lineHeight = 1.69;
const borderWidth = '1px';
const borderStyle = 'solid';
const borderColor = colors.GRAY;
const borderRadius = 3;

export const inputThemeStyle: InputTheme = {
  backgroundColor: colors.WHITE,
  color,
  prefixSpacing: 5,
  postfixSpacing: 5,
  height,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  fontWeight,
  fontSize,
  borderWidth,
  borderStyle,
  borderColor,
  borderRadius: 3,
  control: {
    width: 'auto',
  },
  input: {
    borderWidth: 0,
    backgroundColor: 'inherit',
    lineHeight,
  },
  clearWrapper: {
    cursor: 'pointer',
    display: 'flex',
    fill: colors.BLACK,
  },
  appearance: {
    default: {
      hover: {
        borderColor: colors.PRIMARY,
      },
      focus: {
        borderColor: colors.PRIMARY,
        borderRadius,
      },
      active: {
        borderColor: colors.PRIMARY,
      },
      disabled: {
        borderColor,
      },
      invalid: {
        borderColor: colors.DANGER,
        color: colors.DANGER,
      },
      filled: {},
    },
  },
};
