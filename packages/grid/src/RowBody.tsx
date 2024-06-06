import { Cell, Row as RowTable } from '@tanstack/react-table';
import React, { useCallback, useMemo } from 'react';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

import { ITheme } from '@xcritical/theme';

import { Row } from './styled';
import { IGridTheme, IItem } from './interfaces';
import { CellContent } from './CellContent';

type CellContentProps = {
  theme: ITheme<IGridTheme>;
  vr: VirtualItem;
  vcs: VirtualItem[];
  row: RowTable<IItem>;
  visibleCells: Cell<IItem, unknown>[];
  onClick: Function;
  enableSelect: boolean;
  rowHeight?: number;
  onSelect: (
    row: RowTable<IItem>,
    e: React.MouseEvent<HTMLTableRowElement>
  ) => void;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
};

export const RowBody = React.memo(
  ({
    theme,
    row,
    vcs,
    vr,
    enableSelect,
    onClick,
    onSelect,
    visibleCells,
    rowHeight,
    rowVirtualizer,
  }: CellContentProps) => {
    const { left, center, right } = useMemo(
      () =>
        visibleCells.reduce(
          (acc, item) => {
            const pin = item.column.getIsPinned();

            if (pin) {
              acc[pin].push(item);
            } else {
              acc.center.push(item);
            }

            return acc;
          },
          { left: [], center: [], right: [] } as {
            left: Cell<IItem, unknown>[];
            center: Cell<IItem, unknown>[];
            right: Cell<IItem, unknown>[];
          }
        ),
      [visibleCells]
    );

    const onClickHandler = useCallback(
      (e: React.MouseEvent<HTMLTableRowElement>) => {
        onSelect(row, e);

        if (enableSelect) {
          row.getToggleSelectedHandler()(e);
        }
      },
      [row, enableSelect]
    );

    return (
      <Row
        data-index={vr.index} // needed for dynamic row height measurement
        ref={(node) => rowVirtualizer.measureElement(node)} // measure dynamic row height
        key={row.id}
        onClick={onClickHandler}
        rowHeight={rowHeight}
        selected={row.getIsSelected()}
        even={!!(vr.index % 2)}
        theme={theme}
        translateY={vr.start}>
        {left.map((cell) => (
          <CellContent
            vr={vr}
            onClick={onClick}
            key={cell.id}
            theme={theme}
            cell={cell}
            row={row}
            isSelected={row.getIsSelected()}
          />
        ))}
        <td
          style={{
            display: 'var(--virtual-padding-left-display)',
            width: `calc(var(--virtual-padding-left) * 1px)`,
          }}
        />
        {center.map((cell, idx) => {
          if (!vcs.some((v) => v.index === idx)) {
            return null;
          }

          return (
            <CellContent
              vr={vr}
              onClick={onClick}
              key={cell.id}
              theme={theme}
              cell={cell}
              row={row}
              isSelected={row.getIsSelected()}
            />
          );
        })}
        <td
          style={{
            display: 'var(--virtual-padding-right-display)',
            width: `calc(var(--virtual-padding-right) * 1px)`,
          }}
        />
        {right.map((cell) => (
          <CellContent
            vr={vr}
            onClick={onClick}
            key={cell.id}
            theme={theme}
            cell={cell}
            row={row}
            isSelected={row.getIsSelected()}
          />
        ))}
      </Row>
    );
  }
);
