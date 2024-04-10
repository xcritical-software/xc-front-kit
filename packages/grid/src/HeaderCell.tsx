import React from 'react';
import { flexRender } from '@tanstack/react-table';

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

export const HeaderCellWrapper: React.FC<IHeaderCellWrapper> = ({
  header,
  theme,
  shouldChangeColumnsWidth,
}) => (
  <HeaderCell
    theme={theme}
    shouldChangeColumnsWidth={shouldChangeColumnsWidth}
    width={header.getSize()}
    isEmpty={false}>
    <HeaderCellContentWrapper
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
