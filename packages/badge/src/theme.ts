import { colors } from '@xcritical/theme';

import { BadgeTheme } from './interfaces';


export const badgeThemeNamespace = '@xcritical\\badge';

export const badgeThemeStyle: BadgeTheme = {
  backgroundColor: colors.GRAY,
  color: 'inherit',
  border: '1px solid transparent',
  inverse: {
    color: 'inherit',
    borderColor: colors.GRAY,
    background: colors.WHITE,
  },
  appearance: {
    default: {

    },
    primary: {
      background: colors.PRIMARY,
      color: colors.WHITE,
      inverse: {

        color: colors.PRIMARY,
        borderColor: colors.PRIMARY,
        background: colors.WHITE,
      },
    },
    secondary: {
      background: colors.SECONDARY,
      color: colors.WHITE,
      inverse: {

        color: colors.SECONDARY,
        borderColor: colors.SECONDARY,
        background: colors.WHITE,
      },
    },
    success: {
      background: colors.SUCCESS,
      color: colors.WHITE,
      inverse: {

        color: colors.SUCCESS,
        borderColor: colors.SUCCESS,
        background: colors.WHITE,
      },
    },
    danger: {
      background: colors.DANGER,
      color: colors.WHITE,
      inverse: {

        color: colors.DANGER,
        borderColor: colors.DANGER,
        background: colors.WHITE,
      },
    },
    warning: {
      background: colors.WARNING,
      color: colors.WHITE,
      inverse: {

        color: colors.WARNING,
        borderColor: colors.WARNING,
        background: colors.WHITE,
      },
    },
    info: {
      background: colors.INFO,
      color: colors.WHITE,
      inverse: {

        color: colors.INFO,
        borderColor: colors.INFO,
        background: colors.WHITE,
      },
    },
    dark: {
      background: colors.DARK,
      color: colors.WHITE,
      inverse: {

        color: colors.DARK,
        borderColor: colors.DARK,
        background: colors.WHITE,
      },
    },
    light: {
      background: colors.LIGHT,
      color: colors.CHAROCOAL,
      inverse: {
        borderWidth: 1,
        color: colors.LIGHT,
        borderColor: colors.LIGHT,
        background: colors.CHAROCOAL,
      },
    },
  },
};
