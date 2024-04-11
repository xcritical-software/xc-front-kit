import { ReactElement, CSSProperties, RefObject } from 'react';
import { Alignment } from 'react-virtualized';
import {
  OnChangeFn,
  Header as RTHeader,
  RowSelectionState,
  Table,
} from '@tanstack/react-table';

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
  footer?: CellContent;
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
  resizable?: boolean;
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
  disableSelect?: boolean;
  isMultiSelect?: boolean;
  onChangeColumns?: Function;
  onSortChanged?: Function;
  totals?: ITotals;
  theme?: ITheme;
  onSelect?: OnChangeFn<RowSelectionState>;
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
  selectedRowKeys?: string[];
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
}

export interface IMappedItem extends IItem {
  __key: string;
  __expandLevel: number;
  __parent?: IMappedItem;
  __isExpand?: boolean;
}

export interface IHeaderCellWrapper {
  header: RTHeader<object, unknown>;
  theme: IGridTheme;
  shouldChangeColumnsWidth: boolean;
  shouldMovingColumns: boolean;
}

export interface IHeaderWrapper {
  table: Table<IItem>;
  theme: IGridTheme;
  shouldChangeColumnsWidth: boolean;
  shouldMovingColumns: boolean;
  columnOrder: string[];
}

export interface IHeader {
  theme: IGridTheme;
}

export interface ITotal {
  theme: IGridTheme;
  translateX: number;
  width: number;
}

export interface IHeaderCell {
  theme: IGridTheme;
  isDragging: boolean;
  $width: number;
  isEmpty?: boolean;
  transform?: string;
  shouldChangeColumnsWidth: boolean;
}

export interface ITotalCell {
  theme: IGridTheme;
  width: number;
}

export interface IHeaderCellContentWrapper {
  theme: IGridTheme;
  center?: boolean;
  canSort?: boolean;
}
export interface IHeaderCellContent {
  theme: IGridTheme;
  center?: boolean;
}
export interface ITotalCellContent {
  theme: IGridTheme;
  center: boolean;
}

export interface ITBody {
  theme: IGridTheme;
  height: number;
}
export interface IRow {
  theme: IGridTheme;
  translateY: number;
}

export interface IBodyCellContentWrapper {
  theme: IGridTheme;
  center?: boolean;
  rowHeight?: number;
}

export interface IRightBorder {
  theme: IGridTheme;
  shouldChangeColumnsWidth: boolean;
}
export interface IBodyCellContent {
  theme: IGridTheme;
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
  $width: number;
  $height: number;
  changingColumns?: string;
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
