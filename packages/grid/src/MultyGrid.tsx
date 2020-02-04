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
      />
    ) }
  </>
);
