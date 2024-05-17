/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  RowSelectionState,
  SortingState,
  Updater,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
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
import debounce from 'lodash.debounce';

import { useFirstMountState, useStateFromProp } from '@xcritical/utils';

import { IColumn, IGridProps } from './interfaces';
import {
  getBaseColls,
  getChangedColumns,
  getPinnedProps,
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
  selectedRowKeys,
  onSortChanged,
  onSelect,
  onChangeColumns,
  isClientSort,
}) => {
  const isFirtsMount = useFirstMountState();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  const $columns = React.useMemo(() => mappingColumns(columns), [columns]);

  const [columnPinning] = useMemo<[pinning: ColumnPinningState]>(() => {
    const pinning: ColumnPinningState = {
      left: [],
      right: [],
    };
    columns.reduce((acc, item) => {
      acc[item.field] = item;

      if (item.fixedPosition) {
        // eslint-disable-next-line no-unused-expressions
        pinning[item.fixedPosition]?.push(item.field);
      }

      return acc;
    }, {} as Record<string, IColumn>);

    return [pinning];
  }, [columns]);

  const enableSelect = isMultiSelect || !disableSelect;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection = {}, setRowSelection] = useStateFromProp<
    RowSelectionState | undefined
  >(selectedRowKeys);
  const [cellSize, setCellSize] = React.useState<ColumnSizingState>({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    $columns.map((c) => c.id!)
  );

  const $onSelect = useCallback(
    (selection: Updater<RowSelectionState>) => {
      setRowSelection(selection, onSelect);
    },
    [onSelect]
  );

  const table = useReactTable({
    data: items,
    columns: $columns,
    state: {
      columnPinning,
      columnOrder,
      expanded,
      rowSelection,
      sorting,
      columnSizing: cellSize,
    },

    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children,
    enableMultiRowSelection: isMultiSelect,
    enableRowSelection: enableSelect,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: $onSelect,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    onColumnSizingChange: setCellSize,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: isClientSort ? getSortedRowModel() : undefined,
    debugTable: true,
  });

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);

        const newOrder = arrayMove(columnOrder, oldIndex, newIndex); // this is just a splice util

        return newOrder;
      });
    }
  }, []);

  useEffect(() => {
    if (!isFirtsMount) setColumnOrder($columns.map((c) => c.id!));
  }, [$columns]);

  const debouncedOnChangeColumns = useCallback(
    debounce((columnOrder, cellSize, sorting) => {
      if (onChangeColumns) {
        const sortedColumns = getChangedColumns(
          columns,
          columnOrder,
          cellSize,
          sorting
        );
        onChangeColumns(sortedColumns);
      }
    }, 100),

    [onChangeColumns, columns]
  );
  useEffect(() => {
    if (!isFirtsMount) {
      debouncedOnChangeColumns(columnOrder, cellSize, sorting);
    }
  }, [columnOrder, cellSize]);

  useEffect(() => {
    if (!isFirtsMount) {
      if (onSortChanged) {
        const sortedColumns = getChangedColumns(
          columns,
          columnOrder,
          cellSize,
          sorting
        );

        onSortChanged(sortedColumns);
      }
    }
  }, [sorting]);

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
        theme={theme}
        ref={tableContainerRef}>
        {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}

        <table style={{ display: 'grid' }}>
          <HeaderWrapper
            columnOrder={columnOrder}
            table={table}
            theme={theme!}
            shouldChangeColumnsWidth={shouldChangeColumnsWidth}
            shouldMovingColumns={shouldMovingColumns}
          />

          <TBody theme={theme} height={rowVirtualizer.getTotalSize()}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];

              return (
                <Row
                  data-index={virtualRow.index} // needed for dynamic row height measurement
                  ref={(node) => rowVirtualizer.measureElement(node)} // measure dynamic row height
                  key={row.id}
                  onClick={
                    enableSelect ? row.getToggleSelectedHandler() : undefined
                  }
                  rowHeight={rowHeight}
                  selected={row.getIsSelected()}
                  even={!!(virtualRow.index % 2)}
                  theme={theme}
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
                      theme={theme}
                      depth={row.depth}
                      width={cell.column.getSize()}>
                      <BodyCellContentWrapper theme={theme}>
                        {getBaseColls(cell).isExpandable &&
                          row.getCanExpand() && (
                            <ExpandButtonWrapper
                              onClick={row.getToggleExpandedHandler()}
                              theme={theme}>
                              {row.getIsExpanded() ? (
                                <RemoveIcon />
                              ) : (
                                <AddIcon />
                              )}
                            </ExpandButtonWrapper>
                          )}
                        <BodyCellContent
                          theme={theme}
                          selected={row.getIsSelected()}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
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
