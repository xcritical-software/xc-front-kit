import { CSSObject } from 'styled-components';

import { IThemeNamespace } from '@xcritical/theme';
import { ISelectBaseTheme } from '@xcritical/select';

import { ButtonGroupTheme, ButtonTheme } from '@xcritical/button';


export interface IPagination {
  currentPage?: number;
  showSizeChanger?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  visibleRange?: 3 | 5 | 7;
  total: number;
  onChangePage: (page: number) => void;
  onChangePageSize?: (page: number, pageSize: number) => void;
  theme?: IThemeNamespace<IPaginationTheme>;
}

export interface IPaginationTheme {
  wrapper?: CSSObject;
  buttonGroup?: ButtonGroupTheme;
  button?: ButtonTheme;
  select?: ISelectBaseTheme;
}

export interface IPageSizeOption {
  value: number;
  label: number;
}
