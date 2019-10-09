import React, { useState } from 'react';

import {
  TableStyled, TableHead, TableWrapper, ContentWrapper, HeadWrapper,
} from '../styled/styled';
import { Header } from '../header/header';
import { Row } from '../row/row';
import { tableTheme } from '../theme/theme';
import { ITable, ITableProps, IColumn } from '../../interfaces';


export const Table: React.FC<ITable> = React.memo((props: ITableProps) => {
  const { rows, columns } = props;
  const tableWrapperElement: any = React.useRef<HTMLDivElement>();
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [tableScroll, setTableScroll] = useState(null);
  const { theme = tableTheme } = props;

  return (
    <ContentWrapper theme={ theme }>
      <HeadWrapper>
        <TableHead style={ { transform: `translateX(-${tableScroll}px)` } } theme={ theme }>
          { columns.map(({ title, width }: IColumn) => (
            <Header
              columnName={ title }
              width={ width }
              key={ title }
              theme={ theme }
            />
          )) }
        </TableHead>
      </HeadWrapper>
      <TableWrapper
        ref={ tableWrapperElement }
        onScroll={ (): void => {
          const { current } = tableWrapperElement;
          if (current) {
            setTableScroll(current.scrollLeft);
          }
        } }
      >
        <TableStyled>
          { rows.map((row: any) => {
            const rowId = row.id;
            return (
              <Row
                row={ row }
                key={ rowId }
                columns={ columns }
                isSelected={ selectedRowId === rowId }
                rowId={ rowId }
                onChangeActiveRow={ setSelectedRowId }
                theme={ theme }
              />
            );
          }) }
        </TableStyled>
      </TableWrapper>

    </ContentWrapper>
  );
});
