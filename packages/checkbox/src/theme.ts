import { colors } from '@xcritical/theme';

import { CheckboxTheme } from './interfaces';


export const checkboxThemeNamespace = '@xcritical\\checkbox';

export const defaultCheckboxTheme: CheckboxTheme = {
  checkboxLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkboxWrapper: {
    backgroundColor: colors.WHITE,
    paddingBottom: '4px',
    paddingLeft: '4px',
    paddingRight: '4px',
    paddingTop: '4px',
    marginRight: '8px',
    borderRadius: '4px',
    color: colors.CHAROCOAL,
    border: `1px solid ${colors.CHAROCOAL}`,
  },
  checkbox: {
    backgroundColor: colors.CHAROCOAL,
    borderRadius: '4px',
    width: '16px',
    height: '16px',
    transition: 'background-color 0.1s ease-in-out',
  },
};
