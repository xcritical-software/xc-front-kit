import { colors } from '@xcritical/theme/src';

import { SwitchTheme } from './interfaces';


export const switchThemeNamespace = '@xcritical\\switch';

const SIZE_IDENT = '2px';

export const defaultSwitchTheme: SwitchTheme = {
  label: {
    alignItems: 'center',
    height: '22px',
    cursor: 'pointer',
    transition: '0.2s ease-in-out all',
  },

  labelText: {
    left: {
      marginRight: '5px',
    },
    right: {
      marginLeft: '5px',
    },
  },

  container: {
    position: 'relative',
    backgroundColor: colors.GRAY_BLUE,
    color: colors.GRAY_BLUE,
    display: 'inline-flex',
    alignItems: 'center',
    width: '44px',
    height: '100%',
    transition: 'inherit',
    borderRadius: '1rem',
    checked: {
      backgroundColor: colors.PRIMARY,
      color: colors.PRIMARY,
    },
    disabled: {
      opacity: '0.3',
    },
  },

  handle: {
    position: 'absolute',
    display: 'inline-flex',
    width: '18px',
    height: '18px',
    margin: ' auto 0',
    top: SIZE_IDENT,
    left: SIZE_IDENT,
    transition: 'inherit',
    checked: {
      left: `calc(100% - ${SIZE_IDENT})`,
      transform: 'translateX(-100%)',
    },
  },

  handleItem: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.WHITE,
    borderRadius: '9px',
    position: 'inherit',
    transition: 'inherit',
    display: 'inline-flex',
  },
};
