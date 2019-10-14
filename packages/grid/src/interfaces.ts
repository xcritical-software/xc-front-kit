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
  theme?: any;
}

export interface ITableProps {
  rows: object[];
  columns: IColumn[];
  theme?: any;
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

export interface IHeaderStyled {
  width: number;
  theme: ITableTheme;
}

export interface IStyledRow {
  isSelected: boolean;
  theme: ITableTheme;
}

export interface IHead {
  theme: ITableTheme;
}

export interface IContentWrapper {
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
