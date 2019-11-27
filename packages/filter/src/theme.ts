import { darken, lighten } from 'polished';
import { IFilterTheme } from './interfaces';


export const filterThemeNamespace = '@xcritical\\filter';

export const defaultTheme: IFilterTheme = {
  topPanel: {
    background: 'lightblue',
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
    background: lighten(0.15, 'lightblue'),
  },
  filterPanelButtons: {
    margin: '30px auto',
  },
};
