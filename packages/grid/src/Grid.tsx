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
  CellMeasurerCache,
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
import {
  guid, addOrDeleteItemFromArray, gridTheme, deletePropsFromObjects, searchLastVisible,
} from './utils';

import { HeaderWrapper } from './HeaderWrapper';
import {
  IItem, IColumn, IGrid, IMappedItem,
} from './interfaces';


const Grid = ({
  items = [],
  columns = [],
  width = 0,
  height = 0,
  isDisableSelect = false,
  isMultiSelect = false,
  onChangeColumns = () => {},
  totals,
  theme,
  onSelect = () => {},
  shouldMovingColumns = true,
  shouldChangeColumnsWidth = true,
  isScrollingOptOut = true,
  overscanColumnCount = 8,
  overscanRowCount = 8,
}: IGrid) => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(gridTheme(theme || contextTheme));

  const [mappedColumns, setMappedColumns] = useState<IColumn[]>(columns);
  const [mappedItems, setMappedItems] = useState<IMappedItem[]>(
    items.map((el: IItem): IMappedItem => ({ ...el, key: guid(), expandLevel: 0 })),
  );
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const fullWidthRef = useRef(
    mappedColumns.filter(({ visible }: IColumn) => visible).reduce(
      (acc: number, { width: colWidth }: IColumn): number => (acc + colWidth), 0,
    ),
  );
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [changingColumns, setChangingColumns] = useState<string>('');
  const gridRef = useRef<VirtualisedGrid>();
  const cacheRef = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    }),
  );

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

  useEffect(() => {
    setMappedItems(items.map((el: IItem) => ({ ...el, key: guid(), expandLevel: 0 })));
  }, [items]);

  const handleScroll = (e: ScrollPosition) => {
    setScrollLeft(-e.scrollLeft);
  };

  const onChangeExpand = useCallback(
    (index: number, childrens: IItem[]) => {
      if (mappedItems[index].isExpand) {
        let childrensLength = 0;
        for (let i = index + 1; i < mappedItems.length; i++) {
          if (mappedItems[i].expandLevel) childrensLength += 1;
          else break;
        }
        const newMappedItems = [
          ...mappedItems.slice(0, index + 1),
          ...mappedItems.slice(index + 1 + childrensLength),
        ];
        const withNewExpand = setIn(newMappedItems, false, [
          String(index),
          'isExpand',
        ]);
        setMappedItems(withNewExpand);
      } else {
        const parentExpandLevel = mappedItems[index].expandLevel || 0;
        const newChildrens = childrens.map(
          (el: IItem): IMappedItem => ({
            ...el,
            expandLevel: parentExpandLevel + 1,
            key: guid(),
          }),
        );
        const newMappedItems = [
          ...mappedItems.slice(0, index + 1),
          ...newChildrens,
          ...mappedItems.slice(index + 1),
        ];
        const withNewExpand = setIn(newMappedItems, true, [String(index), 'isExpand']);
        setMappedItems(withNewExpand);
      }
    },
    [mappedItems],
  );

  const handleSelect = useCallback(
    (e, key) => {
      if (isDisableSelect
           || e.target.tagName === 'svg'
           || e.target.tagName === 'path'
           || e.target.tagName === 'BUTTON'
      ) return;
      if (isMultiSelect) {
        const newSelectedRows = addOrDeleteItemFromArray(selectedRows, key);
        onSelect(
          deletePropsFromObjects(
            mappedItems.filter((el: IMappedItem) => newSelectedRows.some((id) => id === el.key)), 'key', 'expandLevel',
          ),
        );
        setSelectedRows(newSelectedRows);
        return;
      }
      if (selectedRows[0] === key) {
        onSelect({});
        setSelectedRows([]);
      } else {
        const selectedRow = {
          ...mappedItems
            .find((el: IMappedItem) => el.key === key),
        } as IMappedItem;
        delete selectedRow.key;
        delete selectedRow.expandLevel;
        onSelect(selectedRow);
        setSelectedRows([key]);
      }
    },
    [isDisableSelect, isMultiSelect, selectedRows, onSelect, mappedItems],
  );

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
    if (cacheRef.current) cacheRef.current.clearAll();
  }, [mappedColumns, mappedItems]);

  useEffect(() => {
    if (gridRef.current) gridRef.current.recomputeGridSize();
  }, [selectedRows]);

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
      <Body>
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
          isScrollingOptOut={ isScrollingOptOut }
          overscanColumnCount={ overscanColumnCount }
          overscanRowCount={ overscanRowCount }
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
              width={ filteredColums.length === index + 1 ? el.width + 9 : el.width }
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
