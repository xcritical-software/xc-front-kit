import React, { useRef } from 'react';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { HeaderCellWrapper } from './HeaderCell';
import { Header, HeaderGroup } from './styled';
import { IHeaderWrapper } from './interfaces';

export const HeaderWrapper: React.FC<IHeaderWrapper> = ({
  table,
  theme,
  shouldChangeColumnsWidth,
  shouldMovingColumns,
  columnOrder,
}) => {
  const headerRef = useRef<HTMLTableSectionElement>(null);

  return (
    <Header ref={headerRef} theme={theme}>
      {table.getHeaderGroups().map((el) => (
        <SortableContext
          items={columnOrder}
          strategy={horizontalListSortingStrategy}>
          <HeaderGroup>
            {el.headers.map((header) => (
              <HeaderCellWrapper
                key={header.id}
                theme={theme}
                header={header}
                shouldChangeColumnsWidth={shouldChangeColumnsWidth}
                shouldMovingColumns={shouldMovingColumns}
              />
            ))}
          </HeaderGroup>
        </SortableContext>
      ))}
    </Header>
  );
};
