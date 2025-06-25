/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
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
import classNames from 'classnames';

import { useStateFromProp } from '@xcritical/utils';

import {
  IColumn,
  IInternalGridProps,
  IItem,
  InteractionType,
} from './interfaces';
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
  rowExpand: rowExpandedProp,
  columnVisibility: columnVisibilityProp,
  columnOrder: columnOrderProp,
  columnSorting: columnSortingProp,
  columnSizes,
  onChangeColumnsOrder,
  onChangeColumnSorting,
  onChangeColumnVisibility,
  onChangeRowExpand,
  onChangeColumnSizes,
  onSelect,
  onFocusChange,
  autoFitLastColumn = true,
  enableSorting = true,
  enableMultiSort,
  manualSorting = false,
  minColumnWidth,
  scrollPaddingEnd = 20,
  overscan = 5,
  getRowId: getRowIdProps,
  debugTable,
  name,
  className,
  disableVirtualization = false,
}) => {
  const $className = classNames('xcritical-grid', className);

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

  const lastInteractionType = useRef<InteractionType>(null);

  const [sorting, setSorting] = useStateFromProp<SortingState | undefined>(
    columnSortingProp,
    onChangeColumnSorting,
    true
  );

  const [rowSelection = {}, setRowSelection] = useStateFromProp<
    RowSelectionState | undefined
  >(selectedRowKeys, undefined, true);

  useEffect(() => {
    onSelect?.(rowSelection, lastInteractionType.current);
  }, [rowSelection]);

  const [cellSize = {}, setCellSize] = useStateFromProp<
    ColumnSizingState | undefined
  >(columnSizes, onChangeColumnSizes, true);

  const [columnVisibility = {}, setColumnVisibility] = useStateFromProp<
    VisibilityState | undefined
  >(columnVisibilityProp, onChangeColumnVisibility, true);

  const [expanded = {}, setExpanded] = useStateFromProp<
    ExpandedState | undefined
  >(rowExpandedProp, onChangeRowExpand, true);

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
      e.preventDefault();
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
      lastInteractionType.current = 'keyboard';

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
    lastInteractionType.current = 'mouse';
  };

  const setFocus = () => {
    hiddenContainerRef.current?.focus();
    onFocusChange?.(true);
  };
  const onBlur = () => {
    onFocusChange?.(false);
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
    getRowId: getRowIdProps,
    sortDescFirst: true,
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
    count: disableVirtualization ? 0 : visibleColumns.length,
    estimateSize: (index) => visibleColumns[index]?.getSize() || 0, // estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan, // how many columns to render on each side off screen each way (adjust this for performance)
  });

  const rowVirtualizer = useVirtualizer({
    count: disableVirtualization ? 0 : rows.length,
    estimateSize: () => rowHeight || 33, // estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    // measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      !disableVirtualization &&
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element.getBoundingClientRect().height
        : undefined,
    overscan,
    paddingEnd: scrollPaddingEnd,
    scrollPaddingEnd,
  });

  const virtualColumns = disableVirtualization
    ? visibleColumns.map((column, index) => ({
        index,
        start: 0,
        end: column.getSize(),
        size: column.getSize(),
        key: column.id,
        lane: 0,
      }))
    : columnVirtualizer.getVirtualItems();

  const virtualRows = disableVirtualization
    ? rows.map((_, index) => ({
        index,
        key: index.toString(),
        lane: 0,
      }))
    : rowVirtualizer.getVirtualItems();

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
  }, [onKeyDown]);

  const totalHeight = disableVirtualization
    ? '100%'
    : rowVirtualizer.getTotalSize();

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
        className={$className}
        ref={tableContainerRef}>
        {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
        <HiddenFocusElement
          ref={hiddenContainerRef}
          onBlur={onBlur}
          tabIndex={0}
        />
        <table
          style={{ display: 'grid', ...virtualPaddingVars, ...colSizes }}
          data-table-name={name}
          className="xcritical-grid__table">
          <HeaderWrapper
            columnOrder={columnOrder}
            vcs={virtualColumns}
            table={table}
            theme={theme}
            autoFitLastColumn={autoFitLastColumn}
            shouldChangeColumnsWidth={shouldChangeColumnsWidth}
            shouldMovingColumns={shouldMovingColumns}
          />

          <TBody theme={theme} height={totalHeight}>
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              const visibleCells = row.getVisibleCells();
              const rowId = row.parentId
                ? `${row.parentId}.${row.index}`
                : row.id;

              return (
                <RowBody
                  autoFitLastColumn={autoFitLastColumn}
                  row={row}
                  onSelect={$onSelect}
                  vr={virtualRow}
                  vcs={virtualColumns}
                  visibleCells={visibleCells}
                  rowVirtualizer={
                    disableVirtualization ? undefined : rowVirtualizer
                  }
                  key={rowId}
                  disableVirtualization={disableVirtualization}
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
