import { darken } from 'polished';
import { colors } from '@xcritical/theme';

import { IFilterTheme } from './interfaces';


export const filterThemeNamespace = '@xcritical\\filter';

export const defaultTheme: IFilterTheme = {
  topPanel: {
    background: 'transparent',
    paddingRight: '20px',
  },
  tag: {
    padding: '0px 0px 0px 8px',
    margin: '0px 10px 4px 10px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: darken(0.15, 'lightblue'),
    fontSize: '16px',
    fontWeight: 400,
  },
  filtersPanel: {
    border: `1px solid ${colors.GRAY}`,
    background: colors.GRAY_LIGHT,
    borderRadius: '3px',
  },
  filterPanelButtons: {
    margin: '30px auto',
  },
};
