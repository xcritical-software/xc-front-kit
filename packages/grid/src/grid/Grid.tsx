import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';
import {
  IColumn, ITable, ITableProps, IRowData, ITableTheme, IRow,
} from '../interfaces';
import { Row } from '../row/Row';
import {
  ContentWrapper, HeadWrapper, TableHead, TableStyled, TableWrapper, HeaderStyled,
} from '../styled/styled';
import { gridTheme } from '../utils/get-styles';


export const Grid: React.FC<ITable> = React.memo<ITableProps>(({ rows, columns, theme = {} }) => {
  const [selectedRows, changeSelectedRows] = useState<IRow[] | []>([]);

  const tableWrapperElement = React.createRef<HTMLDivElement>();
  const [tableScroll, setTableScroll] = useState(0);
  const themeRef = useRef(gridTheme<ITableTheme>(theme));

  const handleScroll = (): void => {
    const scrolledDiv = tableWrapperElement.current;
    if (scrolledDiv) {
      setTableScroll(scrolledDiv.scrollLeft);
    }
  };

  const handleSelectRows = useCallback((row: IRow): void => {
    if (selectedRows.some((el) => el === row)) {
      const newRows = [...selectedRows].filter((el) => row !== el);
      changeSelectedRows(newRows);
    } else {
      changeSelectedRows([...selectedRows, row]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    themeRef.current = gridTheme<ITableTheme>(theme);
  }, [theme]);

  return (
    <ContentWrapper theme={ themeRef.current }>
      <HeadWrapper>
        <TableHead style={ { transform: `translateX(-${tableScroll}px)` } } theme={ themeRef.current }>
          { columns.map(({ title, width }: IColumn) => (
            <HeaderStyled
              // columnName={ title }
              width={ width }
              key={ title }
              theme={ themeRef.current.head }
            >
              { title }
            </HeaderStyled>
          )) }
        </TableHead>
      </HeadWrapper>
      <TableWrapper
        ref={ tableWrapperElement }
        onScroll={ handleScroll }
      >
        <TableStyled>
          { rows.map((row: IRowData) => (
            <Row
              row={ row }
              key={ row.id }
              columns={ columns }
              theme={ themeRef.current }
              level={ 0 }
              handleSelectRows={ handleSelectRows }
            />
          )) }
        </TableStyled>
      </TableWrapper>
    </ContentWrapper>
  );
});
