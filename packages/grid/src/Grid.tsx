import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  MutableRefObject,
  useContext,
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
} from './styled';
import { AddIcon, RemoveIcon } from './icons';
import {
  guid, addOrDeleteItemFromArray, gridTheme, deletePropsFromObjects,
} from './utils';

import { HeaderWrapper } from './HeaderWrapper';
import {
  IItem, IColumn, IGrig, IMappedItem, IGridTheme,
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
}: IGrig) => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(gridTheme<IGridTheme>(theme || contextTheme));
  const [mappedColumns, changeMappedColumns] = useState<IColumn[]>(columns);
  const [mappedRows, changeMappedRows] = useState<IMappedItem[]>(
    items.map((el: IItem): IMappedItem => ({ ...el, key: guid(), expandLevel: 0 })),
  );
  const [selectedRows, changeSelectedRows] = useState<string[]>([]);
  const fullWidth = useRef(
    mappedColumns.reduce(
      (acc: number, { width: colWidth }: IColumn): number => (acc + colWidth), 0,
    ),
  );
  const [scrollLeft, changeScrollLeft] = useState<number>(0);
  const [changingColumns, changeChangingColumns] = useState<string>('');
  const gridRef = useRef<VirtualisedGrid>();
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    }),
  );


  useEffect(() => {
    const fullW = columns.reduce(
      (acc: number, { width: colWidth }: IColumn): number => (acc + colWidth), 0,
    );
    themeRef.current = gridTheme<IGridTheme>(theme || contextTheme);
    fullWidth.current = fullW;
    if (fullW < width) {
      const lastElemIdx = columns.length - 1;
      const widthLast = columns[lastElemIdx].width;
      const newColumns = setIn(columns, widthLast + (width - fullW), [String(lastElemIdx), 'width']);
      changeMappedColumns(newColumns);
      return;
    }
    changeMappedColumns(columns);
  }, [columns, contextTheme, theme, width]);

  useEffect(() => {
    changeMappedRows(items.map((el: IItem) => ({ ...el, key: guid(), expandLevel: 0 })));
  }, [items]);

  const handleScroll = (e: ScrollPosition) => {
    changeScrollLeft(-e.scrollLeft);
  };

  const onChangeExpand = useCallback(
    (index: number, childrens: IItem[]) => {
      if (mappedRows[index].isExpand) {
        console.log('сработает если открыто');
        let childrensLength = 0;
        for (let i = index + 1; i < mappedRows.length; i++) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          if (mappedRows[i].expandLevel) childrensLength += 1;
          else break;
        }
        const newMappedRows = [
          ...mappedRows.slice(0, index + 1),
          ...mappedRows.slice(index + 1 + childrensLength),
        ];
        const withNewExpand = setIn(newMappedRows, false, [
          String(index),
          'isExpand',
        ]);
        changeMappedRows(withNewExpand);
      } else {
        const parentExpandLevel = mappedRows[index].expandLevel || 0;
        const newChildrens = childrens.map(
          (el: IItem): IMappedItem => ({
            ...el,
            expandLevel: parentExpandLevel + 1,
            key: guid(),
          }),
        );
        const newMappedRows = [
          ...mappedRows.slice(0, index + 1),
          ...newChildrens,
          ...mappedRows.slice(index + 1),
        ];
        const withNewExpand = setIn(newMappedRows, true, [String(index), 'isExpand']);
        changeMappedRows(withNewExpand);
      }
    },
    [mappedRows],
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
            mappedRows.filter((el: IMappedItem) => newSelectedRows.some((id) => id === el.key)), 'key', 'expandLevel',
          ),
        );
        changeSelectedRows(newSelectedRows);
        return;
      }
      if (selectedRows[0] === key) {
        onSelect({});
        changeSelectedRows([]);
      } else {
        const selectedRow = {
          ...mappedRows
            .find((el: IMappedItem) => el.key === key),
        } as IMappedItem;
        delete selectedRow.key;
        delete selectedRow.expandLevel;
        onSelect(selectedRow);
        changeSelectedRows([key]);
      }
    },
    [isDisableSelect, isMultiSelect, selectedRows, onSelect, mappedRows],
  );

  const cell = ({
    columnIndex, key, parent, rowIndex, style,
  }: GridCellProps) => {
    const content = mappedRows[rowIndex][mappedColumns[columnIndex].field];
    const expandLevel = (!columnIndex && mappedRows[rowIndex].expandLevel) || 0;
    const column = mappedColumns[columnIndex];

    const handleExpand = () => {
      onChangeExpand(rowIndex, mappedRows[rowIndex].children);
    };

    const checkSelected = (): boolean => selectedRows
      .some((k: string) => k === mappedRows[rowIndex].key);

    return (
      <CellMeasurer
        cache={ cache.current }
        columnIndex={ columnIndex }
        key={ key }
        parent={ parent }
        rowIndex={ rowIndex }
      >
        <BodyCell
          onClick={ (e: MouseEvent) => handleSelect(e, mappedRows[rowIndex].key) }
          key={ key }
          selected={ checkSelected() }
          style={ {
            ...style,
            width: column.width,
          } }
          firstRow={ rowIndex === 0 }
          even={ !!(rowIndex % 2) }
          theme={ themeRef.current }
        >
          <BodyCellOffset expandLevel={ expandLevel } theme={ themeRef.current } />
          { column.isExpandable && mappedRows[rowIndex].children ? (
            <ExpandButtonWrapper onClick={ handleExpand }>
              { mappedRows[rowIndex].isExpand
                ? <RemoveIcon />
                : <AddIcon /> }
            </ExpandButtonWrapper>
          ) : null }

          <BodyCellContent
            theme={ themeRef.current }
            expandLevel={ expandLevel }
            center={ !!column.center }
          >
            <span>{ content }</span>
          </BodyCellContent>
        </BodyCell>
      </CellMeasurer>
    );
  };

  const handleChangeWidth = useCallback(
    (index, newWidth) => {
      const newColumns = setIn(mappedColumns, newWidth, [index, 'width']);
      changeMappedColumns(newColumns);
      fullWidth.current = newColumns.reduce(
        (acc: number, { width: colWidth }: IMappedItem) => (+acc + +colWidth),
        0,
      );
      onChangeColumns(newColumns);
    },
    [mappedColumns, onChangeColumns],
  );


  const handleChangeMoving = useCallback(
    (newColumns) => {
      changeMappedColumns(newColumns);
      onChangeColumns(newColumns);
    },
    [onChangeColumns],
  );

  useEffect(() => {
    if (gridRef.current) gridRef?.current?.recomputeGridSize();
    if (cache.current) cache.current.clearAll();
  }, [mappedColumns, mappedRows]);

  const {
    header: { height: headerHeight = 0 },
    totals: { height: totalsHeight = 0 },
  } = themeRef.current;

  return (
    <Wrapper theme={ themeRef.current } width={ width } changingColumns={ changingColumns }>
      <HeaderWrapper
        fullWidth={ fullWidth.current }
        columns={ mappedColumns }
        translateX={ scrollLeft }
        onChangeWidth={ handleChangeWidth }
        onChangeMoving={ handleChangeMoving }
        changeChangingColumns={ changeChangingColumns }
        theme={ themeRef.current }
        shouldMovingColumns={ shouldMovingColumns }
        shouldChangeColumnsWidth={ shouldChangeColumnsWidth }
      />
      <Body>
        <VirtualisedGrid
          ref={ gridRef as MutableRefObject<VirtualisedGrid> }
          columnCount={ mappedColumns.length }
          columnWidth={ ({ index }: any) => mappedColumns[index].width }
          deferredMeasurementCache={ cache.current }
          height={ height - +headerHeight - +totalsHeight }
          cellRenderer={ cell }
          rowCount={ mappedRows.length }
          rowHeight={ cache.current.rowHeight }
          width={ width - 2 }
          onScroll={ handleScroll }
        />
      </Body>
      { totals && (
        <TotalBlock
          width={ fullWidth.current }
          translateX={ scrollLeft }
          theme={ themeRef.current }
        >
          { mappedColumns.map((el: IColumn, index: number) => (
            <TotalCell
              theme={ themeRef.current }
              width={ mappedColumns.length === index + 1 ? el.width + 9 : el.width }
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
