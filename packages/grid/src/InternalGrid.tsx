/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useRef } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ThemeContext } from 'styled-components';

import { IGridProps } from './interfaces';
import { cellRenderMapper, gridTheme } from './utils';
import {
  BodyCell,
  BodyCellContent,
  BodyCellContentWrapper,
  Row,
  TBody,
  Wrapper,
} from './styled';
import { HeaderWrapper } from './HeaderWrapper';

export const InternalGrid: React.FC<IGridProps> = ({
  items,
  columns,
  theme,
  width = 0,
  height = 0,
  rowHeight,
  shouldChangeColumnsWidth = false,
}) => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(gridTheme(theme ?? contextTheme!));

  useEffect(() => {
    themeRef.current = gridTheme(theme ?? contextTheme!);
  }, [theme, contextTheme]);

  const $columns = React.useMemo<ColumnDef<object>[]>(
    () =>
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
      })),
    [columns]
  );

  const customRenders = React.useMemo<Record<string, Function>>(
    () =>
      columns.reduce((acc, item) => {
        if (item.render) {
          acc[item.field] = item.render;
        }

        return acc;
      }, {} as Record<string, Function>),
    [columns]
  );
  const table = useReactTable({
    data: items,
    columns: $columns,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const { rows } = table.getRowModel();

  // The virtualizer needs to know the scrollable container element
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => rowHeight || 33, // estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    // measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <Wrapper
      $width={width}
      $height={height}
      theme={themeRef.current}
      ref={tableContainerRef}>
      {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}

      <table style={{ display: 'grid' }}>
        <HeaderWrapper
          table={table}
          theme={themeRef.current}
          shouldChangeColumnsWidth={shouldChangeColumnsWidth}
        />

        <TBody theme={themeRef.current} height={rowVirtualizer.getTotalSize()}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];

            return (
              <Row
                data-index={virtualRow.index} // needed for dynamic row height measurement
                ref={(node) => rowVirtualizer.measureElement(node)} // measure dynamic row height
                key={row.id}
                translateY={virtualRow.start}>
                {row.getVisibleCells().map((cell) => (
                  <BodyCell
                    key={cell.id}
                    data-column-id={cell.column.id}
                    data-column-data={cell.getValue()}
                    theme={themeRef.current}
                    style={{
                      display: 'flex',
                      width: cell.column.getSize(),
                    }}>
                    <BodyCellContentWrapper theme={themeRef.current}>
                      <BodyCellContent theme={themeRef.current}>
                        {cellRenderMapper(
                          cell.getValue,
                          cell.column,
                          cell.row,
                          customRenders[cell.id]
                        )}
                      </BodyCellContent>
                    </BodyCellContentWrapper>
                  </BodyCell>
                ))}
              </Row>
            );
          })}
        </TBody>
      </table>
    </Wrapper>
  );
};
