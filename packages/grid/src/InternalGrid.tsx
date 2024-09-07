/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { MouseEvent, useCallback, useEffect, useMemo } from 'react';
import {
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  RowSelectionState,
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
  Row as RowType,
  VisibilityState,
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

import { useStateFromProp } from '@xcritical/utils';

import { IColumn, IInternalGridProps, IItem } from './interfaces';
import { getSelectUpDownElement, mappingColumns } from './utils';
import { HiddenFocusElement, TBody, Wrapper } from './styled';
import { HeaderWrapper } from './HeaderWrapper';
import { RowBody } from './RowBody';

export const InternalGrid: React.FC<IInternalGridProps> = ({
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
  enableSubRowSelection,
  selectedRowKeys,
  columnVisibility: columnVisibilityProp,
  columnOrder: columnOrderProp,
  columnSorting: columnSortingProp,
  columnSizes,
  onChangeColumnsOrder,
  onChangeColumnSorting,
  onChangeColumnVisibility,
  onChangeColumnSizes,
  onSelect,
  autoFitLastColumn,
  enableSorting = true,
  enableMultiSort,
  manualSorting = false,
  minColumnWidth,
  overscan = 5,
  debugTable,
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const $columns = React.useMemo(
    () => mappingColumns(columns, { minColumnWidth }),
    [columns, minColumnWidth]
  );

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

  const [sorting, setSorting] = useStateFromProp<SortingState | undefined>(
    columnSortingProp,
    onChangeColumnSorting,
    true
  );

  const [rowSelection = {}, setRowSelection] = useStateFromProp<
    RowSelectionState | undefined
  >(selectedRowKeys, onSelect, true);

  const [cellSize = {}, setCellSize] = useStateFromProp<
    ColumnSizingState | undefined
  >(columnSizes, onChangeColumnSizes, true);

  const [columnVisibility = {}, setColumnVisibility] = useStateFromProp<
    VisibilityState | undefined
  >(columnVisibilityProp, onChangeColumnVisibility, true);

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const $columnOrder = useMemo<string[]>(
    () =>
      columnOrderProp?.length ? columnOrderProp : $columns.map((c) => c.id!),
    [columnOrderProp, $columns]
  );

  const [columnOrder, setColumnOrder] = useStateFromProp<string[]>(
    $columnOrder,
    onChangeColumnsOrder,
    true
  );

  const $onExpandCallback = useCallback(
    (row: RowType<IItem>) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      row.toggleExpanded();
    },
    []
  );

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

  const onKeyDown = useCallback(
    (e: KeyboardEvent & { originalEvent: Event }) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        getSelectUpDownElement(table, rowVirtualizer, 'down');
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        getSelectUpDownElement(table, rowVirtualizer, 'up');
      }
    },
    []
  );

  const $onSelect = () => {
    setFocus();
  };

  const setFocus = () => {
    hiddenContainerRef.current?.focus();
  };
  const state = useMemo(
    () => ({
      columnVisibility,
      columnPinning,
      columnOrder,
      expanded,
      rowSelection,
      sorting,
      columnSizing: cellSize,
    }),
    [
      columnVisibility,
      columnPinning,
      columnOrder,
      expanded,
      rowSelection,
      sorting,
      cellSize,
    ]
  );

  const table = useReactTable({
    data: items,
    columns: $columns,
    state,
    onColumnVisibilityChange: setColumnVisibility,
    enableColumnResizing: shouldChangeColumnsWidth,
    enableMultiSort,
    enableSorting,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children,
    enableMultiRowSelection: isMultiSelect,
    enableRowSelection: enableSelect,
    enableSubRowSelection: enableSubRowSelection || isMultiSelect,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    onColumnSizingChange: setCellSize,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    manualSorting,
    getSortedRowModel: !manualSorting ? getSortedRowModel() : undefined,
    debugTable:
      debugTable !== undefined
        ? debugTable
        : process.env.NODE_ENV === 'development',
  });

  const { rows } = table.getRowModel();

  const visibleColumns = table.getVisibleLeafColumns();

  // The virtualizer needs to know the scrollable container element
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  // the hidden focus element is needed to capture keyboard events
  const hiddenContainerRef = React.useRef<HTMLDivElement>(null);

  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(), // estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan, // how many columns to render on each side off screen each way (adjust this for performance)
  });

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
    overscan,
  });

  const virtualColumns = columnVirtualizer.getVirtualItems();
  const virtualRows = rowVirtualizer.getVirtualItems();

  const headers = table.getLeafHeaders();
  const colSizes: { [key: string]: number } = {};

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i]!;
    colSizes[`--header-${header.id}-size`] = header.getSize();
    colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
  }

  let virtualPaddingVars = {
    '--virtual-padding-left': 0,
    '--virtual-padding-right': 0,
    '--virtual-padding-right-display': 'none',
    '--virtual-padding-left-display': 'none',
  };

  if (columnVirtualizer && virtualColumns.length) {
    let virtualPaddingLeft: number | undefined;
    let virtualPaddingRight: number | undefined;

    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0);

    virtualPaddingVars = {
      '--virtual-padding-left': virtualPaddingLeft,
      '--virtual-padding-right': virtualPaddingRight,
      '--virtual-padding-right-display': virtualPaddingRight ? 'flex' : 'none',
      '--virtual-padding-left-display': virtualPaddingLeft ? 'flex' : 'none',
    };
  }

  useEffect(() => {
    hiddenContainerRef.current?.addEventListener('keydown', onKeyDown);

    return () => {
      hiddenContainerRef.current?.removeEventListener('keydown', onKeyDown);
    };
  }, []);

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
        <HiddenFocusElement ref={hiddenContainerRef} tabIndex={0} />
        <table style={{ display: 'grid', ...virtualPaddingVars, ...colSizes }}>
          <HeaderWrapper
            columnOrder={columnOrder}
            vcs={virtualColumns}
            table={table}
            theme={theme}
            autoFitLastColumn={autoFitLastColumn}
            shouldChangeColumnsWidth={shouldChangeColumnsWidth}
            shouldMovingColumns={shouldMovingColumns}
          />

          <TBody theme={theme} height={rowVirtualizer.getTotalSize()}>
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              const visibleCells = row.getVisibleCells();

              return (
                <RowBody
                  autoFitLastColumn={autoFitLastColumn}
                  row={row}
                  onSelect={$onSelect}
                  vr={virtualRow}
                  vcs={virtualColumns}
                  visibleCells={visibleCells}
                  rowVirtualizer={rowVirtualizer} // measure dynamic row height
                  key={row.id}
                  enableSelect={enableSelect}
                  rowHeight={rowHeight}
                  theme={theme}
                  onClick={$onExpandCallback}
                />
              );
            })}
          </TBody>
        </table>
      </Wrapper>
    </DndContext>
  );
};
