import React, {
  useState, useRef, useEffect, useCallback, MutableRefObject,
} from 'react';
import {
  Grid,
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
import { guid, addOrDeleteItemFromArray } from './utils';

import { HeaderWrapper } from './HeaderWrapper';
import {
  IItem, IColumn, IGrig, IMappedItem,
} from './interfaces';


const App = ({
  items,
  columns,
  width,
  height,
  isDisableSelect = false,
  isMultiSelect = false,
  onChangeColumns = () => {},
  totals,
}: IGrig) => {
  const [mappedColumns, changeMappedColumns] = useState<IColumn[]>(columns);
  const [mappedRows, changeMappedRows] = useState<IMappedItem[]>(
    items.map((el: IItem): IMappedItem => ({ ...el, key: guid(), expandLevel: 0 })),
  );
  const [selectedRows, changeSelectedRows] = useState<string[]>([]);
  const fullWidth = useRef(
    mappedColumns.reduce((acc: number, { width }: IColumn) => (acc += width), 0),
  );
  const [scrollLeft, changeScrollLeft] = useState<number>(0);
  const [isSelectable, changeIsSelectable] = useState<boolean>(false);
  const gridRef = useRef<Grid>();
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    }),
  );

  useEffect(() => {
    fullWidth.current = columns.reduce((acc: number, { width }: IColumn) => (acc += width), 0);
    changeMappedColumns(columns);
  }, [columns]);

  useEffect(() => {
    changeMappedRows(items.map((el: IItem) => ({ ...el, key: guid(), expandLevel: 0 })));
  }, [items]);

  const handleScroll = (e: ScrollPosition) => {
    changeScrollLeft(-e.scrollLeft);
  };

  const onChangeExpand = useCallback(
    (index: number, childrens: IItem[]) => {
      if (mappedRows[index].isExpand) {
        let childrensLength = 0;
        for (let i = index + 1; i < mappedRows.length; i++) {
          if (mappedRows[i].expandLevel) childrensLength++;
          else break;
        }
        const newMappedRows = [
          ...mappedRows.slice(0, index + 1),
          ...mappedRows.slice(index + 1 + childrensLength),
        ];
        const withNewExpand = setIn(newMappedRows, false, [
          String(index),
          'isExpand',
        ]); /* поменять в setIn */
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
      if (isDisableSelect || e.target.tagName === 'BUTTON') return;
      if (isMultiSelect) {
        changeSelectedRows(addOrDeleteItemFromArray(selectedRows, key));
        return;
      }
      selectedRows[0] === key ? changeSelectedRows([]) : changeSelectedRows([key]);
    },
    [selectedRows, isDisableSelect, isMultiSelect],
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

    const checkSelected = (): void | string => {
      if (selectedRows.some((key: string) => key === mappedRows[rowIndex].key)) return 'lightblue';
    };

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
        >
          <BodyCellOffset expandLevel={ expandLevel } />
          { column.isExpandable && mappedRows[rowIndex].children ? (
            <ExpandButtonWrapper onClick={ handleExpand }>
              { mappedRows[rowIndex].isExpand
                ? /* <MinusBoxOutlineIcon size='16' /> */ '-'
                : /* <PlusBoxOutlineIcon size='16' /> */ '+' }
            </ExpandButtonWrapper>
          ) : null }

          <BodyCellContent expandLevel={ expandLevel } center={ !!column.center }>
            <span>{ content }</span>
          </BodyCellContent>
        </BodyCell>
      </CellMeasurer>
    );
  };

  const handleChangeWidth = useCallback(
    (index, width) => {
      const newColumns = setIn(mappedColumns, width, [index, 'width']);
      changeMappedColumns(newColumns);
      fullWidth.current = newColumns.reduce(
        (acc: number, { width }: IMappedItem) => (acc += width),
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

  return (
    <Wrapper width={ width } isSelectable={ isSelectable }>
      <HeaderWrapper
        fullWidth={ fullWidth.current }
        columns={ mappedColumns }
        translateX={ scrollLeft }
        onChangeWidth={ handleChangeWidth }
        onChangeMoving={ handleChangeMoving }
        changeIsSelectable={ changeIsSelectable }
      />
      <Body>
        <Grid
          ref={ gridRef as MutableRefObject<Grid> }
          columnCount={ mappedColumns.length }
          columnWidth={ ({ index }) => mappedColumns[index].width }
          deferredMeasurementCache={ cache.current }
          height={ height - 39 - 39 /* выоота headerа и высота тотала */ }
          cellRenderer={ cell }
          rowCount={ mappedRows.length }
          rowHeight={ cache.current.rowHeight }
          width={ width - 2 }
          onScroll={ handleScroll }
        />
      </Body>
      { totals && (
        <TotalBlock width={ fullWidth.current } translateX={ scrollLeft }>
          { mappedColumns.map((el: IColumn, index: number) => (
            <TotalCell width={ mappedColumns.length === index + 1 ? el.width + 9 : el.width }>
              <TotalCellContent center={ !!el.center }>
                <span>{ totals[el.field] }</span>
              </TotalCellContent>
            </TotalCell>
          )) }
        </TotalBlock>
      ) }
    </Wrapper>
  );
};

export default App;
