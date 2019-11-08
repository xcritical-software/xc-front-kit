/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */

import { storiesOf } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { ThemeProvider } from 'styled-components';
import { IThemeNamespace } from '@xcritical/theme';
import { buttonThemeNamespace } from '@xcritical/button';
import { darken, lighten } from 'polished';
import {
  PageOneContainer,
  PageTwoContainer,
  PageThreeContainer,
} from './pages';

import { filters, xcriticalFiltersInit, xcriticalFiltersAdd } from '../src';
import { config } from './configReducer';
import { data } from './dummyData';
import { getConfigSuccess } from './actions';
import { filterThemeNamespace } from '../src/theme';


const store = createStore(
  combineReducers({ filters, config }),
  devToolsEnhancer({}),
);
setTimeout(() => store.dispatch(getConfigSuccess(data)), 10);

const threeFilters = [
  {
    column: 'aaid',
    condition: 'startsWith',
    value: '15',
  },
  {
    column: 'acid',
    condition: 'endsWith',
    value: '20',
  },
];
const threeFiltersAdd = [
  {
    column: 'aaid',
    condition: 'startsWith',
    value: '150',
  },
  {
    column: 'acid',
    condition: 'endsWith',
    value: '200',
  },
];

setTimeout(
  () => store.dispatch(xcriticalFiltersInit('three', threeFilters)),
  500,
);
setTimeout(
  () => store.dispatch(xcriticalFiltersAdd('three', threeFiltersAdd)),
  1000,
);


/* eslint no-unused-vars: "error" */
const themeOne: IThemeNamespace = {
  [filterThemeNamespace]: {
    topPanel: {
      background: 'rgb(252, 115, 3)',
    },
    tag: {
      backgroundColor: darken(0.15, 'rgb(252, 115, 3)'),
    },
    filtersPanel: {
      background: lighten(0.15, 'rgb(252, 115, 3)'),
    },
  } as IThemeNamespace,
  [buttonThemeNamespace]: {
    appearance: {
      'filter-more-button-appearance': {},
      'filter-apply-button-appearance': {},
      'filter-delete-button-appearance': {},
      'filter-tag-ok-button-appearance': {},
      'filter-tag-cancel-button-appearance': {},
      'filter-tag-delete-button-appearance': {},
    },
  },
};
const themeTwo: IThemeNamespace = {
  [filterThemeNamespace]: {
    topPanel: {
      background: 'rgb(4, 219, 90)',
    },
    tag: {
      backgroundColor: darken(0.15, 'rgb(4, 219, 90)'),
    },
    filtersPanel: {
      background: lighten(0.15, 'rgb(4, 219, 90)'),
    },
  } as IThemeNamespace,
  [buttonThemeNamespace]: {
    appearance: {
      'filter-more-button-appearance': {},
      'filter-apply-button-appearance': {},
      'filter-delete-button-appearance': {},
      'filter-tag-ok-button-appearance': {},
      'filter-tag-cancel-button-appearance': {},
      'filter-tag-delete-button-appearance': {},
    },
  },
};

storiesOf('Filter', module)
  .add('One', () => (
    <Provider store={ store }>
      <PageOneContainer theme={ themeOne } />
    </Provider>
  ))
  .add('Two', () => (
    <ThemeProvider theme={ themeTwo }>
      <Provider store={ store }>
        <PageTwoContainer />
      </Provider>
    </ThemeProvider>
  ))
  .add('Three, with content', () => (
    <Provider store={ store }>
      <PageThreeContainer />
    </Provider>
  ));
