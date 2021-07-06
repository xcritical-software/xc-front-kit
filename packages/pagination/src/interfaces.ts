import { CSSObject } from 'styled-components';

import { IThemeNamespace } from '@xcritical/theme';
import { ISelectBaseTheme, SelectProps } from '@xcritical/select';
import { ButtonGroupTheme, ButtonTheme } from '@xcritical/button';

export interface IPagination {
  currentPage?: number;
  showSizeChanger?: boolean;
  showTotals?: boolean;
  disabled?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  pageSizeProps?: SelectProps;
  visibleRange?: 3 | 5 | 7;
  total: number;
  onChangePage: (page: number) => void;
  onChangePageSize?: (page: number, pageSize: number) => void;
  theme?: IThemeNamespace<IPaginationTheme>;
}

export interface IPaginationTheme {
  wrapper?: CSSObject;
  totals?: CSSObject;
  buttonGroup?: ButtonGroupTheme;
  button?: ButtonTheme;
  select?: ISelectBaseTheme;
}

export interface IPageSizeOption {
  value: number;
  label: number;
}

export interface ITotalsProps {
  currentPage: number;
  pageSize: number;
  total: number;
}
