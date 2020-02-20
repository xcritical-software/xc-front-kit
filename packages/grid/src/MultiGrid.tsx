import React from 'react';
import Grid from './Grid';
import { IMultiGrid } from './interfaces';


export const MultiGrid = ({
  width,
  height,

  shouldMovingColumns,
  shouldChangeColumnsWidth,
  shouldChangeLeftColumnsWidth,
  shouldChangeRightColumnsWidth,


  leftMappedColumns,
  centerMappedColumns,
  rightMappedColumns,

  setLeftMappedColumns,
  setCenterMappedColumns,
  setRightMappedColumns,


  leftFixedWidth,
  rightFixedWidth,
  wrapperSize,

  scrollTop,
  onScroll,
  allGridsProps,
}: IMultiGrid) => (
  <>
    { leftMappedColumns.length ? (
      <Grid
        rightScroll={ false }
        bottomScroll={ false }
        height={ height }
        width={ leftFixedWidth }

        shouldMovingColumns={ false }
        shouldChangeColumnsWidth={ shouldChangeLeftColumnsWidth }

        scrollTop={ scrollTop }
        onScrollsyncScroll={ onScroll }

        gridHOCMappedColumns={ leftMappedColumns }
        setGridHOCMappedColumns={ setLeftMappedColumns }

        resizeGridAfterResizeLastColumn
        gridPosition="left"

        { ...allGridsProps }
      />
    ) : null }
    {
      centerMappedColumns.length ? (
        <Grid
          rightScroll={ !rightMappedColumns.length }
          width={ (width || wrapperSize.width) - leftFixedWidth - rightFixedWidth }
          height={ height }
          shouldMovingColumns={ shouldMovingColumns }
          shouldChangeColumnsWidth={ shouldChangeColumnsWidth }

          onScrollsyncScroll={ onScroll }
          scrollTop={ scrollTop }

          gridHOCMappedColumns={ centerMappedColumns }
          setGridHOCMappedColumns={ setCenterMappedColumns }
          gridPosition="center"
          overscanColumnCount={4}
          isScrollingOptOut={true}
          { ...allGridsProps }
        />
      ) : null
    }
    { rightMappedColumns.length ? (
      <Grid
        width={ rightFixedWidth }
        height={ height }
        bottomScroll={ false }
        shouldMovingColumns={ false }
        shouldChangeColumnsWidth={ shouldChangeRightColumnsWidth }

        onScrollsyncScroll={ onScroll }
        scrollTop={ scrollTop }
        gridHOCMappedColumns={ rightMappedColumns }
        setGridHOCMappedColumns={ setRightMappedColumns }
        resizeGridAfterResizeLastColumn
        gridPosition="right"

        { ...allGridsProps }
      />
    ) : null }
  </>
);
