/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { darken, lighten } from 'polished';
import { Provider } from 'react-redux';

import { setIn } from 'utilitify';

import { colors } from '@xcritical/theme';

import Grid from '../src';
import { IColumn, IItem } from '../src/interfaces';

import { gridThemeNamespace } from '../src/theme';
import Sidebar from '../../sidebar/src';
import { CompactFilterContainer } from '../../filter/stories/pages';
import { store } from '../../filter/stories/filter.stories';

import * as countries from './countries';
import {
  columns,
  totals,
  rowsWithChildren,
  rows,
  columnsWithRender,
  createRowsWithRender,
  columnsFixed,
  rowsFixed,
  totalsFixed,
  CustomReactHeaderName,
  addNewRow,
} from './data';
import {
  Page,
  Content,
  GridWrapper,
  SomeBlock,
  SelectorColumnsWrapper,
} from './styled';
import './reset.css';


const list: any = (n: number) => (
  <div>
    <ul style={ { listStyleType: 'none' } }>
      { new Array(n).fill(true).map((_el, i) => `This is list item number ${i}`).map((el) => (
        <li
          key={ el }
          style={ { padding: '10px 10px 10px 10px' } }
        >
          { el }
        </li>
      )) }
    </ul>
  </div>
);

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
      padding: '20px',
    },
    row: {
      border: `1px solid ${colors.GRAY}`,
      padding: '5px 10px',
      fontSize: '13px',
    },
  },
};

