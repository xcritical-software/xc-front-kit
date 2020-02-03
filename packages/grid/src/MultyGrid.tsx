import React from 'react';
import Grid from './Grid';


export const MultyGrid = ({
  width,
  height,
  theme,

  isDisableSelect,
  isMultiSelect,

  onSelect,
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
          width={ (width || wrapperSize.width) - leftFixedWidth - rightFixedWidth }
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
  </>
);
