import React from 'react';
import Grid from './Grid';
import { IMultyGrid } from './interfaces';


export const MultyGrid = ({
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
}: IMultyGrid) => (
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

        { ...allGridsProps }

      />
    ) : null }
    {
      centerMappedColumns.length ? (
        <Grid
          rightScroll={ false }
          width={ (width || wrapperSize.width) - leftFixedWidth - rightFixedWidth }
          height={ height }
          shouldMovingColumns={ shouldMovingColumns }
          shouldChangeColumnsWidth={ shouldChangeColumnsWidth }

          onScrollsyncScroll={ onScroll }
          scrollTop={ scrollTop }

          gridHOCMappedColumns={ centerMappedColumns }
          setGridHOCMappedColumns={ setCenterMappedColumns }

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

        { ...allGridsProps }

      />
    ) : null }
  </>
);
