import { ReactElement, CSSProperties } from 'react';
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
  theme?: ITheme<IGridTheme>;
  onSelect?: OnChangeFn<RowSelectionState | undefined>;
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
  selectedRowKeys?: RowSelectionState;
  isClientSort?: boolean;
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

export interface IPinnedProps {
  pinned: false | 'left' | 'right';
  isFirstPinned: boolean;
  pinPagging?: number;
}

export interface IHeaderCell extends IPinnedProps {
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
  even: boolean;
  selected?: boolean;
  rowHeight?: number;
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
