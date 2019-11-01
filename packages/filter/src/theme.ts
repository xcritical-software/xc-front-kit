
import * as colors from '@xcritical/theme';
import { rgba } from 'polished';
import { IFilterTheme } from './utils';


export const filterThemeNamespace = '@xcritical\\xc-filter';

export const defaultTheme: IFilterTheme = {
  backgroundTopPanel: 'red',
  tag: {
    padding: '0px 0px 0px 8px',
    margin: '0px 10px 4px 10px',
    borderRadius: '6px',
    border: `1px ${colors.BLACK_RAISIN} solid`,
    backgroundColor: rgba(0, 0, 0, 0),
    fontSize: '16px',
  },
};
