import React, { useRef, useState, useEffect } from 'react';
import { IColumn, ITable, ITableProps } from '../../interfaces';
import { Header } from '../header/header';
import { Row } from '../row/row';
import {
  ContentWrapper, HeadWrapper, TableHead, TableStyled, TableWrapper,
} from '../styled/styled';

import { gridTheme, ITableTheme } from '../utils/get-styles';


export const Grid: React.FC<ITable> = React.memo((props: ITableProps) => {
  const { rows, columns, theme } = props;
  const tableWrapperElement: any = React.useRef<HTMLDivElement>();
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [tableScroll, setTableScroll] = useState(null);
  const themeRef = useRef(gridTheme<ITableTheme>(theme));
  useEffect(() => {
    themeRef.current = gridTheme<ITableTheme>(theme);
  }, [theme]);

  return (
    <ContentWrapper theme={ themeRef.current }>
      <HeadWrapper>
        <TableHead style={ { transform: `translateX(-${tableScroll}px)` } } theme={ themeRef.current }>
          { columns.map(({ title, width }: IColumn) => (
            <Header
              columnName={ title }
              width={ width }
              key={ title }
              theme={ themeRef.current }
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
                theme={ themeRef.current }
              />
            );
          }) }
        </TableStyled>
      </TableWrapper>
    </ContentWrapper>
  );
});
