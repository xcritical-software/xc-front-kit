import { colors } from '@xcritical/theme';

import { generateApperance } from './utils/themeTools';
import { ButtonTheme, ButtonGroupTheme } from './interfaces';


export const buttonThemeNamespace = '@xcritical\\button';
export const buttonGroupThemeNamespace = '@xcritical\\button-group';

export const buttonThemeStyle: ButtonTheme = {
  paddingBottom: '7px',
  paddingLeft: '20px',
  paddingRight: '20px',
  paddingTop: '7px',
  appearance: {
    default: {
      ...generateApperance({
        background: colors.GRAY_LIGHT,
        color: colors.CHAROCOAL,
        outline: {
          background: colors.WHITE,
          color: colors.CHAROCOAL,
        },
      }),
    },
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
      fontWeight: 'inherit',
      borderColor: 'transparent',
      outline: {
        background: 'transparent',
        color: colors.PRIMARY,
        borderColor: 'transparent',
      },
    }),
  },
  lineHeight: 1.69,
  prefixSpacing: 15,
  postfixSpacing: 15,
  fontWeight: 600,
  fontSize: '14px',
  borderRadius: '3px',
};

export const defaultButtonGroupTheme: ButtonGroupTheme = {
  display: 'inline-block',
  borderRadius: '5px',
};
