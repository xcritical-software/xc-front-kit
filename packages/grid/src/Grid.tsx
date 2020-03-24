import React, {
  useState, useEffect, useRef, useCallback, useMemo, useContext,
} from 'react';


import { ThemeContext } from 'styled-components';
import ResizeObserver from 'resize-observer-polyfill';
import { setIn } from 'utilitify';

import { ScrollSync, CellMeasurerCache } from 'react-virtualized';

import InternalGrid from './InternalGrid';
import {
  IMappedItem, IItem, IGridProps, IColumn,
} from './interfaces';
import {
  guid, addOrDeleteItemFromArray, deletePropsFromObjects, gridTheme,
} from './utils';
import { MultiGrid } from './MultiGrid';
import { gridPositions } from './consts';
import { MultiGridWrapper } from './styled';


const Grid: React.FC<IGridProps> = ({
  shouldFitContainer,
  items,
  isDisableSelect = false,
  isMultiSelect = false,
  onSelect,
  theme,
  rowHeight,
  shouldChangeColumnsWidth = true,
  shouldChangeLeftColumnsWidth = true,
  shouldChangeRightColumnsWidth = true,
  columns,
  totals,
  onChangeColumns: onChangeColumnsFromProps = () => {},
  shouldMovingColumns,
  width = 0,
  height = 0,
  isScrollingOptOut = true,
  overscanColumnCount = 8,
  overscanRowCount = 8,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const [mappedItems, setMappedItems] = useState<IMappedItem[]>(
    items.map((el: IItem): IMappedItem => ({ ...el, key: guid(), expandLevel: 0 })),
  );

  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(gridTheme(theme || contextTheme));

  useEffect(() => {
    themeRef.current = gridTheme(theme || contextTheme);
  }, [theme, contextTheme]);

  const cacheRef = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      fixedHeight: Boolean(rowHeight),
      defaultHeight: rowHeight || 100,
    }),
  );

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const createObserver = (): ResizeObserver | undefined => {
    if (wrapperRef.current === null) {
      return undefined;
    }
    const observer = new ResizeObserver((): undefined => {
      if (wrapperRef.current === null) {
        return undefined;
      }
      setWrapperSize({
        width: wrapperRef.current.clientWidth,
        height: wrapperRef.current.clientHeight,
      });
      return undefined;
    });
    observer.observe(wrapperRef.current);
    return observer;
  };

  const observerRef: React.MutableRefObject<ResizeObserver | undefined> = useRef();

  useEffect(() => {
    if (shouldFitContainer) observerRef.current = createObserver();
  }, [shouldFitContainer]);

  useEffect(
    () => () => {
      if (shouldFitContainer && observerRef.current && wrapperRef.current) {
        observerRef.current.unobserve(wrapperRef.current);
        observerRef.current.disconnect();
      }
    },
    [observerRef, shouldFitContainer],
  );

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
        if (onSelect) {
          onSelect(
            deletePropsFromObjects(
              mappedItems.filter((el: IMappedItem) => newSelectedRows.some((id) => id === el.key)), 'key', 'expandLevel',
            ),
          );
        }
        setSelectedRows(newSelectedRows);
        return;
      }
      if (selectedRows[0] === key) {
        if (onSelect) {
          onSelect({});
        }

        setSelectedRows([]);
      } else {
        const selectedRow = {
          ...mappedItems
            .find((el: IMappedItem) => el.key === key),
        } as IMappedItem;
        delete selectedRow.key;
        delete selectedRow.expandLevel;
        if (onSelect) {
          onSelect(selectedRow);
        }
        setSelectedRows([key]);
      }
    },
    [isDisableSelect, isMultiSelect, selectedRows, onSelect, mappedItems],
  );


  useEffect(() => {
    setMappedItems(items.map((el: IItem) => ({ ...el, key: guid(), expandLevel: 0 })));
  }, [items]);

  const isMultiGrid = useMemo(() => columns
    .some(({ fixedPosition }: IColumn) => Boolean(fixedPosition)), [columns]);


  const mappedColumns = useMemo(() => [...columns], [columns]);

  const [leftMappedColumns, setLeftMappedColumns] = useState<IColumn[]>(
    mappedColumns.filter(({ fixedPosition }) => fixedPosition === gridPositions.LEFT),
  );

  const [centerMappedColumns, setCenterMappedColumns] = useState<IColumn[]>(
    mappedColumns.filter(({ fixedPosition }) => !fixedPosition),
  );

  const [rightMappedColumns, setRightMappedColumns] = useState<IColumn[]>(
    mappedColumns.filter(({ fixedPosition }) => fixedPosition === gridPositions.RIGHT),
  );

  const [leftFixedWidth, setLeftFixedWidth] = useState(0);
  const [rightFixedWidth, setRightFixedWidth] = useState(0);


  useEffect(() => {
    setLeftMappedColumns(mappedColumns
      .filter(({ fixedPosition }: IColumn) => fixedPosition === gridPositions.LEFT));

    setCenterMappedColumns(mappedColumns
      .filter(({ fixedPosition }: IColumn) => !fixedPosition));

    setRightMappedColumns(mappedColumns
      .filter(({ fixedPosition }: IColumn) => fixedPosition === gridPositions.RIGHT));
  }, [mappedColumns]);

  useEffect(() => {
    setLeftFixedWidth(
      leftMappedColumns
        .filter(({ visible }: IColumn) => visible)
        .reduce((acc, { width: $width }) => acc + $width, 0),
    );
    setRightFixedWidth(
      rightMappedColumns
        .filter(({ visible }: IColumn) => visible)
        .reduce((acc, { width: $width }) => acc + $width, 0),
    );
  }, [leftMappedColumns, rightMappedColumns]);

  const onChangeColumns = useCallback((cols, gridPosition) => {
    if (gridPosition === gridPositions.LEFT) {
      onChangeColumnsFromProps([
        ...cols,
        ...centerMappedColumns,
        ...rightMappedColumns,
      ]);
    } else if (gridPosition === gridPositions.CENTER) {
      onChangeColumnsFromProps([
        ...leftMappedColumns,
        ...cols,
        ...rightMappedColumns,
      ]);
    } else {
      onChangeColumnsFromProps([
        ...leftMappedColumns,
        ...centerMappedColumns,
        ...cols,
      ]);
    }
  }, [
    leftMappedColumns,
    centerMappedColumns,
    rightMappedColumns,
  ]);


  if (isMultiGrid) {
    const multiGridProps = {
      shouldMovingColumns,
      shouldChangeColumnsWidth,
      shouldChangeLeftColumnsWidth,
      shouldChangeRightColumnsWidth,
      width,
      height,

      leftFixedWidth,
      rightFixedWidth,

      leftMappedColumns,
      centerMappedColumns,
      rightMappedColumns,


      setLeftMappedColumns,
      setCenterMappedColumns,
      setRightMappedColumns,

      isScrollingOptOut,
      overscanColumnCount,
      overscanRowCount,
      allGridsProps: {
        onChangeColumns,
        totals,
        handleSelect,
        onChangeExpand,
        mappedItems,
        selectedRows,
        cacheRef,
        themeRef: themeRef || {},
        rowHeight,
      },
    };

    if (shouldFitContainer) {
      multiGridProps.width = wrapperSize.width;
      multiGridProps.height = wrapperSize.height;

      return (
        <ScrollSync>
          { ({
            onScroll,
            scrollTop,
          }) => (
            <MultiGridWrapper height="100%" ref={ wrapperRef }>
              <MultiGrid
                { ...multiGridProps }
                onScroll={ onScroll }
                scrollTop={ scrollTop }
              />
            </MultiGridWrapper>
          ) }
        </ScrollSync>
      );
    }

    return (
      <ScrollSync>
        { ({
          onScroll,
          scrollTop,
        }) => (
          <MultiGridWrapper ref={ wrapperRef }>
            <MultiGrid
              { ...multiGridProps }
              onScroll={ onScroll }
              scrollTop={ scrollTop }
            />
          </MultiGridWrapper>
        ) }
      </ScrollSync>
    );
  }

  const singleGridProps = {
    handleSelect,
    onChangeExpand,
    mappedItems,
    selectedRows,
    cacheRef,
    themeRef,
    rowHeight,
    shouldChangeColumnsWidth,
    gridHOCMappedColumns: centerMappedColumns,
    setGridHOCMappedColumns: setCenterMappedColumns,
    totals,
    onChangeColumns,
    isScrollingOptOut,
    overscanColumnCount,
    overscanRowCount,
    shouldMovingColumns,
    shiftFirstColumn: true,
  };

  if (shouldFitContainer) {
    return (
      <div ref={ wrapperRef } style={ { height: '100%' } }>
        <InternalGrid
          width={ wrapperSize.width }
          height={ wrapperSize.height }
          gridPosition={ gridPositions.CENTER }
          { ...singleGridProps }
        />
      </div>
    );
  }


  return (
    <InternalGrid
      width={ width }
      height={ height }
      gridPosition={ gridPositions.CENTER }
      { ...singleGridProps }
    />
  );
};


export default Grid;
