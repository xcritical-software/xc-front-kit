import React from 'react';
import Grid from './Grid';


export const MultyGrid = ({
  width,
  height,
  theme,
  totals,

  shouldMovingColumns,
  shouldChangeColumnsWidth,


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

  scrollTop,
  onScroll,
  cacheRef,

  setMappedColumns,
  mappedColumns,
  filteredColums,
  cellRenderer,


  leftMappedColumns,
  setLeftMappedColumns,
  rightMappedColumns,
  setRightMappedColumns,


  filteredColumsLeft,
  filteredColumsRight,

  cellRendererLeft,
  cellRendererRight,

}: any) => (
  <>
    { leftFixedColumns.length && (
      <Grid
        rightScroll={ false }
        bottomScroll={ false }
        height={ height }
        width={ leftFixedWidth }
        theme={ theme }
        totals={ totals }

        shouldMovingColumns={ false }
        shouldChangeColumnsWidth={ false }

        onChangeExpand={ onChangeExpand }
        handleSelect={ handleSelect }

        selectedRows={ selectedRows }
        mappedItems={ mappedItems }

        columns={ leftFixedColumns }

        scrollTop={ scrollTop }
        onScrollsyncScroll={ onScroll }
        cacheRef={ cacheRef }
        setMappedColumns={ setLeftMappedColumns }
        mappedColumns={ leftMappedColumns }
        filteredColums={ filteredColumsLeft }
        cellRenderer={ cellRendererLeft }
      />
    ) }
    {
      notFixedColumns.length && (
        <Grid
          rightScroll={ false }
          width={ (width || wrapperSize.width) - leftFixedWidth - rightFixedWidth }
          height={ height }
          theme={ theme }
          totals={ totals }

          shouldMovingColumns={ shouldMovingColumns }
          shouldChangeColumnsWidth={ shouldChangeColumnsWidth }

          onChangeExpand={ onChangeExpand }
          handleSelect={ handleSelect }

          selectedRows={ selectedRows }
          mappedItems={ mappedItems }

          columns={ notFixedColumns }

          onScrollsyncScroll={ onScroll }
          scrollTop={ scrollTop }
          cacheRef={ cacheRef }
          setMappedColumns={ setMappedColumns }
          mappedColumns={ mappedColumns }
          filteredColums={ filteredColums }
          cellRenderer={ cellRenderer }
        />
      )
    }
    { rightFixedColumns.length && (
      <Grid
        width={ rightFixedWidth }
        height={ height }
        theme={ theme }
        bottomScroll={ false }
        totals={ totals }

        shouldMovingColumns={ false }
        shouldChangeColumnsWidth={ false }

        onChangeExpand={ onChangeExpand }
        handleSelect={ handleSelect }

        selectedRows={ selectedRows }
        mappedItems={ mappedItems }

        columns={ rightFixedColumns }

        onScrollsyncScroll={ onScroll }
        scrollTop={ scrollTop }
        cacheRef={ cacheRef }
        mappedColumns={ rightMappedColumns }
        setMappedColumns={ setRightMappedColumns }
        filteredColums={ filteredColumsRight }
        cellRenderer={ cellRendererRight }
      />
    ) }
  </>
);
