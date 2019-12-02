import { ReactElement, CSSProperties } from 'react';
import { ITheme } from '@xcritical/theme';


export interface IItem {
  [key: string]: string | number | ReactElement | any /* сделать что то с этим */;
}
export interface IColumn {
  headerName: string;
  field: string;
  width: number;
  center?: boolean;
  isExpandable?: boolean;
}
export interface ITotals {
  [key: string]: string | number;
}
export interface IGrig {
  items: IItem[];
  columns: IColumn[];
  width: number;
  height: number;
  isDisableSelect?: boolean;
  isMultiSelect?: boolean;
  onChangeColumns?: Function;
  totals?: ITotals;
  theme?: ITheme;
  onSelect?: Function;
  shouldMovingColumns?: boolean;
  shouldChangeColumnsWidth?: boolean;
}
export interface IMappedItem extends IItem {
  key: string;
  expandLevel: number;
}

export interface IHeaderCellWrapper {
  text: string;
  width: number;
  onChangeWidth: Function;
  index: number;
  onMouseDown: Function;
  isEmpty: boolean;
  changeChangingColumns: Function;
  center: boolean;
  theme: IGridTheme;
  shouldChangeColumnsWidth: boolean;
  shouldMovingColumns: boolean;
}

export interface IHeaderWrapper {
  fullWidth: number;
  translateX: number;
  columns: IColumn[];
  onChangeWidth: Function;
  onChangeMoving: Function;
  changeChangingColumns: Function;
  theme: IGridTheme;
  shouldMovingColumns: boolean;
  shouldChangeColumnsWidth: boolean;
}

export type StrOrNum = string | number;

export interface IHeader {
  theme: IGridTheme;
  translateX: number;
  width: number;
}

export interface ITotal {
  theme: IGridTheme;
  translateX: number;
  width: number;
}

export interface IHeaderCell {
  theme: IGridTheme;
  width: number;
}

export interface ITotalCell {
  theme: IGridTheme;
  width: number;
}

export interface IHeaderCellContent {
  theme: IGridTheme;
  center: boolean;
  shouldMovingColumns: boolean;
  isEmpty?: boolean;
}
export interface ITotalCellContent {
  theme: IGridTheme;
  center: boolean;
}
export interface IRightBorder {
  isEmpty: boolean;
  theme: IGridTheme;
  shouldChangeColumnsWidth: boolean;
}
export interface IBodyCellContent {
  theme: IGridTheme;
  expandLevel: number;
  center: boolean;
}
export interface IBodyCellOffset {
  theme: IGridTheme;
  expandLevel: number;
}
export interface IWrapper {
  theme: IGridTheme;
  width: number;
  changingColumns: string;
}

export interface IMovingElem {
  theme: IGridTheme;
  mouseMove: number;
  center: boolean;
  startCoord: {
    x: number;
    y: number;
    height: number;
  };
}

export interface IGridTheme {
  evenRowBackground: string;
  selectedRowColor: string;
  offsetExpand: number;
  border: string;
  headerCellBorder: string;
  totalsCellBorder: string;
  header: CSSProperties;
  row: CSSProperties;
  totals: CSSProperties;
  emptyHeaderCellBackgroung: string;
  movingHeaderCellBackgroung: string;
  borderRadius: string;
  rowCellBorder: string;
}
