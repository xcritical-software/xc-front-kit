import { colors } from '@xcritical/theme';

import { SwitchTheme } from './interfaces';


export const switchThemeNamespace = '@xcritical\\switch';

const SIZE_IDENT = '2px';

export const defaultSwitchTheme: SwitchTheme = {
  appearance: {
    default: {
      label: {
        alignItems: 'center',
        height: '22px',
        cursor: 'pointer',
        transition: '0.2s ease-in-out all',
        disabled: {
          cursor: 'not-allowed',
        },
      },

      labelText: {
        leftPosition: {
          marginRight: '5px',
        },
        rightPosition: {
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
        flexShrink: 0,
        checked: {
          backgroundColor: colors.PRIMARY,
          color: colors.PRIMARY,
        },
        disabled: {
          opacity: '0.3',
          cursor: 'not-allowed',
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
        borderRadius: 9,
        backgroundColor: colors.WHITE,
        checked: {
          left: `calc(100% - ${SIZE_IDENT})`,
          transform: 'translateX(-100%)',
        },
      },
    },
  },
};
