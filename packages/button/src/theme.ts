import { colors } from '@xcritical/theme';

import { generateApperance } from './utils/themeTools';
import { ButtonTheme } from './interfaces';


export const buttonThemeNamespace = '@xcritical\\xc-button';

export const buttonThemeStyle: ButtonTheme = {
  padding: {
    bottom: 7,
    left: 20,
    right: 20,
    top: 7,
  },
  appearance: {
    default: generateApperance({
      background: colors.GRAY_LIGHT,
      color: colors.CHAROCOAL,
      outline: {
        background: colors.WHITE,
        color: colors.CHAROCOAL,
      },
    }),
    primary: generateApperance({ background: colors.PRIMARY, color: colors.WHITE }),
    secondary: generateApperance({ background: colors.SECONDARY, color: colors.WHITE }),
    success: generateApperance({ background: colors.SUCCESS, color: colors.WHITE }),
    danger: generateApperance({ background: colors.DANGER, color: colors.WHITE }),
    warning: generateApperance({ background: colors.WARNING, color: colors.WHITE }),
    info: generateApperance({ background: colors.INFO, color: colors.WHITE }),
    dark: generateApperance({ background: colors.DARK, color: colors.WHITE }),
    light: generateApperance({ background: colors.LIGHT, color: colors.CHAROCOAL }),
    link: generateApperance({
      background: 'transparent',
      color: colors.PRIMARY,
      font: { weight: 'inherit' },
      borderColor: 'transparent',
      outline: {
        background: 'transparent',
        color: colors.PRIMARY,
        borderColor: 'transparent',
      },
    }),
  },
  prefixSpacing: 15,
  postfixSpacing: 15,
  font: {
    weight: 600,
    size: 14,
  },
  borderRadius: 3,
};


export const staticStyles = {
  alignItems: 'center',
  borderWidth: 0,
  boxSizing: 'border-box',
  display: 'inline-flex',
  fontSize: 'inherit',
  fontStyle: 'normal',
  fontWeight: 'normal',
  maxWidth: '100%',
  outline: 'none !important',
  textAlign: 'center',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  border: '1px solid transparent',
};
