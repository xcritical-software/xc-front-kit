/* eslint-disable no-underscore-dangle */
import React, {
  useState, useEffect, useRef, useCallback, useMemo, useContext,
} from 'react';


import { ThemeContext } from 'styled-components';
import ResizeObserver from 'resize-observer-polyfill';
import { setIn } from 'utilitify';

import { ScrollSync } from 'react-virtualized';

import InternalGrid from './InternalGrid';
import {
  IMappedItem, IItem, IGridProps, IColumn,
} from './interfaces';
import {
  guid,
  addOrDeleteItemFromArray,
  gridTheme,
  getFullWidth,
  removeSorting,
  changeGridSort,
  deleteSystemPropsFromObjects,
  deleteSystemPropsFromObject,
} from './utils';
import { MultiGrid } from './MultiGrid';
import { GridPositions, GridSort } from './consts';
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
  onSortChanged = () => {},
  shouldMovingColumns,
  width = 0,
  height = 0,
  isScrollingOptOut = true,
  overscanColumnCount = 8,
  overscanRowCount = 8,
  shouldFitLastColumn = true,
  minColumnWidth = 30,
  gridProps = {},
  onChangeExpand: onChangeExpandFromProps,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const [mappedItems, setMappedItems] = useState<IMappedItem[]>(
    items.map((el: IItem): IMappedItem => ({ __expandLevel: 0, ...el, __key: guid() })),
  );

  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(gridTheme(theme ?? contextTheme));

  useEffect(() => {
    themeRef.current = gridTheme(theme ?? contextTheme);
  }, [theme, contextTheme]);


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
    (index: number, childrens: IItem[], parent: IMappedItem) => {
      if (mappedItems[index].__isExpand) {
        let childrensLength = 0;
        for (let i = index + 1; i < mappedItems.length; i++) {
          if (mappedItems[i].__expandLevel) childrensLength += 1;
          else break;
        }
        const newMappedItems = [
          ...mappedItems.slice(0, index + 1),
          ...mappedItems.slice(index + 1 + childrensLength),
        ];
        const withNewExpand = setIn(newMappedItems, false, [
          String(index),
          '__isExpand',
        ]);

        if (onChangeExpandFromProps) {
          onChangeExpandFromProps(mappedItems[index], false);
        }

        setMappedItems(withNewExpand);
      } else {
        const parentExpandLevel = mappedItems[index].__expandLevel || 0;
        const newChildrens = childrens.map(
          (el: IItem): IMappedItem => ({
            ...el,
            __expandLevel: parentExpandLevel + 1,
            __parent: parent,
            __key: guid(),
          }),
        );
        const newMappedItems = [
          ...mappedItems.slice(0, index + 1),
          ...newChildrens,
          ...mappedItems.slice(index + 1),
        ];
        const withNewExpand = setIn(newMappedItems, true, [String(index), '__isExpand']);

        if (onChangeExpandFromProps !== undefined) {
          onChangeExpandFromProps(mappedItems[index], true);
        }

        setMappedItems(withNewExpand);
      }
    },
    [mappedItems, onChangeExpandFromProps],
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
            deleteSystemPropsFromObjects(
              mappedItems.filter((el) => newSelectedRows.some((id) => id === el.__key)),
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
        const selectedRow = mappedItems
          .find((el) => el.__key === key);

        if (onSelect) {
          onSelect(deleteSystemPropsFromObject(selectedRow));
        }

        setSelectedRows([key]);
      }
    },
    [isDisableSelect, isMultiSelect, selectedRows, onSelect, mappedItems],
  );


  useEffect(() => {
    setMappedItems(items.map((el) => ({ __expandLevel: 0, ...el, __key: guid() })));
  }, [items]);

  const isMultiGrid = useMemo(() => columns
    .some(({ fixedPosition }: IColumn) => Boolean(fixedPosition)), [columns]);


  const mappedColumns = useMemo(() => [...columns], [columns]);

  const [leftMappedColumns, setLeftMappedColumns] = useState<IColumn[]>(
    mappedColumns.filter(({ fixedPosition }) => fixedPosition === GridPositions.LEFT),
  );

  const [centerMappedColumns, setCenterMappedColumns] = useState<IColumn[]>(
    mappedColumns.filter(({ fixedPosition }) => !fixedPosition),
  );

  const [rightMappedColumns, setRightMappedColumns] = useState<IColumn[]>(
    mappedColumns.filter(({ fixedPosition }) => fixedPosition === GridPositions.RIGHT),
  );

  const [leftFixedWidth, setLeftFixedWidth] = useState(0);
  const [rightFixedWidth, setRightFixedWidth] = useState(0);


  useEffect(() => {
    setLeftMappedColumns(mappedColumns
      .filter(({ fixedPosition }: IColumn) => fixedPosition === GridPositions.LEFT));

    setCenterMappedColumns(mappedColumns
      .filter(({ fixedPosition }: IColumn) => !fixedPosition));

    setRightMappedColumns(mappedColumns
      .filter(({ fixedPosition }: IColumn) => fixedPosition === GridPositions.RIGHT));
  }, [mappedColumns]);

  useEffect(() => {
    setLeftFixedWidth(
      getFullWidth(leftMappedColumns),
    );
    setRightFixedWidth(
      getFullWidth(rightMappedColumns),
    );
  }, [leftMappedColumns, rightMappedColumns]);

  const onChangeColumns = useCallback((cols, gridPosition) => {
    if (gridPosition === GridPositions.LEFT) {
      setLeftMappedColumns(cols);
      onChangeColumnsFromProps([
        ...cols,
        ...centerMappedColumns,
        ...rightMappedColumns,
      ]);
    } else if (gridPosition === GridPositions.CENTER) {
      setCenterMappedColumns(cols);
      onChangeColumnsFromProps([
        ...leftMappedColumns,
        ...cols,
        ...rightMappedColumns,
      ]);
    } else {
      setRightMappedColumns(cols);
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


  const onChangeSort = useCallback((sortable, sortOrder, index, gridPosition) => {
    if (!sortable) return;

    // ask => desk => null => ask
    let newSortOrder: GridSort.ASC | GridSort.DESC | null = null;

    if (!sortOrder) newSortOrder = GridSort.ASC;

    if (sortOrder === GridSort.ASC) newSortOrder = GridSort.DESC;

    if (sortOrder === GridSort.DESC) newSortOrder = null;

    const newLeftColumns = removeSorting(leftMappedColumns);
    const newCenterColumns = removeSorting(centerMappedColumns);
    const newRightColumns = removeSorting(rightMappedColumns);

    const newAllColumns = changeGridSort({
      sortOrder: newSortOrder,
      index,
      gridPosition,
      leftColumns: newLeftColumns,
      centerColumns: newCenterColumns,
      rightColumns: newRightColumns,
      setLeftMappedColumns,
      setCenterMappedColumns,
      setRightMappedColumns,
    });
    onSortChanged(newAllColumns);
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
      shouldFitLastColumn,
      allGridsProps: {
        onChangeColumns,
        totals,
        handleSelect,
        onChangeExpand,
        mappedItems,
        selectedRows,
        themeRef: themeRef || {},
        rowHeight,
        minColumnWidth,
        onChangeSort,
        gridProps,
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
    onChangeSort,
    shouldFitLastColumn,
    minColumnWidth,
    gridProps,
  };

  if (shouldFitContainer) {
    return (
      <div ref={ wrapperRef } style={ { height: '100%' } }>
        <InternalGrid
          width={ wrapperSize.width }
          height={ wrapperSize.height }
          gridPosition={ GridPositions.CENTER }
          { ...singleGridProps }
        />
      </div>
    );
  }


  return (
    <InternalGrid
      width={ width }
      height={ height }
      gridPosition={ GridPositions.CENTER }
      { ...singleGridProps }
    />
  );
};


export default Grid;
