import React, {
  useState, useEffect, useRef, useCallback, useMemo, useContext,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { setIn } from 'utilitify';

import {
  ScrollSync, CellMeasurerCache, GridCellProps, CellMeasurer,
} from 'react-virtualized';
import { CSSProperties, ThemeContext } from 'styled-components';
import Grid from './Grid';
import {
  IMappedItem, IItem, IGridHOC, IColumn,
} from './interfaces';
import {
  guid, addOrDeleteItemFromArray, deletePropsFromObjects, gridTheme,
} from './utils';
import { MultyGrid } from './MultyGrid';
import {
  BodyCell, BodyCellOffset, BodyCellContent, ExpandButtonWrapper, ShiftInsteadButton,
} from './styled';
import { RemoveIcon, AddIcon } from './icons';


const GridHOC = ({
  shouldFitContainer,
  items,
  isDisableSelect = false,
  isMultiSelect = false,
  onSelect,
  ...rest
}: IGridHOC) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const [mappedItems, setMappedItems] = useState<IMappedItem[]>(
    items.map((el: IItem): IMappedItem => ({ ...el, key: guid(), expandLevel: 0 })),
  );

  const cacheRef = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
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


  // useEffect(() => {
  //   setMappedItems(items.map((el: IItem) => ({ ...el, key: guid(), expandLevel: 0 })));
  // }, [items]);

  const isMultiGrid = useMemo(() => rest.columns
    .some(({ fixedPosition }: IColumn) => Boolean(fixedPosition)), [rest.columns]);

  const {
    leftFixedColumns,
    rightFixedColumns,
    notFixedColumns,
    leftFixedWidth,
    rightFixedWidth,
  } = useMemo(() => {
    const $leftFixedColumns = rest.columns.filter(({ fixedPosition }: any) => fixedPosition === 'left');
    const $rightFixedColumns = rest.columns.filter(({ fixedPosition }: any) => fixedPosition === 'right');
    const $notFixedColumns = rest.columns.filter(({ fixedPosition }: any) => !fixedPosition);

    /* eslint-disable max-len */
    const $leftFixedWidth = $leftFixedColumns.reduce((acc, { width }) => Number(acc) + Number(width), 0);
    const $rightFixedWidth = $rightFixedColumns.reduce((acc, { width }) => Number(acc) + Number(width), 0);
    /* eslint-enable max-len */

    /* eslint-disable key-spacing */
    return {
      leftFixedColumns:  $leftFixedColumns,
      rightFixedColumns: $rightFixedColumns,
      notFixedColumns:   $notFixedColumns,
      leftFixedWidth:    $leftFixedWidth,
      rightFixedWidth:   $rightFixedWidth,
    };
    /* eslint-enable key-spacing */
  }, [isMultiGrid]);


  /* !!!!!!!!!!!!!!!!!!!!!!!!!!! */

  useEffect(() => {
    setMappedItems(items.map((el: IItem) => ({ ...el, key: guid(), expandLevel: 0 })));
  }, [items]);

  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(gridTheme(rest.theme || contextTheme));


  const [mappedColumns, setMappedColumns] = useState<IColumn[]>(notFixedColumns);
  const [leftMappedColumns, setLeftMappedColumns] = useState<IColumn[]>(leftFixedColumns);
  const [rightMappedColumns, setRightMappedColumns] = useState<IColumn[]>(rightFixedColumns);


  useEffect(() => {
    setMappedItems(items.map((el: IItem) => ({ ...el, key: guid(), expandLevel: 0 })));
  }, [items]);


  const filteredColums = useMemo(() => (
    mappedColumns.filter(({ visible }) => visible)
  ), [mappedColumns]);
  const filteredColumsLeft = useMemo(() => (
    leftMappedColumns.filter(({ visible }) => visible)
  ), [leftMappedColumns]);
  const filteredColumsRight = useMemo(() => (
    rightMappedColumns.filter(({ visible }) => visible)
  ), [rightMappedColumns]);


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


  const cellRendererLeft = ({
    columnIndex, key, parent, rowIndex, style,
  }: GridCellProps) => {
    const isFirstColumn = columnIndex === 0;

    const row = mappedItems[rowIndex];
    const column = filteredColumsLeft[columnIndex];

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


  const cellRendererRight = ({
    columnIndex, key, parent, rowIndex, style,
  }: GridCellProps) => {
    const isFirstColumn = columnIndex === 0;

    const row = mappedItems[rowIndex];
    const column = filteredColumsRight[columnIndex];

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


  if (isMultiGrid) {
    const styles: CSSProperties = {
      display: 'flex',
    };

    const multyGridProps = {
      theme: rest.theme,
      totals: rest.totals,

      shouldMovingColumns: rest.shouldMovingColumns,
      shouldChangeColumnsWidth: rest.shouldChangeColumnsWidth,


      width: 0,
      height: 0,

      onChangeExpand,
      handleSelect,

      selectedRows,
      mappedItems,

      leftFixedColumns,
      leftFixedWidth,

      rightFixedColumns,
      rightFixedWidth,

      wrapperSize,
      notFixedColumns,

      setMappedColumns,
      cellRenderer,
      mappedColumns,
      filteredColums,


      leftMappedColumns,
      setLeftMappedColumns,
      rightMappedColumns,
      setRightMappedColumns,

      filteredColumsLeft,
      filteredColumsRight,


      cellRendererLeft,
      cellRendererRight,


    };

    if (shouldFitContainer) {
      styles.height = '100%';
      multyGridProps.width = wrapperSize.width;
      multyGridProps.height = wrapperSize.height;

      return (
        <ScrollSync>
          { ({
            onScroll,
            scrollTop,
          }) => (
            <div style={ styles } ref={ wrapperRef }>
              <MultyGrid
                { ...multyGridProps }
                onScroll={ onScroll }
                scrollTop={ scrollTop }
                cacheRef={ cacheRef }

              />
            </div>
          ) }
        </ScrollSync>
      );
    }

    multyGridProps.width = rest.width as number;
    multyGridProps.height = rest.height as number;
    return (
      <ScrollSync>
        { ({
          onScroll,
          scrollTop,
        }) => (
          <div style={ styles } ref={ wrapperRef }>
            <MultyGrid
              { ...multyGridProps }
              onScroll={ onScroll }
              scrollTop={ scrollTop }
              cacheRef={ cacheRef }
            />
          </div>
        ) }
      </ScrollSync>
    );
  }


  if (shouldFitContainer) {
    return (
      <div ref={ wrapperRef } style={ { height: '100%' } }>
        <Grid
          handleSelect={ handleSelect }
          onChangeExpand={ onChangeExpand }
          mappedItems={ mappedItems }
          selectedRows={ selectedRows }
          width={ wrapperSize.width }
          height={ wrapperSize.height }
          cacheRef={ cacheRef }
          setMappedColumns={ setMappedColumns }
          mappedColumns={ mappedColumns }
          filteredColums={ filteredColums }
          cellRenderer={ cellRenderer }
          { ...rest }
        />
      </div>
    );
  }


  return (
    <Grid
      handleSelect={ handleSelect }
      selectedRows={ selectedRows }
      onChangeExpand={ onChangeExpand }
      mappedItems={ mappedItems }
      { ...rest }
      /* eslint-disable @typescript-eslint/no-non-null-assertion  */
      width={ rest.width! }
      cacheRef={ cacheRef }
      height={ rest.height! }
      setMappedColumns={ setMappedColumns }
      mappedColumns={ mappedColumns }
      filteredColums={ filteredColums }
      cellRenderer={ cellRenderer }
      /* eslint-enable @typescript-eslint/no-non-null-assertion  */
    />
  );
};


export default GridHOC;
