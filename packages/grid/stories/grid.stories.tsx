/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { darken, lighten } from 'polished';

import { colors } from '@xcritical/theme';
import { setIn } from 'utilitify';
import Grid from '../src/Grid';
import { IColumn } from '../src/interfaces';
import {
  columns, totals, rowsWithChildren, rows,
} from './data';
import * as countries from './countries';
import { gridThemeNamespace } from '../src/theme';


const generateTheme = (color: string) => {
  const theme = {
    [gridThemeNamespace]: {
      evenRowBackground: lighten(0.4, color),
      selectedRowBackgroundColor: lighten(0.1, color),
      borderRadius: 15,
      emptyHeaderCellBackground: lighten(0.4, color),
      movingHeaderCellBackgroungColor: lighten(0.1, color),
      header: {
        color: darken(0.4, color),
        backgroundColor: lighten(0.3, color),
        height: 50,
      },
      row: {
        color: darken(0.4, color),
        backgroundColor: lighten(0.6, color),
      },
      totals: {
        color: darken(0.4, color),
        backgroundColor: lighten(0.1, color),
        height: 40,
      },
    },
  };
  return theme;
};

const AMStheme = {
  [gridThemeNamespace]: {
    evenRowBackground: colors.GRAY_LIGHT,
    selectedRowBackgroundColor: colors.BLACK_RAISIN,
    offsetExpand: 20,
    border: 'none',
    borderRadius: 0,
    headerCellBorder: `1px solid ${colors.GRAY}`,
    totalsCellBorder: 'none',
    rowCellBorder: 'none',
    header: {
      border: 'none',
      fontSize: '14px',
      color: 'black',
      backgroundColor: 'white',
      height: 35,
      padding: '10px',
    },
    row: {
      border: `1px solid ${colors.GRAY}`,
      padding: '10px',
      fontSize: '13px',
    },
  },
};

storiesOf('New Grid', module)
  .add('Basic', () => {
    const [shouldMovingColumns, changeShouldMovingColumns] = useState(true);
    const [shouldChangeColumnsWidth, changeShouldChangeColumnsWidth] = useState(true);
    return (
      <>
        <label style={ { padding: '10px', fontSize: '20px', display: 'inline-block' } }>
          Should moving columns
          <input
            style={ { marginLeft: '30px' } }
            type="checkbox"
            checked={ shouldMovingColumns }
            onChange={ (e) => changeShouldMovingColumns(e.target.checked) }
          />
        </label>
        <label style={ { padding: '10px', fontSize: '20px', display: 'inline-block' } }>
          Should change columns width
          <input
            style={ { marginLeft: '30px' } }
            type="checkbox"
            checked={ shouldChangeColumnsWidth }
            onChange={ (e) => changeShouldChangeColumnsWidth(e.target.checked) }
          />
        </label>
        <Grid
          columns={ columns }
          items={ rows }
          totals={ totals }
          width={ document.documentElement.clientWidth - 100 }
          height={ document.documentElement.clientHeight - 100 }
          shouldMovingColumns={ shouldMovingColumns }
          shouldChangeColumnsWidth={ shouldChangeColumnsWidth }
        />
      </>
    );
  })
  .add('With childrens', () => (
    <Grid
      columns={ columns }
      items={ rowsWithChildren }
      totals={ totals }
      width={ document.documentElement.clientWidth - 100 }
      height={ document.documentElement.clientHeight - 100 }
    />
  ))
  .add('Handler change and select columns (see consol)', () => {
    const [isMultiSelect, changeIsMultySelect] = useState(false);
    return (
      <>
        <label style={ { padding: '10px', fontSize: '20px', display: 'inline-block' } }>
          Is multi select
          <input
            style={ { marginLeft: '30px' } }
            type="checkbox"
            onChange={ (e) => changeIsMultySelect(e.target.checked) }
          />
        </label>
        <Grid
          columns={ columns }
          items={ rowsWithChildren }
          totals={ totals }
          width={ document.documentElement.clientWidth - 100 }
          height={ document.documentElement.clientHeight - 100 }
          onChangeColumns={ (cols: IColumn) => console.log(cols) }
          onSelect={ (cols: any) => console.log(cols) }
          isMultiSelect={ isMultiSelect }
        />
      </>
    );
  })
  .add('Group', () => (
    <Grid
      columns={ countries.columns }
      items={ countries.items }
      width={ document.documentElement.clientWidth - 100 }
      height={ document.documentElement.clientHeight - 100 }
    />
  ))
  .add('Themed and multi select', () => {
    const [color, changeColor] = useState('#023fa1');
    return (
      <>
        <input type="color" value={ color } onChange={ (e) => changeColor(e.target.value) } />
        <Grid
          columns={ countries.columns }
          items={ countries.items }
          width={ document.documentElement.clientWidth - 100 }
          height={ document.documentElement.clientHeight - 100 }
          theme={ generateTheme(color) }
          isMultiSelect
        />
      </>
    );
  })
  .add('AMS theme', () => (
    <Grid
      columns={ columns.map((el) => ({ ...el, center: true })) }
      items={ rows }
      width={ document.documentElement.clientWidth - 100 }
      height={ document.documentElement.clientHeight - 100 }
      theme={ AMStheme }
    />
  ))
  .add('Selector columns', () => {
    const [mappedColumns, setMappedColumns] = useState(columns);

    const handleChangeVisibleColumns = useCallback((i) => {
      const newVisible = !mappedColumns[i].visible;
      const newColumn = {
        ...mappedColumns[i],
        visible: newVisible,
        width: newVisible ? columns.find(({ field }: any) => field === mappedColumns[i].field)?.width : 0,
      };
      const newColumns = setIn(mappedColumns, newColumn, [String(i)]);

      setMappedColumns(newColumns);
    }, [mappedColumns]);

    // const handleChangeVisibleColumns = useCallback(i => {
    //       const newVisible = !mappedColumns[i].visible;
    //       const newColumn = {
    //         ...mappedColumns[i],
    //         visible: newVisible,
    //         width: newVisible ? columns.find(({ field }: any) => field === mappedColumns[i].field)?.width : 0
    //       }
    //       const newColumns = setIn(mappedColumns, newColumn, [String(i)])

    //       setMappedColumns(newColumns);
    //     }, [mappedColumns])

    return (
      <>
        <div style={ { width: '120px', border: '1px solid black', backgroundColor: 'white' } }>
          {
            mappedColumns.map((col, i) => (
              <div>
                <label htmlFor={ col.field }>

                  { col.headerName }

                </label>
                <input type="checkbox" checked={ col.visible } onChange={ () => handleChangeVisibleColumns(i) } />
              </div>
            ))
          }
        </div>
        <Grid
          columns={ mappedColumns.map((el) => ({ ...el, center: true })) }
          items={ rows }
          width={ document.documentElement.clientWidth - 20 }
          height={ document.documentElement.clientHeight - 20 }
          theme={ AMStheme }
          onChangeColumns={ setMappedColumns }
        />
      </>
    );
  });
