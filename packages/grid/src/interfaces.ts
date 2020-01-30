import { ReactElement, CSSProperties } from 'react';
import { ITheme } from '@xcritical/theme';


export interface IItem {
  [key: string]: string | number | ReactElement | any;
}

export interface IColumn {
  headerName: string;
  field: string;
  width: number;
  visible: boolean;
  center?: boolean;
  isExpandable?: boolean;
  render?: Function;
}
export interface ITotals {
  [key: string]: string | number;
}
export interface IGrid {
  items: IItem[];
  columns: IColumn[];
  width?: number;
  height?: number;
  isDisableSelect?: boolean;
  isMultiSelect?: boolean;
  onChangeColumns?: Function;
  totals?: ITotals;
  theme?: ITheme;
  onSelect?: Function;
  shouldMovingColumns?: boolean;
  shouldChangeColumnsWidth?: boolean;
  shouldFitContainer?: boolean;
  onScrollsyncScroll?: any;
  scrollTop?: number;
  rightScroll?: boolean
  bottomScroll?: boolean
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
  setChangingColumns: Function;
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
  setChangingColumns: Function;
  theme: IGridTheme;
  shouldMovingColumns: boolean;
  shouldChangeColumnsWidth: boolean;
}


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
  isEmpty: boolean;
}

export interface ITotalCell {
  theme: IGridTheme;
  width: number;
}

export interface IHeaderCellContent {
  theme: IGridTheme;
  center: boolean;
  shouldMovingColumns: boolean;
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
  center: boolean;
  selected: boolean;
}
export interface IBodyCellOffset {
  theme: IGridTheme;
  expandLevel: number;
  center: boolean;
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
  width: number;
}

export interface IGridTheme {
  evenRowBackground?: string;
  selectedRowBackgroundColor?: string;
  offsetExpand?: number;
  border?: string;
  headerCellBorder?: string;
  totalsCellBorder?: string;
  header?: CSSProperties;
  row?: CSSProperties;
  totals?: CSSProperties;
  emptyHeaderCellBackground?: string;
  movingHeaderCellBackgroungColor?: string;
  borderRadius?: number;
  rowCellBorder?: string;
  selectedRowColor?: string;
  movingHeaderCellColor?: string;
  expandButtonMargin?: string;
}
