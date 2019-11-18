import { colors } from '@xcritical/theme';

import { InputTheme } from './interfaces';


export const inputThemeNamespace = '@xcritical\\input';

/*
generateApperance({
      color: colors.CHAROCOAL,
      height: 30,
      paddingTop: 0,
      paddingRight: 20,
      paddingBottom: 0,
      paddingLeft: 20,
      fontWeight: 600,
      fontSize: 14,
      lineHeight: 1.69,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: colors.GRAY_LIGHT,
      borderRadius: 3,
    }),
*/

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
    },
  },
};
