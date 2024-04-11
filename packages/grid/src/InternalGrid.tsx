/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  ColumnDef,
  ColumnPinningState,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ThemeContext } from 'styled-components';
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';

import { IColumn, IGridProps } from './interfaces';
import {
  cellRenderMapper,
  getPinnedProps,
  gridTheme,
  mappingColumns,
} from './utils';
import {
  BodyCell,
  BodyCellContent,
  BodyCellContentWrapper,
  ExpandButtonWrapper,
  Row,
  TBody,
  Wrapper,
} from './styled';
import { HeaderWrapper } from './HeaderWrapper';
import { RemoveIcon, AddIcon } from './icons';

export const InternalGrid: React.FC<IGridProps> = ({
  items,
  columns,
  theme,
  width = 0,
  height = 0,
  rowHeight,
  disableSelect,
  isMultiSelect,
  shouldChangeColumnsWidth = false,
  shouldMovingColumns = false,
  onSortChanged,
  onSelect,
}) => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(gridTheme(theme ?? contextTheme!));

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const $columns = React.useMemo<ColumnDef<object>[]>(
    () => mappingColumns(columns),
    [columns]
  );

  const [mappedField, columnPinning] = useMemo<
    [
      mappedField: Record<string, IColumn | undefined>,
      pinning: ColumnPinningState
    ]
  >(() => {
    const pinning: ColumnPinningState = {
      left: [],
      right: [],
    };
    const cols = columns.reduce((acc, item) => {
      acc[item.field] = item;

      if (item.fixedPosition) {
        // eslint-disable-next-line no-unused-expressions
        pinning[item.fixedPosition]?.push(item.field);
      }

      return acc;
    }, {} as Record<string, IColumn>);

    return [cols, pinning];
  }, [columns]);

  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    $columns.map((c) => c.id!)
  );
  const table = useReactTable({
    data: items,
    columns: $columns,
    state: {
      columnPinning,
      columnOrder,
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children,
    enableMultiRowSelection: isMultiSelect,
    enableRowSelection: !disableSelect,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: onSelect,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active && over && active.id !== over.id) {
        setColumnOrder((columnOrder) => {
          const oldIndex = columnOrder.indexOf(active.id as string);
          const newIndex = columnOrder.indexOf(over.id as string);

          const newOrder = arrayMove(columnOrder, oldIndex, newIndex); // this is just a splice util

          const sortedColumns = newOrder.map((columnId) =>
            columns.find((c) => c.field === columnId)
          );

          if (onSortChanged) {
            onSortChanged(sortedColumns);
          }

          return newOrder;
        });
      }
    },
    [onSortChanged, columns]
  );

  useEffect(() => {
    themeRef.current = gridTheme(theme ?? contextTheme!);
  }, [theme, contextTheme]);

  useEffect(() => {
    setColumnOrder($columns.map((c) => c.id!));
  }, [$columns]);

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
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}>
      <Wrapper
        $width={width}
        $height={height}
        theme={themeRef.current}
        ref={tableContainerRef}>
        {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}

        <table style={{ display: 'grid' }}>
          <HeaderWrapper
            columnOrder={columnOrder}
            table={table}
            theme={themeRef.current}
            shouldChangeColumnsWidth={shouldChangeColumnsWidth}
            shouldMovingColumns={shouldMovingColumns}
          />

          <TBody
            theme={themeRef.current}
            height={rowVirtualizer.getTotalSize()}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];

              return (
                <Row
                  data-index={virtualRow.index} // needed for dynamic row height measurement
                  ref={(node) => rowVirtualizer.measureElement(node)} // measure dynamic row height
                  key={row.id}
                  onClick={
                    disableSelect ? undefined : row.getToggleSelectedHandler()
                  }
                  translateY={virtualRow.start}>
                  {row.getVisibleCells().map((cell) => (
                    <BodyCell
                      {...getPinnedProps(cell.column)}
                      aria-rowindex={virtualRow.index}
                      aria-colindex={cell.column.getIndex()}
                      data-column-name={cell.column.id}
                      firstRow={virtualRow.index === 0}
                      even={!!(virtualRow.index % 2)}
                      key={cell.id}
                      selected={row.getIsSelected()}
                      data-column-id={cell.column.id}
                      data-column-data={cell.getValue()}
                      theme={themeRef.current}
                      depth={row.depth}
                      width={cell.column.getSize()}>
                      <BodyCellContentWrapper theme={themeRef.current}>
                        {mappedField[cell.column.id]?.isExpandable &&
                          row.getCanExpand() && (
                            <ExpandButtonWrapper
                              onClick={row.getToggleExpandedHandler()}
                              theme={themeRef.current}>
                              {row.getIsExpanded() ? (
                                <RemoveIcon />
                              ) : (
                                <AddIcon />
                              )}
                            </ExpandButtonWrapper>
                          )}
                        <BodyCellContent
                          theme={themeRef.current}
                          selected={row.getIsSelected()}>
                          {cellRenderMapper(
                            cell.getValue,
                            cell.column,
                            cell.row,
                            mappedField[cell.id]?.render
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
    </DndContext>
  );
};
