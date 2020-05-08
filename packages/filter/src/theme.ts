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
};
