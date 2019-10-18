import React, { useRef, useState, useEffect } from 'react';
import {
  IColumn, ITable, ITableProps, IRowData, ITableTheme,
} from '../interfaces';

import { Row } from '../row/Row';
import {
  ContentWrapper, HeadWrapper, TableHead, TableStyled, TableWrapper, HeaderStyled,
} from '../styled/styled';
import { gridTheme } from '../utils/get-styles';

// const guid = () => {
//   function s4() {
//     return Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   }

//   return (`${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`);
// };

export const Grid: React.FC<ITable> = React.memo((props: ITableProps) => {
  const { rows, columns, theme = {} } = props;
  const tableWrapperElement = React.createRef<HTMLDivElement>();
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [tableScroll, setTableScroll] = useState(0);
  const themeRef = useRef(gridTheme<ITableTheme>(theme));
  useEffect(() => {
    themeRef.current = gridTheme<ITableTheme>(theme);
  }, [theme]);


  const handleScroll = (): void => {
    const scrolledDiv = tableWrapperElement.current;
    if (scrolledDiv) {
      setTableScroll(scrolledDiv.scrollLeft);
    }
  };


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
              isSelected={ selectedRowId === row.id }
              rowId={ row.id }
              onChangeActiveRow={ setSelectedRowId }
              theme={ themeRef.current }
              level={ 0 }
            />
          )) }
        </TableStyled>
      </TableWrapper>
    </ContentWrapper>
  );
});
