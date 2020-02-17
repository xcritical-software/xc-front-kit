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
import { searchLastVisible } from './utils';

import { HeaderWrapper } from './HeaderWrapper';
import {
  IColumn, IGrid,
} from './interfaces';


const Grid = ({
  mappedItems = [],
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
  themeRef,
  rowHeight,
  gridHOCMappedColumns,
  setGridHOCMappedColumns,
  resizeGridAfterResizeLastColumn,
}: IGrid) => {
  const [mappedColumns, setMappedColumns] = useState<IColumn[]>(gridHOCMappedColumns);
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
    const newFullWidth = gridHOCMappedColumns.filter(({ visible }: IColumn) => visible).reduce(
      (acc: number, { width: colWidth }: IColumn): number => (acc + colWidth), 0,
    );

    fullWidthRef.current = newFullWidth;
    if (newFullWidth < width) {
      const lastElemIdx = searchLastVisible(gridHOCMappedColumns, gridHOCMappedColumns.length);
      const widthLast = gridHOCMappedColumns[lastElemIdx].width;
      const newColumns = setIn(gridHOCMappedColumns, Number(widthLast) + (width - newFullWidth), [String(lastElemIdx), 'width']);
      setMappedColumns(newColumns);
      fullWidthRef.current = newFullWidth;
      return;
    }

    fullWidthRef.current = newFullWidth;
    setMappedColumns(gridHOCMappedColumns);
  }, [gridHOCMappedColumns, theme, width]);

  const handleScroll = useCallback((e: ScrollPosition) => {
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

      if (newFullWidth < width && !resizeGridAfterResizeLastColumn) {
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
    if (cacheRef.current && !rowHeight) cacheRef.current.clearAll();
  }, [mappedColumns, mappedItems]);

  const {
    header: { height: headerHeight = 0 } = {},
    totals: { height: totalsHeight = 0 } = {},
  } = themeRef.current;

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
          height={ gridHeight }
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
