import React, { useRef, useState, useEffect } from 'react';
import {
  IColumn, ITable, ITableProps, IRowData, ITableTheme,
} from '../interfaces';
import { Header } from '../header/header';
import { Row } from '../row/row';
import {
  ContentWrapper, HeadWrapper, TableHead, TableStyled, TableWrapper,
} from '../styled/styled';
import { gridTheme } from '../utils/get-styles';


export const Grid: React.FC<ITable> = React.memo((props: ITableProps) => {
  const { rows, columns, theme = {} } = props;
  const tableWrapperElement = React.createRef<HTMLDivElement>();
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [tableScroll, setTableScroll] = useState(0);
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
          const scrolledDiv = tableWrapperElement.current;
          if (scrolledDiv) {
            setTableScroll(scrolledDiv.scrollLeft);
          }
        } }
      >
        <TableStyled>
          { rows.map((row: IRowData) => {
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
