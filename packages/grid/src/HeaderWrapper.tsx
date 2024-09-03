import React, { useRef } from 'react';

import { Header } from './styled';
import { IHeaderWrapper } from './interfaces';
import { HeaderRow } from './HeaderRow';

export const HeaderWrapper: React.FC<IHeaderWrapper> = ({
  table,
  theme,
  shouldChangeColumnsWidth,
  shouldMovingColumns,
  autoFitLastColumn,
  columnOrder,
  vcs,
}) => {
  const headerRef = useRef<HTMLTableSectionElement>(null);

  return (
    <Header ref={headerRef} theme={theme}>
      {table.getHeaderGroups().map((el) => (
        <HeaderRow
          theme={theme}
          group={el}
          autoFitLastColumn={autoFitLastColumn}
          shouldChangeColumnsWidth={shouldChangeColumnsWidth}
          shouldMovingColumns={shouldMovingColumns}
          columnOrder={columnOrder}
          vcs={vcs}
        />
      ))}
    </Header>
  );
};
