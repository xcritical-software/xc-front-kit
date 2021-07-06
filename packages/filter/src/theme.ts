import { colors } from '@xcritical/theme';

import { IFilterTheme } from './interfaces';

export const filterThemeNamespace = '@xcritical\\filter';

export const defaultTheme: IFilterTheme = {
  prefix: {
    marginRight: '15px',
  },
  postfix: {
    marginLeft: '15px',
  },
  validationError: {
    marginTop: '5px',
    color: colors.DANGER,
  },
  tagConditions: {
    maxHeight: '300px',
    overflow: 'auto',
  },
  tagConditionSelectZIndex: 300,
  dropdownBlanketZIndex: 100,
  popover: {
    content: {
      backgroundColor: colors.WHITE,
      boxShadow:
        'rgba(13, 22, 38, 0.1) 0px 0px 0px 1px, rgba(13, 22, 38, 0.1) 0px 4px 11px',
      borderRadius: '4px',
      zIndex: 200,
    },
  },
};
