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
import { getBaseColls, getPinnedProps } from './utils';
import { IGridTheme, IItem } from './interfaces';

type CellContentProps = {
  theme: ITheme<IGridTheme>;
  vr: VirtualItem;
  row: Row<IItem>;
  cell: Cell<IItem, unknown>;
  onClick: Function;
};

export const CellContent = React.memo(
  ({ theme, row, cell, onClick, vr }: CellContentProps) => {
    const { isExpandable } = getBaseColls(cell);

    return (
      <BodyCell
        {...getPinnedProps(cell.column)}
        aria-rowindex={vr.index}
        aria-colindex={cell.column.getIndex()}
        data-column-name={cell.column.id}
        firstRow={vr.index === 0}
        even={!!(vr.index % 2)}
        key={cell.id}
        selected={row.getIsSelected()}
        data-column-id={cell.column.id}
        data-column-data={cell.getValue()}
        theme={theme}
        depth={row.depth}
        isExpandable={isExpandable}
        id={cell.column.id}>
        <BodyCellContentWrapper theme={theme} key={cell.id}>
          {isExpandable && row.getCanExpand() && (
            <ExpandButtonWrapper onClick={onClick(row)} theme={theme}>
              {row.getIsExpanded() ? <RemoveIcon /> : <AddIcon />}
            </ExpandButtonWrapper>
          )}
          <BodyCellContent theme={theme} selected={row.getIsSelected()}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </BodyCellContent>
        </BodyCellContentWrapper>
      </BodyCell>
    );
  }
);
