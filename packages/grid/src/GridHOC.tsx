import React, {
  useState, useEffect, useRef, useCallback, useMemo,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { setIn } from 'utilitify';

import { ScrollSync } from 'react-virtualized';
import { CSSProperties } from 'styled-components';
import Grid from './Grid';
import {
  IMappedItem, IItem, IGridHOC,
} from './interfaces';
import { guid, addOrDeleteItemFromArray, deletePropsFromObjects } from './utils';


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

  const isMultiGrid = useMemo(() => rest.columns
    .some(({ fixedPosition }: any) => !!fixedPosition), [rest.columns]);

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


  if (isMultiGrid) {
    const {
      width: $width, height, theme,
    } = rest;


    const styles: CSSProperties = {
      display: 'flex',
      width: `${$width || wrapperSize.width}px`,
    };
    if (shouldFitContainer) {
      styles.height = '100%';
    }

    return (

      <ScrollSync>
        { ({
          onScroll,
          scrollTop,
        }) => (
          <div style={ styles }>
            { leftFixedColumns.length && (
              <Grid
                isDisableSelect={ isDisableSelect }
                isMultiSelect={ isMultiSelect }
                onSelect={ onSelect }
                selectedRows={ selectedRows }
                onChangeExpand={ onChangeExpand }
                mappedItems={ mappedItems }
                columns={ leftFixedColumns }
                width={ leftFixedWidth }
                height={ height }
                shouldMovingColumns={ false }
                shouldChangeColumnsWidth={ false }
                theme={ theme }
                scrollTop={ scrollTop }
                onScrollsyncScroll={ onScroll }
                rightScroll={ false }
                bottomScroll={ false }
                handleSelect={ handleSelect }
              />
            ) }

            {
              notFixedColumns.length && (
                <Grid
                  isDisableSelect={ isDisableSelect }
                  isMultiSelect={ isMultiSelect }
                  onSelect={ onSelect }
                  selectedRows={ selectedRows }
                  onChangeExpand={ onChangeExpand }
                  mappedItems={ mappedItems }
                  scrollTop={ scrollTop }
                  columns={ notFixedColumns }
                  width={ ($width || wrapperSize.width) - leftFixedWidth - rightFixedWidth }
                  height={ height }
                  theme={ theme }
                  onScrollsyncScroll={ onScroll }
                  rightScroll={ false }
                  handleSelect={ handleSelect }
                />
              )
            }
            { rightFixedColumns.length && (
              <Grid
                isDisableSelect={ isDisableSelect }
                isMultiSelect={ isMultiSelect }
                onSelect={ onSelect }
                selectedRows={ selectedRows }
                onChangeExpand={ onChangeExpand }
                mappedItems={ mappedItems }
                columns={ rightFixedColumns }
                width={ rightFixedWidth }
                height={ height }
                shouldMovingColumns={ false }
                shouldChangeColumnsWidth={ false }
                theme={ theme }
                scrollTop={ scrollTop }
                onScrollsyncScroll={ onScroll }
                bottomScroll={ false }
                handleSelect={ handleSelect }
              />
            ) }
          </div>
        ) }
      </ScrollSync>
    );
  }


  if (shouldFitContainer) {
    return (
      <div ref={ wrapperRef } style={ { height: '100%' } }>
        <Grid
          isDisableSelect={ isDisableSelect }
          handleSelect={ handleSelect }
          isMultiSelect={ isMultiSelect }
          onSelect={ onSelect }
          selectedRows={ selectedRows }
          onChangeExpand={ onChangeExpand }
          { ...rest }
          mappedItems={ mappedItems }
          width={ wrapperSize.width }
          height={ wrapperSize.height }
        />
      </div>
    );
  }


  return (
    <Grid
      isDisableSelect={ isDisableSelect }
      handleSelect={ handleSelect }
      isMultiSelect={ isMultiSelect }
      onSelect={ onSelect }
      selectedRows={ selectedRows }
      onChangeExpand={ onChangeExpand }
      { ...rest }
      mappedItems={ mappedItems }
    />
  );
};


export default GridHOC;
