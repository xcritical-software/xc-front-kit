import { IThemeNamespace, ITheme } from '@xcritical/theme';


interface IPadding{
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

interface IBorder {
  width?: string;
  color?: string;
  style?: string;
}

interface IFont {
  size?: string;
  weight?: string;
  color?: string;
}

interface ICell {
  borderRight?: IBorder;
  padding?: IPadding;
  font?: IFont;
}

interface IHead {
  font: IFont;
  padding: IPadding;
  backgroundColor: string;
  hoverColor: string;
}

export interface ITableData {
  textOverflow?: string;
  multiline?: boolean;
}

export interface ITableTheme extends ITheme {
  width?: string;
  tableHeight?: string;
  headBorderBottom?: IBorder;
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
  width: number;
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
  width: number;
  theme: ICell;
}

export interface IStyledHead {
  width: number;
  theme: IHead;
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
  children?: object[];
  [key: string]: string | number | boolean | undefined | number[] | null | object;
}

export interface IRowShift {
  width?: string;
  backgroundColor?: string;
}
