import { ReactElement, CSSProperties, RefObject } from 'react';
import { Alignment } from 'react-virtualized';

import { ITheme } from '@xcritical/theme';

import { GridPositions, GridSort } from './consts';

type CellContent = string | number | ReactElement | any;

export interface IInternalGridProps {
  'aria-label'?: string;
  'aria-readonly'?: boolean;
  className?: string;
  containerProps?: object;
  containerRole?: string;
  containerStyle?: CSSProperties;
  id?: string;
  isScrolling?: boolean;
  scrollingResetTimeInterval?: number;
  scrollLeft?: number;
  scrollToAlignment?: Alignment;
  scrollToColumn?: number;
  scrollTop?: number;
  scrollToRow?: number;
  style?: CSSProperties;
  tabIndex?: number | null;
}

export interface IItem {
  [key: string]: CellContent;
}

export interface ICellRenderParams {
  parentItem?: IItem;
  key: string;
  isExpanded?: boolean;
  expandLevel: number;
}

export interface IColumn {
  headerName: CellContent;
  field: string;
  width: number;
  visible: boolean;
  center?: boolean;
  isExpandable?: boolean;
  render?: (
    content: any,
    field: string,
    row: IMappedItem,
    rowIndex: number,
    params: ICellRenderParams
  ) => CellContent;
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
  onSortChanged?: Function;
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
  shouldFitLastColumn?: boolean;
  minColumnWidth?: number;
  gridProps?: IInternalGridProps;
  onChangeExpand?: Function;
  selectedRowIds?: string[] | number[];
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
  shouldFitLastColumn: boolean;
}

interface IAllGridsProps {
  totals?: IItem;
  onChangeExpand: (rowIndex: number, chidrens: IItem[], parent: IItem) => void;
  handleSelect: Function;
  selectedRows: string[];
  mappedItems: IMappedItem[];
  themeRef: RefObject<IGridTheme>;
  rowHeight?: number;
  minColumnWidth: number;
  onChangeSort: Function;
  gridProps: IInternalGridProps;
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
  onChangeExpand: (
    rowIndex: number,
    chidrens: IMappedItem[],
    parent: IMappedItem
  ) => void;
  mappedItems: IMappedItem[];
  selectedRows: string[];
  themeRef: RefObject<IGridTheme>;
  rowHeight?: number;
  overscanColumnCount?: number;
  isScrollingOptOut?: boolean;
  overscanRowCount?: number;
  shiftFirstColumn: boolean;
  onChangeSort: Function;
  shouldFitLastColumn: boolean;
  minColumnWidth: number;
  gridProps: IInternalGridProps;
  selectedRowKeys?: string[];
}

export interface IMappedItem extends IItem {
  __key: string;
  __expandLevel: number;
  __parent?: IMappedItem;
  __isExpand?: boolean;
}

export interface IHeaderCellWrapper {
  content: CellContent;
  width: number;
  minColumnWidth: number;
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
  minColumnWidth: number;
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
