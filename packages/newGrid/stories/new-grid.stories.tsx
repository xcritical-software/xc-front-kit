/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { darken, lighten } from 'polished';

import Grid from '../src/Grid';
import { IColumn } from '../src/interfaces';
import './style.css';
import {
  columns, totals, rowsWithChildren, rows,
} from './data';
import * as countries from './countries';
import { gridThemeNamespace } from '../src/theme';


const generateTheme = (color: string) => {
  const theme = {
    [gridThemeNamespace]: {
      evenRowBackground: lighten(0.4, color),
      selectedRowColor: lighten(0.1, color),
      borderRadius: '15px',
      emptyHeaderCellBackgroung: lighten(0.4, color),
      movingHeaderCellBackgroung: lighten(0.1, color),
      header: {
        color: darken(0.4, color),
        backgroundColor: lighten(0.3, color),
        height: '50px',
      },
      row: {
        color: darken(0.4, color),
        backgroundColor: lighten(0.6, color),
      },
      totals: {
        color: darken(0.4, color),
        backgroundColor: lighten(0.1, color),
        height: '40px',
      },
    },
  };
  return theme;
};


storiesOf('New Grid', module)
  .add('Basic', () => {
    const [shouldMovingColumns, changeShouldMovingColumns] = useState(true);
    const [shouldChangeColumnsWidth, changeShouldChangeColumnsWidth] = useState(true);
    return (
      <>
        <label style={ { padding: '10px', fontSize: '20px', display: 'inline-block' } }>
            Should moving columns
          <input style={ { marginLeft: '30px' } } type="checkbox" checked={ shouldMovingColumns } onChange={ (e) => changeShouldMovingColumns(e.target.checked) } />
        </label>
        <label style={ { padding: '10px', fontSize: '20px', display: 'inline-block' } }>
            Should change columns width
          <input style={ { marginLeft: '30px' } } type="checkbox" checked={ shouldChangeColumnsWidth } onChange={ (e) => changeShouldChangeColumnsWidth(e.target.checked) } />
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
          <input style={ { marginLeft: '30px' } } type="checkbox" onChange={ (e) => changeIsMultySelect(e.target.checked) } />
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
      totals={ totals }
      width={ document.documentElement.clientWidth - 100 }
      height={ document.documentElement.clientHeight - 100 }
    />
  ))
  .add('Themed and multi select', () => {
    const [color, changeColor] = useState('#023fa1');
    return (
      <>
        <input type="color" onChange={ (e) => changeColor(e.target.value) } />
        <Grid
          columns={ countries.columns }
          items={ countries.items }
          totals={ totals }
          width={ document.documentElement.clientWidth - 100 }
          height={ document.documentElement.clientHeight - 100 }
          theme={ generateTheme(color) }
          isMultiSelect
        />
      </>
    );
  });
