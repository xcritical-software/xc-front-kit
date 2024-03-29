import { colors } from '@xcritical/theme';

import { DrawerTheme } from './interfaces';

export const drawerThemeNamespace = '@xcritical\\drawer';

export const defaultDrawerTheme: DrawerTheme = {
  appearance: {
    default: {
      transition: '400ms',
      wrapper: {
        display: 'flex',
        height: '100vh',
        backgroundColor: colors.WHITE,
        zIndex: 100,
        position: 'fixed',
        top: 0,
      },
      contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      },
      headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexShrink: 0,
        overflow: 'hidden',
        flexDirection: 'row-reverse',
        padding: '10px',
      },
      titleWrapper: {
        display: 'flex',
        alignItems: 'center',
      },
      body: {
        overflowX: 'auto',
        padding: '10px',
      },
      separator: {
        marginRight: '-5px',
        width: '10px',
        height: '100vh',
        position: 'absolute',
        zIndex: 999999,
      },
      antiSelect: {
        position: 'absolute',
        top: '0',
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
      },
      closeIconWrapper: {
        border: 0,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: 0,
        height: 24,
        width: 24,
        cursor: 'pointer',
        hover: {
          backgroundColor: colors.GRAY_LIGHT,
        },
        active: {
          backgroundColor: colors.GRAY,
        },
      },
      blanketWrapper: {},
    },
  },
};
