import { colors } from '@xcritical/theme';

import { DrawerTheme } from './interfaces';


export const drawerThemeNamespace = '@xcritical\\drawer';

export const defaultDrawerTheme: DrawerTheme = {
  appearance: {
    default: {
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      borderRadius: 0,
      backgroundColor: colors.WHITE,
      color: colors.CHAROCOAL,
      fontWeight: 600,
      drawerWrapper: {
        backgroundColor: colors.WHITE,
        display: 'flex',
        height: '100vh',
        top: 0,
        overflow: 'hidden',
        position: 'fixed',
        zIndex: 100,
      },
      separatorWrapper: {
        backgroundColor: colors.WHITE,
        width: '10px',
        height: '100vh',
        zIndex: 999999,
      },
      separator: {
        color: colors.CHAROCOAL,
        width: '2px',
        height: '100%',
        position: 'relative',
        backgroundColor: 'transparent',
      },
      drawerContent: {
        boxSizing: 'border-box',
      },
      iconWrapper: {
        alignItems: 'center',
        background: 0,
        border: 0,
        borderRadius: '50%',
        color: 'inherit',
        display: 'flex',
        fontSize: 'inherit',
        height: 24,
        justifyContent: 'center',
        lineHeight: 1,
        marginBottom: 12,
        padding: 0,
        width: 24,
        hover: {
          backgroundColor: colors.GRAY_LIGHT,
        },
        active: {
          backgroundColor: colors.GRAY,
        },
      },
    },
  },
};
