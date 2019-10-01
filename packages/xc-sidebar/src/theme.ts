import * as colors from './colors';

import { generateApperance } from './utils/themeTools';


export const sidebarThemeNamespace = '@xcritical\\xc-sidebar';

export const sidebarThemeStyle = {
  appearance: {
    default: generateApperance({
      leftBackground: colors.GRAY_LIGHT,
      rightBackground: colors.GRAY_LIGHT,
      color: colors.CHAROCOAL,
      separatorColor: colors.BLUE,
      minWidth: 30,
      maxWidth: 400,
      leftWidth: 91,
    }),
    primary: generateApperance({ background: colors.PRIMARY, color: colors.WHITE }),
    secondary: generateApperance({ background: colors.SECONDARY, color: colors.WHITE }),
    success: generateApperance({ background: colors.SUCCESS, color: colors.WHITE }),
    danger: generateApperance({ background: colors.DANGER, color: colors.WHITE }),
    warning: generateApperance({ background: colors.WARNING, color: colors.WHITE }),
    info: generateApperance({ background: colors.INFO, color: colors.WHITE }),
    dark: generateApperance({ background: colors.DARK, color: colors.WHITE }),
    light: generateApperance({ background: colors.LIGHT, color: colors.CHAROCOAL }),
    rightBackground: 'red',
  },
};


export const staticStyles = {
  minWidth: 30,
  maxWidth: 400,
  separatorColor: 'lightblue',
  leftWidth: 91,
  color: 'white',
  rightBackground: '#31394C',
  leftBackground: '#31394C',
};
