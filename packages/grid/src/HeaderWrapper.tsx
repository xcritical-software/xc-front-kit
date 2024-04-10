import React, { useRef } from 'react';

import { HeaderCellWrapper } from './HeaderCell';
import { Header, HeaderGroup } from './styled';
import { IHeaderWrapper } from './interfaces';
export const HeaderWrapper: React.FC<IHeaderWrapper> = ({ table, theme }) => {
  const headerRef = useRef<HTMLTableSectionElement>(null);

  return (
    <Header ref={headerRef} theme={theme}>
      {table.getHeaderGroups().map((el) => (
        <HeaderGroup>
          {el.headers.map((header) => (
            <HeaderCellWrapper key={header.id} theme={theme} header={header} />
          ))}
        </HeaderGroup>
      ))}
    </Header>
  );
};
