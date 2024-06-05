/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { VirtualItem } from '@tanstack/react-virtual';
import React, { useMemo } from 'react';
import { Header, HeaderGroup as HeaderGroupType } from '@tanstack/react-table';

import { HeaderCellWrapper } from './HeaderCell';
import { IGridTheme, IItem } from './interfaces';
import { HeaderGroup } from './styled';

type HeaderRowProps = {
  group: HeaderGroupType<IItem>;
  theme: IGridTheme;
  shouldChangeColumnsWidth: boolean;
  shouldMovingColumns: boolean;
  columnOrder: string[];
  vcs: VirtualItem[];
};

export const HeaderRow: React.FC<HeaderRowProps> = ({
  group,
  theme,
  shouldChangeColumnsWidth,
  shouldMovingColumns,
  columnOrder,
  vcs,
}) => {
  const { left, center, right } = useMemo(
    () =>
      group.headers.reduce(
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
          left: Header<IItem, unknown>[];
          center: Header<IItem, unknown>[];
          right: Header<IItem, unknown>[];
        }
      ),
    [group.headers]
  );

  return (
    <SortableContext
      items={columnOrder}
      strategy={horizontalListSortingStrategy}>
      <HeaderGroup>
        <th
          style={{
            display: 'var(--virtual-padding-left-display)',
            width: `calc(var(--virtual-padding-left) * 1px)`,
          }}
        />
        {left.map((header) => (
          <HeaderCellWrapper
            key={header.id}
            theme={theme}
            header={header}
            shouldChangeColumnsWidth={shouldChangeColumnsWidth}
            shouldMovingColumns={shouldMovingColumns}
          />
        ))}

        {center.map((header, idx) => {
          if (!vcs.some((v) => v.index === idx)) {
            return null;
          }

          return (
            <HeaderCellWrapper
              key={header.id}
              theme={theme}
              header={header}
              shouldChangeColumnsWidth={shouldChangeColumnsWidth}
              shouldMovingColumns={shouldMovingColumns}
            />
          );
        })}

        {right.map((header) => (
          <HeaderCellWrapper
            key={header.id}
            theme={theme}
            header={header}
            shouldChangeColumnsWidth={shouldChangeColumnsWidth}
            shouldMovingColumns={shouldMovingColumns}
          />
        ))}
        <th
          style={{
            display: 'var(--virtual-padding-right-display)',
            width: `calc(var(--virtual-padding-right) * 1px)`,
          }}
        />
      </HeaderGroup>
    </SortableContext>
  );
};
