/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  MutableRefObject,
  useMemo,
} from 'react';
import {
  Grid as VirtualisedGrid,
  CellMeasurer,
  ScrollPosition,
  GridCellProps,
  CellMeasurerCache,
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
  TotalsShift,
} from './styled';
import { AddIcon, RemoveIcon } from './icons';
import { searchLastVisible, getFullWidth } from './utils';

import { HeaderWrapper } from './HeaderWrapper';
import {
  IColumn, IInternalGrid,
} from './interfaces';


const InternalGrid: React.FC<IInternalGrid> = ({
  rightScroll = true,
  bottomScroll = true,
  width,
  height,
  shouldMovingColumns = true,
  shouldChangeColumnsWidth = true,
  scrollTop,
  onScrollsyncScroll,
  gridHOCMappedColumns,
  setGridHOCMappedColumns,
  resizeGridAfterResizeLastColumn,
  gridPosition,
  onChangeColumns = () => {},
  totals,
  handleSelect,
  onChangeExpand,
  mappedItems = [],
  selectedRows,
  themeRef,
  rowHeight,
  isScrollingOptOut,
  overscanColumnCount,
  overscanRowCount,
  shiftFirstColumn,
  onChangeSort,
  shouldFitLastColumn,
  minColumnWidth,
  externalScrollLeft,
  onChangeScrollLeft,
  gridProps,
}) => {
  const [mappedColumns, setMappedColumns] = useState<IColumn[]>(gridHOCMappedColumns);
  const fullWidthRef = useRef(getFullWidth(mappedColumns));
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [changingColumns, setChangingColumns] = useState<string>('');
  const gridRef = useRef<VirtualisedGrid>();
  const cacheRef = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      fixedHeight: Boolean(rowHeight),
      defaultHeight: rowHeight ?? 100,
    }),
  );

  const filteredColums = useMemo<IColumn[]>(() => (
    mappedColumns.filter(({ visible }) => visible)
  ), [mappedColumns]);

  useEffect(() => {
    const newFullWidth = getFullWidth(gridHOCMappedColumns);

    fullWidthRef.current = newFullWidth;

    if (newFullWidth < width && shouldFitLastColumn) {
      const lastElemIdx = searchLastVisible(gridHOCMappedColumns, gridHOCMappedColumns.length);
      const widthLast = gridHOCMappedColumns[lastElemIdx].width;
      const newColumns = setIn(gridHOCMappedColumns, Number(widthLast) + (width - newFullWidth), [String(lastElemIdx), 'width']);
      setMappedColumns(newColumns);

      return;
    }

    setMappedColumns(gridHOCMappedColumns);
  }, [gridHOCMappedColumns, width, shouldFitLastColumn]);

  const handleScroll = useCallback((e: ScrollPosition) => {
    setScrollLeft(-e.scrollLeft);

    if (onScrollsyncScroll) {
      onScrollsyncScroll(e);
    }

    if (onChangeScrollLeft && e.scrollLeft !== externalScrollLeft) {
      onChangeScrollLeft(e.scrollLeft);
    }
  }, [setScrollLeft, onScrollsyncScroll, onChangeScrollLeft, externalScrollLeft]);

  const cellRenderer: React.FC<GridCellProps> = ({
    columnIndex,
    key,
    parent,
    rowIndex,
    style,
  }) => {
    const isFirstColumn = columnIndex === 0;

    const row = mappedItems[rowIndex];
    const column = filteredColums[columnIndex];

    const expandLevel = isFirstColumn && shiftFirstColumn ? row.expandLevel : 0;

    const { field, render: renderFunction } = column;
    const {
      [field]: content,
    } = row;

    const cellContent = renderFunction ? renderFunction(content, field, row) : content;

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
          onClick={ (e: MouseEvent) => {
            handleSelect(e, mappedItems[rowIndex].key);
          } }
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
            rowHeight={ rowHeight }
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

      if (
        newFullWidth < width
        && !resizeGridAfterResizeLastColumn
        && shouldFitLastColumn
      ) {
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
      setGridHOCMappedColumns(newColumns);
      setMappedColumns(newColumns);
      onChangeColumns(newColumns, gridPosition);
    },
    [mappedColumns, onChangeColumns, width, gridPosition, shouldFitLastColumn],
  );


  const handleChangeColumns = useCallback(
    (newColumns) => {
      setMappedColumns(newColumns);
      onChangeColumns(newColumns, gridPosition);
    },
    [onChangeColumns, gridPosition],
  );

  useEffect(() => {
    if (isScrollingOptOut) gridRef.current?.recomputeGridSize();
  }, [selectedRows]);

  useEffect(() => {
    if (gridRef.current) gridRef.current.recomputeGridSize();

    if (cacheRef.current && !rowHeight) cacheRef.current.clearAll();
  }, [mappedColumns, mappedItems]);

  useEffect(() => {
    if (gridRef.current) gridRef.current.recomputeGridSize();
  }, [selectedRows]);

  const {
    header: { height: headerHeight = 0 } = {},
    totals: { height: totalsHeight = 0 } = {},
  } = themeRef.current!;

  const gridHeight = useMemo(() => Number(
    height
      - Number(headerHeight)
      - Number(totals ? totalsHeight : 0)
      - (resizeGridAfterResizeLastColumn ? 8 : 0),
  ), [height,
    headerHeight,
    totals,
    totalsHeight,
    resizeGridAfterResizeLastColumn]);

  return (
    <Wrapper theme={ themeRef.current } width={ width } changingColumns={ changingColumns }>
      <HeaderWrapper
        fullWidth={ fullWidthRef.current }
        columns={ mappedColumns }
        translateX={ scrollLeft }
        onChangeWidth={ handleChangeWidth }
        onChangeColumns={ handleChangeColumns }
        setChangingColumns={ setChangingColumns }
        theme={ themeRef.current! }
        shouldMovingColumns={ shouldMovingColumns }
        shouldChangeColumnsWidth={ shouldChangeColumnsWidth }
        gridPosition={ gridPosition }
        minColumnWidth={ minColumnWidth }
        onChangeSort={ onChangeSort }
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
          height={ gridHeight }
          cellRenderer={ cellRenderer }
          rowCount={ mappedItems.length }
          rowHeight={ cacheRef.current.rowHeight }
          width={ width }
          onScroll={ handleScroll }
          scrollTop={ scrollTop }
          scrollLeft={ externalScrollLeft }
          isScrollingOptOut={ isScrollingOptOut }
          overscanColumnCount={ overscanColumnCount }
          overscanRowCount={ overscanRowCount }
          { ...gridProps }
        />
      </Body>
      {
        resizeGridAfterResizeLastColumn && (
          <TotalsShift />
        )
      }
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

export default InternalGrid;
