import React from 'react';
import InternalGrid from './InternalGrid';
import { IMultiGrid } from './interfaces';
import { gridPositions } from './consts';


export const MultiGrid: React.FC<IMultiGrid> = ({
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

  scrollTop,
  onScroll,

  isScrollingOptOut,
  overscanColumnCount,
  overscanRowCount,


  allGridsProps,
}: IMultiGrid) => (
  <>
    { leftMappedColumns.length ? (
      <InternalGrid
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
        gridPosition={ gridPositions.LEFT }
        shiftFirstColumn
        { ...allGridsProps }
      />
    ) : null }
    {
      centerMappedColumns.length ? (
        <InternalGrid
          rightScroll={ !rightMappedColumns.length }
          width={ width - leftFixedWidth - rightFixedWidth }
          height={ height }
          shouldMovingColumns={ shouldMovingColumns }
          shouldChangeColumnsWidth={ shouldChangeColumnsWidth }

          onScrollsyncScroll={ onScroll }
          scrollTop={ scrollTop }

          gridHOCMappedColumns={ centerMappedColumns }
          setGridHOCMappedColumns={ setCenterMappedColumns }
          gridPosition={ gridPositions.CENTER }
          isScrollingOptOut={ isScrollingOptOut }
          overscanColumnCount={ overscanColumnCount }
          overscanRowCount={ overscanRowCount }
          shiftFirstColumn={ !leftMappedColumns.length }
          { ...allGridsProps }
        />
      ) : null
    }
    { rightMappedColumns.length ? (
      <InternalGrid
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
        gridPosition={ gridPositions.RIGHT }
        shiftFirstColumn={ !leftMappedColumns.length && !centerMappedColumns.length }
        { ...allGridsProps }
      />
    ) : null }
  </>
);
