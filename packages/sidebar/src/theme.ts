import { colors } from '@xcritical/theme';

import { ISidebarTheme } from './interfaces';

export const sidebarThemeNamespace = '@xcritical\\sidebar';

export const defaultSidebarTheme: ISidebarTheme = {
  rootContainer: {
    zIndex: 1000,
    height: '100%',
    minHeight: '100vh',
  },
  sidebarContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    color: colors.CHAROCOAL,
    height: '100vh',
    position: 'fixed',
    zIndex: 100,
    transition: '.5s',
    padding: 0,
  },
  navContainer: {
    backgroundColor: colors.GRAY_LIGHT,
    height: 'calc(100vh + 10px)',
  },
  responsiveContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexWrap: 'nowrap',
    color: colors.CHAROCOAL,
    transition: '.5s',
  },
  childContainer: {
    backgroundColor: colors.GRAY_LIGHT,
    overflowY: 'auto',
    overflowX: 'hidden',
    color: colors.CHAROCOAL,
    transition: '.5s',
  },
  separatorContainer: {
    height: '100vh',
    cursor: 'w-resize',
    zIndex: 999999,
  },
  separator: {
    color: colors.CHAROCOAL,
    width: '2px',
    height: '100%',
    backgroundColor: colors.BLUE,
  },
  closeOpenButton: {
    width: '20px',
    height: '20px',
    position: 'relative',
    top: '10%',
    color: 'black',
    borderRadius: '50%',
    border: '1px solid gray',
    padding: '3px',
    backgroundColor: 'white',
    transition: '.5s',
    transitionTimingFunction: 'linear',
    cursor: 'pointer',
  },
};
