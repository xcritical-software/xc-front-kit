import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  MutableRefObject,
  useContext,
  useMemo,
} from 'react';
import { ThemeContext } from 'styled-components';
import {
  Grid as VirtualisedGrid,
  CellMeasurer,
  ScrollPosition,
  GridCellProps,
} from 'react-virtualized';
import { setIn } from 'utilitify';
import {
  Body,
  BodyCell,
  BodyCellOffset,
  BodyCellContent,
  ExpandButtonWrapper,
  Wrapper,
  TotalBlock,
  TotalCellContent,
  TotalCell,
  ShiftInsteadButton,
} from './styled';
import { AddIcon, RemoveIcon } from './icons';
import { gridTheme, searchLastVisible } from './utils';

import { HeaderWrapper } from './HeaderWrapper';
import {
  IColumn, IGrid,
} from './interfaces';


const Grid = ({
  mappedItems = [],
  columns = [],
  width = 0,
  height = 0,
  onChangeColumns = () => {},
  totals,
  theme,
  shouldMovingColumns = true,
  shouldChangeColumnsWidth = true,
  rightScroll = true,
  bottomScroll = true,
  scrollTop,
  onScrollsyncScroll,
  onChangeExpand,
  handleSelect,
  selectedRows,
  cacheRef,
}: IGrid) => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(gridTheme(theme || contextTheme));

  const [mappedColumns, setMappedColumns] = useState<IColumn[]>(columns);
  const fullWidthRef = useRef(
    mappedColumns.filter(({ visible }: IColumn) => visible).reduce(
      (acc: number, { width: colWidth }: IColumn): number => (acc + colWidth), 0,
    ),
  );
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [changingColumns, setChangingColumns] = useState<string>('');
  const gridRef = useRef<VirtualisedGrid>();

  const filteredColums = useMemo(() => (
    mappedColumns.filter(({ visible }) => visible)
  ), [mappedColumns]);

  useEffect(() => {
    const newFullWidth = columns.filter(({ visible }: IColumn) => visible).reduce(
      (acc: number, { width: colWidth }: IColumn): number => (acc + colWidth), 0,
    );
    themeRef.current = gridTheme(theme || contextTheme);
    fullWidthRef.current = newFullWidth;
    if (newFullWidth < width) {
      const lastElemIdx = searchLastVisible(columns, columns.length);
      const widthLast = columns[lastElemIdx].width;
      const newColumns = setIn(columns, widthLast + (width - newFullWidth), [String(lastElemIdx), 'width']);
      setMappedColumns(newColumns);
      fullWidthRef.current = newFullWidth;
      return;
    }

    fullWidthRef.current = newFullWidth;
    setMappedColumns(columns);
  }, [columns, contextTheme, theme, width]);

  const handleScroll = useCallback((e: ScrollPosition) => {
    if (gridRef.current) gridRef.current.recomputeGridSize();
    setScrollLeft(-e.scrollLeft);
    if (onScrollsyncScroll) {
      onScrollsyncScroll(e);
    }
  }, [setScrollLeft, onScrollsyncScroll]);

  const cellRenderer = ({
    columnIndex, key, parent, rowIndex, style,
  }: GridCellProps) => {
    const isFirstColumn = columnIndex === 0;

    const row = mappedItems[rowIndex];
    const column = filteredColums[columnIndex];

    const expandLevel = isFirstColumn ? row.expandLevel : 0;

    const renderFunction = column.render;

    const content = row[column.field];

    const cellContent = renderFunction ? renderFunction(content, column.field, row) : content;

    const handleExpand = () => {
      onChangeExpand(rowIndex, mappedItems[rowIndex].children);
    };
    const isSelected = selectedRows
      .some((k: string) => k === mappedItems[rowIndex].key);

    return (
      <CellMeasurer
        cache={ cacheRef.current }
        columnIndex={ columnIndex }
        key={ key }
        parent={ parent }
        rowIndex={ rowIndex }
      >
        <BodyCell
          onClick={ (e: MouseEvent) => handleSelect(e, mappedItems[rowIndex].key) }
          key={ key }
          selected={ isSelected }
          style={ {
            ...style,
            width: column.width,
          } }
          firstRow={ rowIndex === 0 }
          even={ !!(rowIndex % 2) }
          theme={ themeRef.current }
        >
          <BodyCellOffset
            center={ !!column.center }
            expandLevel={ expandLevel }
            theme={ themeRef.current }
          />


          <BodyCellContent
            theme={ themeRef.current }
            center={ !!column.center }
            selected={ isSelected }
          >

            { column.isExpandable && mappedItems[rowIndex].children && (
              <ExpandButtonWrapper onClick={ handleExpand } theme={ themeRef.current }>
                { mappedItems[rowIndex].isExpand
                  ? <RemoveIcon />
                  : <AddIcon /> }
              </ExpandButtonWrapper>
            ) }

            { column.isExpandable && !mappedItems[rowIndex].children && (
              <ShiftInsteadButton theme={ themeRef.current } />
            ) }

            <span>{ cellContent }</span>
          </BodyCellContent>
        </BodyCell>
      </CellMeasurer>
    );
  };

  const handleChangeWidth = useCallback(
    (index, newWidth) => {
      let newColumns: IColumn[] = setIn(mappedColumns, newWidth, [index, 'width']);
      let newFullWidth: number = newColumns.reduce(
        (acc, { width: colWidth }) => (acc + colWidth),
        0,
      );

      if (newFullWidth < width) {
        const lastColIdx = searchLastVisible(newColumns, newColumns.length);
        newColumns = setIn(
          newColumns,
          newColumns[lastColIdx].width + (width - newFullWidth),
          [String(lastColIdx), 'width'],
        );

        newFullWidth = newColumns.reduce(
          (acc, { width: colWidth }) => (acc + colWidth),
          0,
        );
      }
      fullWidthRef.current = newFullWidth;
      setMappedColumns(newColumns);
      onChangeColumns(newColumns);
    },
    [mappedColumns, onChangeColumns, width],
  );


  const handleChangeMoving = useCallback(
    (newColumns) => {
      setMappedColumns(newColumns);
      onChangeColumns(newColumns);
    },
    [onChangeColumns],
  );

  useEffect(() => {
    if (gridRef.current) gridRef.current.recomputeGridSize();
    // if (gridRef.current) gridRef.current.measureAllCells();
    // if (cacheRef.current) cacheRef.current.clearAll();
  }, [mappedColumns, mappedItems]);

  const {
    header: { height: headerHeight = 0 } = {},
    totals: { height: totalsHeight = 0 } = {},
  } = themeRef.current;


  return (
    <Wrapper theme={ themeRef.current } width={ width } changingColumns={ changingColumns }>
      <HeaderWrapper
        fullWidth={ fullWidthRef.current }
        columns={ mappedColumns }
        translateX={ scrollLeft }
        onChangeWidth={ handleChangeWidth }
        onChangeMoving={ handleChangeMoving }
        setChangingColumns={ setChangingColumns }
        theme={ themeRef.current }
        shouldMovingColumns={ shouldMovingColumns }
        shouldChangeColumnsWidth={ shouldChangeColumnsWidth }
      />
      <Body
        rightScroll={ rightScroll }
        bottomScroll={ bottomScroll }
      >
        <VirtualisedGrid
          ref={ gridRef as MutableRefObject<VirtualisedGrid> }
          columnCount={ filteredColums.length }
          columnWidth={ ({ index }: any) => filteredColums[index].width }
          deferredMeasurementCache={ cacheRef.current }
          height={ height - Number(headerHeight) - Number(totals ? totalsHeight : 0) }
          cellRenderer={ cellRenderer }
          rowCount={ mappedItems.length }
          rowHeight={ cacheRef.current.rowHeight }
          width={ width }
          onScroll={ handleScroll }
          scrollTop={ scrollTop }
        />
      </Body>
      { totals && (
        <TotalBlock
          width={ fullWidthRef.current }
          translateX={ scrollLeft }
          theme={ themeRef.current }
        >
          { filteredColums.map((el: IColumn, index: number) => (
            <TotalCell
              theme={ themeRef.current }
              width={ filteredColums.length === index + 1 ? el.width + 8 : el.width }
            >
              <TotalCellContent center={ !!el.center } theme={ themeRef.current }>
                <span>{ totals[el.field] }</span>
              </TotalCellContent>
            </TotalCell>
          )) }
        </TotalBlock>
      ) }
    </Wrapper>
  );
};

export default Grid;
