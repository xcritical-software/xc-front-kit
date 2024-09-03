import { ReactElement, CSSProperties } from 'react';
import {
  ColumnSizingState,
  Header as RTHeader,
  RowSelectionState,
  SortingFnOption,
  SortingState,
  Table,
  VisibilityState,
} from '@tanstack/react-table';
import { VirtualItem } from '@tanstack/react-virtual';

import { ITheme, IThemeNamespace } from '@xcritical/theme';

import { GridPositions, GridSort } from './consts';

type CellContent = string | number | ReactElement | any;

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
  maxWidth?: number;
  minWidth?: number;
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
  sortingFn?: SortingFnOption<IItem>;

  sortOrder?: GridSort.ASC | GridSort.DESC | null;
}
export interface ITotals {
  [key: string]: string | number;
}

export interface IGridBaseProps {
  // props
  items: IItem[];
  columns: IColumn[];
  width?: number;
  height?: number;
  rowHeight?: number;
  overscan?: number;
  minColumnWidth?: number;
  // TODO: need to implement
  totals?: ITotals;
  getRowId?: (row: IItem) => string;

  // flags
  manualSorting?: boolean;
  enableSorting?: boolean;
  enableMultiSort?: boolean;
  disableSelect?: boolean;
  isMultiSelect?: boolean;
  shouldMovingColumns?: boolean;
  enableSubRowSelection?: boolean;
  shouldChangeColumnsWidth?: boolean;
  shouldFitContainer?: boolean;
  debugTable?: boolean;
  autoFitLastColumn?: boolean;

  // states
  columnVisibility?: VisibilityState;
  selectedRowKeys?: RowSelectionState;
  columnOrder?: string[];
  columnSizes?: ColumnSizingState;
  columnSorting?: SortingState;

  // callbacks
  onChangeColumnSorting?: (state: SortingState | undefined) => void;
  onChangeColumnsOrder?: (state: string[] | undefined) => void;
  onChangeColumnVisibility?: (state: VisibilityState | undefined) => void;
  onChangeColumnSizes?: (state: ColumnSizingState | undefined) => void;
  onSelect?: (state: RowSelectionState | undefined) => void;
  onChangeExpand?: Function;
}

export interface IGridProps extends IGridBaseProps {
  theme?: IThemeNamespace<IGridTheme>;
}

export interface IInternalGridProps extends IGridBaseProps {
  theme: ITheme<IGridTheme>;
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
  autoFitLastColumn: boolean;
  shouldChangeColumnsWidth: boolean;
  shouldMovingColumns: boolean;
}

export interface IHeaderWrapper {
  table: Table<IItem>;
  theme: IGridTheme;
  shouldChangeColumnsWidth: boolean;
  shouldMovingColumns: boolean;
  columnOrder: string[];
  autoFitLastColumn?: boolean;
  vcs: VirtualItem[];
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
  autoFitLastColumn: boolean;
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
  totalsCellBorder?: string;
  header?: CSSProperties;
  headerCellContent?: CSSProperties;
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
