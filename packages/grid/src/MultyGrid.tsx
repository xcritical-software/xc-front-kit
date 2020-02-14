import React from 'react';
import Grid from './Grid';


export const MultyGrid = ({
  width,
  height,

  shouldMovingColumns,
  shouldChangeColumnsWidth,
  shouldChangeLeftColumnsWidth,
  shouldChangeRightColumnsWidth,


  leftFixedColumns,
  leftFixedWidth,

  rightFixedColumns,
  rightFixedWidth,

  wrapperSize,
  notFixedColumns,

  scrollTop,
  onScroll,
  allGridsProps,
}: any) => (
  <>
    { leftFixedColumns.length && (
      <Grid
        rightScroll={ false }
        bottomScroll={ false }
        height={ height }
        width={ leftFixedWidth }

        shouldMovingColumns={ false }
        shouldChangeColumnsWidth={ shouldChangeLeftColumnsWidth }


        columns={ leftFixedColumns }

        scrollTop={ scrollTop }
        onScrollsyncScroll={ onScroll }

        { ...allGridsProps }

      />
    ) }
    { console.log(allGridsProps) }
    {
      notFixedColumns.length && (
        <Grid
          rightScroll={ false }
          width={ (width || wrapperSize.width) - leftFixedWidth - rightFixedWidth }
          height={ height }
          shouldMovingColumns={ shouldMovingColumns }
          shouldChangeColumnsWidth={ shouldChangeColumnsWidth }


          columns={ notFixedColumns }

          onScrollsyncScroll={ onScroll }
          scrollTop={ scrollTop }

          { ...allGridsProps }

        />
      )
    }
    { rightFixedColumns.length && (
      <Grid
        width={ rightFixedWidth }
        height={ height }
        bottomScroll={ false }
        shouldMovingColumns={ false }
        shouldChangeColumnsWidth={ shouldChangeRightColumnsWidth }


        columns={ rightFixedColumns }

        onScrollsyncScroll={ onScroll }
        scrollTop={ scrollTop }
        { ...allGridsProps }

      />
    ) }
  </>
);
