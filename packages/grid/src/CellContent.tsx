import { Cell, Row, flexRender } from '@tanstack/react-table';
import React from 'react';
import { VirtualItem } from '@tanstack/react-virtual';

import { ITheme } from '@xcritical/theme';

import {
  BodyCell,
  BodyCellContent,
  BodyCellContentWrapper,
  ExpandButtonWrapper,
} from './styled';
import { RemoveIcon, AddIcon } from './icons';
import { ColumnDefWithBase, getBaseColls, getPinnedProps } from './utils';
import { IGridTheme, IItem } from './interfaces';

type CellContentProps = {
  theme: ITheme<IGridTheme>;
  vr: VirtualItem;
  row: Row<IItem>;
  cell: Cell<IItem, unknown>;
  onClick: Function;
  isSelected: boolean;
  rowHeight?: number;
  autoFitLastColumn?: boolean;
};

export const CellContent = React.memo(
  ({
    theme,
    row,
    cell,
    onClick,
    vr,
    autoFitLastColumn,
    isSelected,
    rowHeight,
  }: CellContentProps) => {
    const { isExpandable } = getBaseColls(cell);

    const columnDef = cell.column.columnDef as ColumnDefWithBase<IItem>;

    return (
      <BodyCell
        {...getPinnedProps(cell.column)}
        aria-rowindex={vr.index}
        aria-colindex={cell.column.getIndex()}
        data-column-name={cell.column.id}
        firstRow={vr.index === 0}
        even={!!(vr.index % 2)}
        key={cell.id}
        autoFitLastColumn={autoFitLastColumn}
        selected={isSelected}
        data-column-id={cell.column.id}
        data-column-data={cell.getValue()}
        theme={theme}
        depth={row.depth}
        isExpandable={isExpandable}
        id={cell.id}>
        <BodyCellContentWrapper
          theme={theme}
          key={cell.id}
          center={columnDef._base.center}>
          {isExpandable && row.getCanExpand() && (
            <ExpandButtonWrapper onClick={onClick(row)} theme={theme}>
              {row.getIsExpanded() ? <RemoveIcon /> : <AddIcon />}
            </ExpandButtonWrapper>
          )}
          <BodyCellContent
            theme={theme}
            selected={isSelected}
            rowHeight={rowHeight}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </BodyCellContent>
        </BodyCellContentWrapper>
      </BodyCell>
    );
  }
);