storiesOf('Grid', module)
  .add('Basic', () => {
    const [shouldMovingColumns, changeShouldMovingColumns] = useState(true);
    const [shouldChangeColumnsWidth, changeShouldChangeColumnsWidth] = useState(true);
    const [shouldFitLastColumn, changeShouldFitLastColumn] = useState(true);

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
        <label style={ { padding: '10px', fontSize: '20px', display: 'inline-block' } }>
          Should fit last column
          <input
            style={ { marginLeft: '30px' } }
            type="checkbox"
            checked={ shouldFitLastColumn }
            onChange={ (e) => changeShouldFitLastColumn(e.target.checked) }
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
          shouldFitLastColumn={ shouldFitLastColumn }
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
  .add('With childrens and with saved expanded level', () => {
    const [gridItems, setGridItems] = useState<IItem[]>(rowsWithChildren);
    const handleAddNewRow = (): void => {
      setGridItems(addNewRow(gridItems));
    };

    return (
      <>
        <Grid
          columns={ columns }
          items={ gridItems }
          totals={ totals }
          width={ document.documentElement.clientWidth - 100 }
          height={ document.documentElement.clientHeight - 100 }
        />
        <button type="button" onClick={ handleAddNewRow } style={ { margin: '15px 10px' } }>
          Add new row
        </button>
      </>
    );
  })
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
      rowHeight={ 40 }
    />
  ))
  .add('Dinamic size', () => {
    const [someBlockHeight, setSomeBlockHeight] = useState(100);

    const handleChangeHeight = ({ target: { value } }) => {
      if (value < 300) setSomeBlockHeight(value);
      else setSomeBlockHeight(300);
    };

    return (
      <Provider store={ store }>
        <Page>
          <Sidebar>{ list(100) }</Sidebar>
          <Content>
            <div>
              <CompactFilterContainer />
            </div>
            <GridWrapper>
              <Grid
                columns={ columns.map((el) => ({ ...el, center: true })) }
                items={ rows }
                theme={ AMStheme }
                shouldFitContainer
              />
            </GridWrapper>
            <input placeholder="some block height (max 300)" value={ someBlockHeight } onChange={ handleChangeHeight } />
            <SomeBlock height={ someBlockHeight }> max height =  300px  </SomeBlock>
          </Content>
        </Page>
      </Provider>
    );
  })
  .add('Selector columns', () => {
    const [mappedColumns, setMappedColumns] = useState<IColumn[]>(columns);

    const handleChangeVisibleColumns = useCallback((i) => {
      const newColumns = setIn(mappedColumns, !mappedColumns[i].visible, [String(i), 'visible']);
      console.log(newColumns);
      setMappedColumns(newColumns);
    }, [mappedColumns]);

    const handleChangeColumns = (newColumns: IColumn[]) => {
      setMappedColumns(newColumns);
      console.log(newColumns);
    };

    return (
      <>
        <div>
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
          height={ document.documentElement.clientHeight - 350 }
          theme={ AMStheme }
          totals={ totals }
          onChangeColumns={ handleChangeColumns }
        />
      </>
    );
  })
  .add('Render cell function', () => (
    <Grid
      columns={ columnsWithRender }
      items={ createRowsWithRender() }
      width={ document.documentElement.clientWidth - 100 }
      height={ document.documentElement.clientHeight - 100 }
      rowHeight={ 30 }
    />
  ))
  .add('fixed columns (left+right)', () => (
    <Grid
      columns={ columnsFixed('both').map((el) => ({ ...el, sortable: true })) }
      items={ rowsFixed }
      width={ document.documentElement.clientWidth - 100 }
      height={ document.documentElement.clientHeight - 100 }
      rowHeight={ 30 }
      theme={ AMStheme }
      onSortChanged={ (cols) => console.table(cols) }
    />
  ))
  .add('fixed columns (left)', () => (
    <Grid
      columns={ columnsFixed('left') }
      items={ rowsFixed }
      width={ document.documentElement.clientWidth - 100 }
      height={ document.documentElement.clientHeight - 100 }
      rowHeight={ 30 }
      theme={ AMStheme }
    />
  ))
  .add('Fixed columns + Dinamic size', () => {
    const [someBlockHeight, setSomeBlockHeight] = useState(100);

    const handleChangeHeight = ({ target: { value } }) => {
      if (value < 300) setSomeBlockHeight(value);
      else setSomeBlockHeight(300);
    };

    return (
      <Provider store={ store }>
        <Page>
          <Sidebar maxWidth={ 300 }>{ list(100) }</Sidebar>
          <Content>
            <div>
              <CompactFilterContainer />
            </div>
            <GridWrapper>
              <Grid
                columns={ columnsFixed('both') }
                items={ rowsFixed }
                totals={ totalsFixed }
                theme={ AMStheme }
                rowHeight={ 30 }
                shouldFitContainer
              />
            </GridWrapper>
            <input placeholder="some block height (max 300)" value={ someBlockHeight } onChange={ handleChangeHeight } />
            <SomeBlock height={ someBlockHeight }> max height =  300px  </SomeBlock>
          </Content>
        </Page>
      </Provider>
    );
  })
  .add('Selector columns + fixeds', () => {
    const [mappedColumns, setMappedColumns] = useState(columnsFixed('both'));

    const handleChangeVisibleColumns = useCallback((i) => {
      const newColumns = setIn(mappedColumns, !mappedColumns[i].visible, [String(i), 'visible']);
      console.log(newColumns);
      setMappedColumns(newColumns);
    }, [mappedColumns]);

    const handleChangeColumns = (newColumns) => {
      setMappedColumns(newColumns);
      console.log(newColumns);
    };

    return (
      <>
        <SelectorColumnsWrapper>
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
        </SelectorColumnsWrapper>
        <Grid
          columns={ mappedColumns }
          items={ rowsFixed }
          width={ document.documentElement.clientWidth - 100 }
          height={ document.documentElement.clientHeight - 100 }
          rowHeight={ 30 }
          theme={ AMStheme }
          onChangeColumns={ handleChangeColumns }
        />
      </>
    );
  })
  .add('Sortable', () => (
    <Grid
      columns={ columns.map((el) => ({
        ...el,
        sortable: true,
      })) }
      items={ rows }
      totals={ totals }
      width={ document.documentElement.clientWidth - 100 }
      height={ document.documentElement.clientHeight - 100 }
      onSortChanged={ (cols) => console.table(cols) }
    />
  ))
  .add('Header cell - ReactElement', () => (
    <Grid
      columns={ columns.map((el) => ({
        ...el,
        headerName: <CustomReactHeaderName text={ el.headerName } />,
      })) }
      items={ rows }
      totals={ totals }
      width={ document.documentElement.clientWidth - 100 }
      height={ document.documentElement.clientHeight - 100 }
      onSortChanged={ (cols) => console.table(cols) }
    />
  ))
  .add('Dinamic size + toggler should fit last column', () => {
    const [shouldFitLastColumn, changeShouldFitLastColumn] = useState(true);
    const [columnsCount, setColumnsCount] = useState(3);

    return (
      <Provider store={ store }>
        <Page>
          <Sidebar>
            <label style={ { padding: '10px', fontSize: '20px', display: 'inline-block' } }>
              Should fit last column
              <input
                style={ { marginLeft: '30px' } }
                type="checkbox"
                checked={ shouldFitLastColumn }
                onChange={ (e) => changeShouldFitLastColumn(e.target.checked) }
              />
            </label>
            <label style={ { padding: '10px', fontSize: '20px', display: 'inline-block' } }>
              Columns count
              <input
                style={ { marginLeft: '30px' } }
                value={ columnsCount }
                onChange={ (e) => setColumnsCount(Number(e.target.value)) }
              />
            </label>
            { list(100) }
          </Sidebar>
          <Content>
            <GridWrapper>
              <Grid
                columns={ columnsFixed('both').slice(0, columnsCount || 1) }
                items={ rowsFixed }
                rowHeight={ 40 }
                theme={ AMStheme }
                shouldFitContainer
                shouldFitLastColumn={ shouldFitLastColumn }
              />
            </GridWrapper>
          </Content>
        </Page>
      </Provider>
    );
  })
  .add('Min Column Width', () => (
    <Grid
      columns={ columns }
      items={ rows }
      totals={ totals }
      width={ document.documentElement.clientWidth - 100 }
      height={ document.documentElement.clientHeight - 100 }
      minColumnWidth={ 60 }
    />
  ));
