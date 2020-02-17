import { ReactElement, CSSProperties, RefObject } from 'react';
import { ITheme } from '@xcritical/theme';
import { CellMeasurerCache } from 'react-virtualized';


export interface IItem {
  [key: string]: string | number | ReactElement | any;
}

type fixedPositionType = 'left' | 'right';
export interface IColumn {
  headerName: string;
  field: string;
  width: number;
  visible: boolean;
  center?: boolean;
  isExpandable?: boolean;
  render?: Function;
  fixedPosition?: fixedPositionType;
}
export interface ITotals {
  [key: string]: string | number;
}

export interface IGridHOC {
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
  shouldChangeLeftColumnsWidth?: boolean;
  shouldChangeRightColumnsWidth?: boolean;
  shouldFitContainer?: boolean;
  rowHeight?: number;
}


export interface IMultiGrid {
  width: number;
  height: number;
  shouldMovingColumns?: boolean;
  shouldChangeColumnsWidth?: boolean;
  shouldChangeLeftColumnsWidth?: boolean;
  shouldChangeRightColumnsWidth?: boolean;
  leftMappedColumns: IColumn[];
  centerMappedColumns: IColumn[];
  rightMappedColumns: IColumn[];
  setLeftMappedColumns: Function;
  setCenterMappedColumns: Function;
  setRightMappedColumns: Function;
  leftFixedWidth: number;
  rightFixedWidth: number;
  wrapperSize: { width: number; height: number };
  scrollTop: number;
  onScroll: Function;
  allGridsProps: IAllGridsProps;
}

interface IAllGridsProps {
  totals?: any;
  onChangeExpand: Function;
  handleSelect: Function;
  selectedRows: string[];
  mappedItems: IMappedItem[];
  cacheRef: RefObject<CellMeasurerCache>;
  themeRef: RefObject<IGridTheme>;
  rowHeight?: number;
}


export interface IGrid {
  mappedItems: IMappedItem[];
  width: number;
  height: number;
  onChangeColumns?: Function;
  totals?: ITotals;
  theme?: ITheme;
  shouldMovingColumns?: boolean;
  shouldChangeColumnsWidth?: boolean;
  onScrollsyncScroll?: Function;
  scrollTop?: number;
  rightScroll?: boolean;
  bottomScroll?: boolean;
  onChangeExpand: Function;
  handleSelect: Function;
  selectedRows: string[];
  cacheRef: any;
  themeRef: any;
  rowHeight?: number;
  setGridHOCMappedColumns: any;
  gridHOCMappedColumns: any;
  resizeGridAfterResizeLastColumn?: boolean;
  gridPosition: 'left' | 'center' | 'right';
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
  rowHeight?: number;
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
