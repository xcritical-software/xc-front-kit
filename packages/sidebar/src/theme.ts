import { colors } from '@xcritical/theme';

import { ISidebarTheme } from './interfaces';


export const sidebarThemeNamespace = '@xcritical\\sidebar';

export const defaultSidebarTheme: ISidebarTheme = {
  leftBackground: colors.GRAY_LIGHT,
  rightBackground: colors.GRAY_LIGHT,
  color: colors.CHAROCOAL,
  separatorColor: colors.BLUE,
  minWidth: 30,
  maxWidth: 400,
  leftWidth: 90,
  zIndex: 100,
  closeOpenButton: {
    width: '20px',
    height: '20px',
    top: '10%',
    borderRadius: '50%',
    padding: '3px',
    color: colors.BLACK,
    backgroundColor: colors.WHITE,
    border: `1px solid ${colors.GRAY_BLUE}`,
  },
};
