/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { colors } from '@xcritical/theme';

import { Pagination, paginationThemeNamespace } from '../src';


const emptyTheme = {};

const theme = {
  [paginationThemeNamespace]: {
    wrapper: {
      padding: '20px',
      border: `1px solid ${colors.PURPLE}`,
      borderRadius: '5px',
    },
    buttonGroup: {
      borderRadius: '10px',
    },
    button: {
      borderColor: colors.ORCHID,
      selected: {
        borderColor: colors.ORCHID,
        color: `${colors.ORCHID} !important`,
      },
      active: {
        borderColor: colors.ORCHID,
        color: colors.ORCHID,
      },
    },
    select: {
      button: {
        borderRadius: '10px',
        borderColor: colors.ORCHID,
        hover: {
          borderColor: colors.ORCHID,
        },
      },
    },
  },
};

storiesOf('Pagination', module)
  .add('Default', () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    return (
      <ThemeProvider theme={ emptyTheme }>
        <Pagination
          total={ 200 }
          visibleRange={ 3 }
          pageSize={ pageSize }
          currentPage={ currentPage }
          onChangePage={ (newCurrentPage) => {
            setCurrentPage(newCurrentPage);
          } }
          onChangePageSize={ (newPage, newPageSize) => {
            setCurrentPage(newPage);
            setPageSize(newPageSize);
          } }
        />
      </ThemeProvider>
    );
  })
  .add('Without size changer', () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <ThemeProvider theme={ emptyTheme }>
        <Pagination
          total={ 150 }
          visibleRange={ 3 }
          currentPage={ currentPage }
          showSizeChanger={ false }
          onChangePage={ (newCurrentPage) => {
            setCurrentPage(newCurrentPage);
          } }
        />
      </ThemeProvider>
    );
  })
  .add('With custom page size options', () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    return (
      <ThemeProvider theme={ emptyTheme }>
        <Pagination
          total={ 70 }
          visibleRange={ 3 }
          currentPage={ currentPage }
          pageSize={ pageSize }
          pageSizeOptions={ [10, 20, 30] }
          onChangePage={ (newCurrentPage) => {
            setCurrentPage(newCurrentPage);
          } }
          onChangePageSize={ (newPage, newPageSize) => {
            setCurrentPage(newPage);
            setPageSize(newPageSize);
          } }
        />
      </ThemeProvider>
    );
  })
  .add('With visible range (5)', () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    return (
      <ThemeProvider theme={ emptyTheme }>
        <Pagination
          total={ 140 }
          visibleRange={ 5 }
          currentPage={ currentPage }
          pageSize={ pageSize }
          pageSizeOptions={ [10, 20, 30] }
          onChangePage={ (newCurrentPage) => {
            setCurrentPage(newCurrentPage);
          } }
          onChangePageSize={ (newPage, newPageSize) => {
            setCurrentPage(newPage);
            setPageSize(newPageSize);
          } }
        />
      </ThemeProvider>
    );
  })
  .add('Themed', () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    return (
      <ThemeProvider theme={ theme }>
        <Pagination
          total={ 150 }
          visibleRange={ 3 }
          currentPage={ currentPage }
          pageSize={ pageSize }
          pageSizeOptions={ [10, 20, 30] }
          onChangePage={ (newCurrentPage) => {
            setCurrentPage(newCurrentPage);
          } }
          onChangePageSize={ (newPage, newPageSize) => {
            setCurrentPage(newPage);
            setPageSize(newPageSize);
          } }
        />
      </ThemeProvider>
    );
  })
  .add('With custom select props', () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    return (
      <ThemeProvider theme={ emptyTheme }>
        <Pagination
          total={ 200 }
          pageSize={ pageSize }
          currentPage={ currentPage }
          onChangePage={ (newCurrentPage) => {
            setCurrentPage(newCurrentPage);
          } }
          onChangePageSize={ (newPage, newPageSize) => {
            setCurrentPage(newPage);
            setPageSize(newPageSize);
          } }
          selectProps={ {
            components: {
              IndicatorSeparator: null,
            },
          } }
        />
      </ThemeProvider>
    );
  })
  .add('With isDisabled', () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    return (
      <ThemeProvider theme={ emptyTheme }>
        <Pagination
          isDisabled
          total={ 200 }
          pageSize={ pageSize }
          currentPage={ currentPage }
          onChangePage={ (newCurrentPage) => {
            setCurrentPage(newCurrentPage);
          } }
          onChangePageSize={ (newPage, newPageSize) => {
            setCurrentPage(newPage);
            setPageSize(newPageSize);
          } }
        />
      </ThemeProvider>
    );
  })
  .add('With showTotalInfo', () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    return (
      <ThemeProvider theme={ emptyTheme }>
        <Pagination
          showTotalInfo
          total={ 200 }
          pageSize={ pageSize }
          currentPage={ currentPage }
          onChangePage={ (newCurrentPage) => {
            setCurrentPage(newCurrentPage);
          } }
          onChangePageSize={ (newPage, newPageSize) => {
            setCurrentPage(newPage);
            setPageSize(newPageSize);
          } }
        />
      </ThemeProvider>
    );
  });
