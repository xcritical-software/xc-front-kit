/* eslint-disable no-nested-ternary */
import { Column, ColumnDef, Row } from '@tanstack/react-table';

import { getThemedState, IThemeNamespace } from '@xcritical/theme';

import { gridThemeNamespace, defaultTheme } from './theme';
import { IGridTheme, IColumn } from './interfaces';

export function gridTheme(
  theme: IThemeNamespace,
  propertyPath?: string | undefined
): IGridTheme {
  const func = getThemedState(gridThemeNamespace, defaultTheme);

  return func(theme, propertyPath) as IGridTheme;
}

export const cellRenderMapper = (
  valueFn: () => any,
  column: Column<any>,
  row: Row<any>,
  renderFn?: Function
) => {
  if (!renderFn) return valueFn();

  return renderFn(valueFn(), column.id, row.original, row.index, row);
};

export const mappingColumns = (columns: IColumn[]): ColumnDef<object>[] =>
  columns.map((column) => ({
    id: column.field,
    accessorKey: column.field,
    header: column.headerName,
    size: column.width,
    cell: (info) => info.getValue(),
    sortable: column.sortable,
    resizable: column.resizable === undefined ? true : column.resizable,
    filterable: false,
    groupable: false,
    aggregatable: false,
    footer: column.footer,
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
