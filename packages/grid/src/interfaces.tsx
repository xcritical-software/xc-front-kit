export type Column = {
  title: string;
  width: number;
  order: number;
  render: Function | null;
  field: string;
}

export interface ITable {
  rows: object[];
  columns: Column[];
  theme: any;
}

export type TableProps = {
  rows: object[];
  columns: Column[];
  theme: any;
}

export interface IRow {
  row: object;
  isSelected: boolean;
  rowId: number;
  onChangeActiveRow: Function;
  columns: object[];
  theme: any;
}

export interface IStyledCell {
  width: number;
  theme: any;
}

export interface IHeaderStyled {
  width: number;
  theme: any;
}

export interface IStyledRow {
  isSelected: boolean;
  theme: any;
}

export interface IHead {
  theme: any;
}

export interface IContentWrapper {
  theme: any;
}

export interface IHeader {
  columnName: string;
  width: number;
  theme: any;
}

export type HeaderPros = {
  columnName: string;
  width: number;
  theme: any;
}
