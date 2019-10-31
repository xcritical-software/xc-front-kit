
import * as colors from '@xcritical/theme';
import { rgba } from 'polished';
import { IFilterTheme } from './utils';


export const filterThemeNamespace = '@xcritical\\xc-filter';

export const defaultTheme: IFilterTheme = {
  backgroundTopPanel: 'red',
  tag: {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 8,
    },
    margin: {
      top: 0,
      right: 10,
      bottom: 4,
      left: 10,
    },
    border: {
      radius: 6,
      color: colors.BLACK_RAISIN,
      style: 'solid',
      width: 1,
    },
    backgroundColor: rgba(0, 0, 0, 0),
    font: 'italic 400 12px/30px Georgia, serif',
  },
  buttonsAppearances: {
    more: 'info',
    apply: 'success',
    add: 'primary',
    reset: 'danger',
  },
};
