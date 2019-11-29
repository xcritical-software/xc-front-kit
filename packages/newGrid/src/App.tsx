import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import { Grid, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { setIn } from 'utilitify';
import {
  Body, BodyCell, BodyCellOffset, BodyCellContent, ExpandButtonWrapper, Wrapper, TotalBlock, TotalCellContent, TotalCell,
} from './styleds';
import { guid, addOrDeleteItemFromArray } from './utils';

// import PlusBoxOutlineIcon from 'mdi-react/PlusBoxOutlineIcon';
// import MinusBoxOutlineIcon from 'mdi-react/MinusBoxOutlineIcon';


import { HeaderWrapper } from './HeaderWrapper';


const App = ({
  items, columns, width, height, isDisableSelect = false, isMultiSelect = false, onChangeColumns = () => { }, totals,
}: any) => {
  const [mappedColumns, changeMappedColumns] = useState<any>(columns);
  const [mappedRows, changeMappedRows] = useState<any>(items.map((el: any) => ({ ...el, key: guid() })));
  const [selectedRows, changeSelectedRows] = useState<any>([]);
  const fullWidth = useRef(mappedColumns.reduce((acc: any, { width }: any) => (acc += width), 0));
  const [scrollLeft, changeScrollLeft] = useState(0);
  const [isSelectable, changeIsSelectable] = useState(false);
  const gridRef = useRef();
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    }),
  );

  useEffect(() => {
    fullWidth.current = columns.reduce((acc: any, { width }: any) => (acc += width), 0);
    changeMappedColumns(columns);
  }, [columns]);

  useEffect(() => {
    changeMappedRows(items.map((el: any) => ({ ...el, key: guid() })));
  }, [items]);


  const handleScroll = (e: any) => {
    changeScrollLeft(-e.scrollLeft);
  };


  const onChangeExpand = useCallback((index: any, childrens: any) => {
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
      const withNewExpand = setIn(newMappedRows, false, [index, 'isExpand']);
      changeMappedRows(withNewExpand);
    } else {
      const parentExpandLevel = mappedRows[index].expandLevel || 0;
      const newChildrens = childrens.map((el: any) => ({
        ...el,
        expandLevel: parentExpandLevel + 1,
        key: guid(),
      }));
      const newMappedRows = [
        ...mappedRows.slice(0, index + 1),
        ...newChildrens,
        ...mappedRows.slice(index + 1),
      ];
      const withNewExpand = setIn(newMappedRows, true, [index, 'isExpand']);
      changeMappedRows(withNewExpand);
    }
  }, [mappedRows]);

  const handleSelect = useCallback((e, key) => {
    if (isDisableSelect || e.target.tagName === 'BUTTON') return;
    if (isMultiSelect) {
      changeSelectedRows(addOrDeleteItemFromArray(selectedRows, key));
      return;
    }
    selectedRows[0] === key ? changeSelectedRows([]) : changeSelectedRows([key]);
  }, [selectedRows, isDisableSelect, isMultiSelect]);


  const cell = ({
    columnIndex, key, parent, rowIndex, style,
  }: any) => {
    const content = mappedRows[rowIndex][mappedColumns[columnIndex].field];
    const expandLevel = (!columnIndex && mappedRows[rowIndex].expandLevel) || 0;
    const column = mappedColumns[columnIndex];

    const handleExpand = () => {
      onChangeExpand(rowIndex, mappedRows[rowIndex].children);
    };

    const checkSelected = () => {
      if (selectedRows.some((key: any) => key === mappedRows[rowIndex].key)) return 'lightblue';
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
          onClick={ (e) => handleSelect(e, mappedRows[rowIndex].key) }
          key={ key }
          selected={ checkSelected() }
          style={ {
            ...style,
            width: column.width,
          } }
        >
          <BodyCellOffset
            expandLevel={ expandLevel }
          />
          { column.isExpandable && mappedRows[rowIndex].children ? (
            <ExpandButtonWrapper onClick={ handleExpand }>{ mappedRows[rowIndex].isExpand ? /* <MinusBoxOutlineIcon size='16' /> */ '+' : /* <PlusBoxOutlineIcon size='16' /> */ '-' }</ExpandButtonWrapper>
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
      fullWidth.current = newColumns.reduce((acc: any, { width }: any) => (acc += width), 0);
      onChangeColumns(newColumns);
    },
    [mappedColumns, onChangeColumns],
  );
  const handleChangeMoving = useCallback((newColumns) => {
    changeMappedColumns(newColumns);
    onChangeColumns(newColumns);
  }, [onChangeColumns]);

  useEffect(() => {
    // if (gridRef.current) gridRef?.current?.recomputeGridSize();
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
        visibleWidth={ width }
        changeIsSelectable={ changeIsSelectable }
      />
      <Body>
        <Grid
          ref={ gridRef as any }
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
      { totals
        && (
          <TotalBlock
            width={ fullWidth.current }
            translateX={ scrollLeft }
          >
            { mappedColumns.map((el: any, index: any) => (
              <TotalCell width={ mappedColumns.length === index + 1 ? el.width + 9 : el.width }>
                <TotalCellContent
                  center={ el.center }
                >
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
