/* eslint-disable no-nested-ternary */
import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  HeaderCell,
  HeaderCellContent,
  HeaderCellContentWrapper,
  RightBorder,
  SortIconWrapper,
} from './styled';
import { IHeaderCellWrapper } from './interfaces';
import { GridSort } from './consts';
import { SortAscendingIcon, SortDescendingIcon } from './icons';
import { getPinnedProps } from './utils';

export const HeaderCellWrapper: React.FC<IHeaderCellWrapper> = ({
  header,
  theme,
  autoFitLastColumn,
  shouldChangeColumnsWidth,
  shouldMovingColumns,
}) => {
  const { isFirstPinned, pinned, pinPagging } = getPinnedProps(header.column);

  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const $shouldMovingColumns = shouldMovingColumns && !pinned;

  return (
    <HeaderCell
      colSpan={header.colSpan}
      ref={setNodeRef}
      isDragging={isDragging}
      theme={theme}
      autoFitLastColumn={autoFitLastColumn}
      pinned={pinned}
      isFirstPinned={isFirstPinned}
      pinPagging={pinPagging}
      style={{ transform: CSS.Translate.toString(transform) }}
      shouldChangeColumnsWidth={shouldChangeColumnsWidth}
      $width={header.getSize()}
      isEmpty={false}>
      <HeaderCellContentWrapper
        {...($shouldMovingColumns ? listeners : {})}
        {...($shouldMovingColumns ? attributes : {})}
        theme={theme}
        center={false}
        canSort={header.column.getCanSort()}
        onClick={header.column.getToggleSortingHandler()}>
        <HeaderCellContent theme={theme}>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </HeaderCellContent>
        <SortIconWrapper>
          {header.column.getIsSorted() === GridSort.ASC && (
            <SortAscendingIcon size={theme.sortIconSize} />
          )}
          {header.column.getIsSorted() === GridSort.DESC && (
            <SortDescendingIcon size={theme.sortIconSize} />
          )}
        </SortIconWrapper>
      </HeaderCellContentWrapper>
      <RightBorder
        theme={theme}
        onDoubleClick={() => header.column.resetSize()}
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
        shouldChangeColumnsWidth={shouldChangeColumnsWidth}
      />
    </HeaderCell>
  );
};
