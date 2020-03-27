import { ReactElement, CSSProperties, RefObject } from 'react';
import { ITheme } from '@xcritical/theme';
import { CellMeasurerCache } from 'react-virtualized';
import { GridPositions, GridSort } from './consts';


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
  fixedPosition?: GridPositions.LEFT | GridPositions.RIGHT;
  sortable?: boolean;
  sortOrder?: GridSort.ASC | GridSort.DESC | null;
}
export interface ITotals {
  [key: string]: string | number;
}

export interface IGridProps {
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
  isScrollingOptOut?: boolean;
  overscanColumnCount?: number;
  overscanRowCount?: number;
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
  scrollTop: number;
  onScroll: Function;
  allGridsProps: IAllGridsProps;
  isScrollingOptOut?: boolean;
  overscanColumnCount?: number;
  overscanRowCount?: number;
}

interface IAllGridsProps {
  totals?: IItem;
  onChangeExpand: Function;
  handleSelect: Function;
  selectedRows: string[];
  mappedItems: IMappedItem[];
  cacheRef: RefObject<CellMeasurerCache>;
  themeRef: RefObject<IGridTheme>;
  rowHeight?: number;
  onChangeSort: Function;
}


export interface IInternalGrid {
  rightScroll?: boolean;
  bottomScroll?: boolean;
  width: number;
  height: number;
  shouldMovingColumns?: boolean;
  shouldChangeColumnsWidth?: boolean;
  scrollTop?: number;
  onScrollsyncScroll?: Function;
  setGridHOCMappedColumns: Function;
  gridHOCMappedColumns: IColumn[];
  resizeGridAfterResizeLastColumn?: boolean;
  gridPosition: GridPositions;
  onChangeColumns?: Function;
  totals?: ITotals;
  handleSelect: Function;
  onChangeExpand: Function;
  mappedItems: IMappedItem[];
  selectedRows: string[];
  cacheRef: RefObject<CellMeasurerCache>;
  themeRef: RefObject<IGridTheme>;
  rowHeight?: number;
  overscanColumnCount?: number;
  isScrollingOptOut?: boolean;
  overscanRowCount?: number;
  shiftFirstColumn: boolean;
  onChangeSort: Function;
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
  sortable?: boolean;
  sortOrder?: GridSort.ASC | GridSort.DESC | null;
  gridPosition: GridPositions;
  onChangeSort: Function;
}

export interface IHeaderWrapper {
  fullWidth: number;
  translateX: number;
  columns: IColumn[];
  onChangeWidth: Function;
  onChangeColumns: Function;
  setChangingColumns: Function;
  theme: IGridTheme;
  shouldMovingColumns: boolean;
  shouldChangeColumnsWidth: boolean;
  gridPosition: GridPositions;
  onChangeSort: Function;
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
  sortIconSize?: number | string;
}
