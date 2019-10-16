import { IThemeNamespace } from '@xcritical/theme';
import { ITableTheme } from './components/utils/get-styles';


export interface IColumn {

  title: string;
  width: number;
  order: number;
  render: Function | null;
  field: string;
}

export interface ITable {
  rows: object[];
  columns: IColumn[];
  theme?: IThemeNamespace;
}


export interface ITableProps {
  rows: object[];
  columns: IColumn[];
  theme?: IThemeNamespace;
}

export interface IRow {
  row: object;
  isSelected: boolean;
  rowId: number;
  onChangeActiveRow: Function;
  columns: object[];
  theme: ITableTheme;
}

export interface IStyledCell {
  width: number;
  theme: ITableTheme;
}

export interface IStyledRow {
  isSelected: boolean;
  theme: ITableTheme;
}

export interface IHeader {
  columnName: string;
  width: number;
  theme: ITableTheme;
}

export interface IHeaderPros {
  columnName: string;
  width: number;
  theme: ITableTheme;
}

export interface IRowData {
  id: number;
  [key: string]: string | number | boolean | undefined | number[] | null;
}

export interface IRowProps {
  row: IRowData;
  isSelected: boolean;
  rowId: number;
  onChangeActiveRow: Function;
  columns: object[];
  theme: ITableTheme;
}
