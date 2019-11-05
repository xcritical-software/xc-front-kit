import { IThemeNamespace, ITheme } from '@xcritical/theme';


interface ICell {
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  borderRightWidth?: string;
  borderRightColor?: string;
  borderRightStyle?: string;
}

interface IHead {
  backgroundColor?: string;
  hoverColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  borderRightWidth?: string;
  borderRightColor?: string;
}

export interface ITableData {
  textOverflow?: string;
  multiline?: boolean;
}

export interface ITableTheme extends ITheme {
  width?: string;
  tableHeight?: string;
  rowColor?: string;
  evenRowColor?: string;
  activeRowColor?: string;
  headerBackgroundColor?: string;
  headerHoverColor?: string;
  cell?: ICell;
  head?: IHead;
  buttonShift?: string;
  nexLevelLineSift?: number;
  rowSwitchButtonSize?: string;
  tableData?: ITableData;
}


export interface IColumn {
  isExpandable?: boolean;
  title: string;
  width: string;
  order: number;
  render: Function | null;
  field: string;
}

export interface ITable {
  rows: object[];
  columns: IColumn[];
  theme?: IThemeNamespace;
  multiline?: boolean;

}


export interface ITableProps {
  rows: object[];
  columns: IColumn[];
  theme?: IThemeNamespace;
  multiline?: boolean;
}

export interface IRow {
  row: IRowData;
  columns: object[];
  theme: ITableTheme;
  level: number;
  selectedRows?: IRow;
  handleSelectRows: Function;
  getSelectedRows?: Function;
  id?: string | number;
  multiline?: boolean;
}

export interface IStyledCell {
  width: string;
  theme: ICell;
}

export interface IStyledHead {
  width: string;
  theme: IHead;
}

export interface IStyledRow {
  isSelected: boolean;
  theme: ITableTheme;
}

export interface IHeader {
  columnName: string;
  width: string;
  theme: ITableTheme;
}

export interface IHeaderPros {
  columnName: string;
  width: string;
  theme: ITableTheme;
}

export interface IRowData {
  id: string;
  children?: object[];
  [key: string]: string | number | boolean | undefined | number[] | null | object;
}

export interface IRowShift {
  width?: string;
  backgroundColor?: string;
}
