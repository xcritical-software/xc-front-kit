/* eslint-disable no-nested-ternary */
import {
  Cell,
  Column,
  ColumnDef,
  ColumnSizingState,
  Row,
  SortingState,
} from '@tanstack/react-table';

import { getThemedState, IThemeNamespace } from '@xcritical/theme';

import { gridThemeNamespace, defaultTheme } from './theme';
import { IGridTheme, IColumn, IItem } from './interfaces';

export function gridTheme(
  theme: IThemeNamespace,
  propertyPath?: string | undefined
): IGridTheme {
  const func = getThemedState(gridThemeNamespace, defaultTheme);

  return func(theme, propertyPath) as IGridTheme;
}

export const cellRenderMapper = (
  value: any,
  column: Column<any>,
  row: Row<any>,
  renderFn?: Function
) => {
  if (!renderFn) return value;

  return renderFn(value, column.id, row.original, row.index, row);
};
export type ColumnDefWithBase<T> = ColumnDef<T> & { _base: IColumn };
export const mappingColumns = (
  columns: IColumn[],
  options: { minColumnWidth?: number }
): ColumnDefWithBase<IItem>[] =>
  columns.map((column) => ({
    id: column.field,
    accessorKey: column.field,
    header: column.headerName,
    size: column.width,
    maxSize: column.maxWidth,
    minSize: column.minWidth || options.minColumnWidth,

    cell: ({ cell, getValue }) => {
      const value = getValue();

      return column.render
        ? cellRenderMapper(value, cell.column, cell.row, column.render)
        : value ?? '';
    },
    sortingFn: column.sortingFn || 'auto',
    sortable: column.sortable,
    resizable: column.resizable === undefined ? true : column.resizable,
    filterable: false,
    groupable: false,
    aggregatable: false,
    footer: column.footer,
    _base: column,
  }));

export const getPinnedProps = (column: Column<any>) => {
  const pinned = column.getIsPinned();
  const isFirstPinned =
    pinned === 'left'
      ? column.getIsLastColumn('left')
      : pinned === 'right'
      ? column.getIsFirstColumn('right')
      : false;
  const pinPagging =
    pinned === 'left'
      ? column.getStart('left')
      : pinned === 'right'
      ? column.getAfter('right')
      : undefined;

  return {
    pinned,
    isFirstPinned,
    pinPagging,
  };
};

export const getBaseColls = (cell: Cell<IItem, unknown>) =>
  (cell.column.columnDef as ColumnDefWithBase<IItem>)._base;

export const getChangedColumns = (
  columns: IColumn[],
  columnOrder: string[],
  columnSize: ColumnSizingState,
  columnSorting: SortingState
) =>
  columnOrder.map((columnId) => {
    const column = columns.find((c) => c.field === columnId);
    const sorting = columnSorting.find((c) => c.id === columnId);

    return {
      ...column,
      sortOrder: sorting?.desc
        ? 'desc'
        : sorting?.desc === false
        ? 'asc'
        : undefined,
      width: columnSize[columnId] || column?.width,
    };
  });
