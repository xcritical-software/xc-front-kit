import { colors } from '@xcritical/theme';

import { IPaginationTheme } from './interfaces';


export const paginationThemeNamespace = '@xcritical\\pagination';

export const defaultPaginationTheme: IPaginationTheme = {
  wrapper: {
    display: 'inline-flex',
  },
  totalInfo: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '15px',
  },
  buttonGroup: {
    borderRadius: '5px',
  },
  button: {
    borderColor: colors.PRIMARY,
    selected: {
      background: colors.WHITE,
      borderColor: colors.PRIMARY,
      color: `${colors.PRIMARY} !important`,
    },
    hover: {
      background: colors.WHITE,
    },
    active: {
      background: colors.WHITE,
      borderColor: colors.PRIMARY,
      color: colors.PRIMARY,
      boxShadowColor: 'transparent',
    },
  },
  select: {
    width: '120px',
    container: {
      marginLeft: '15px',
    },
    button: {
      borderColor: colors.PRIMARY,
    },
  },
};
