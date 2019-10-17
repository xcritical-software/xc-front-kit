/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */

import { storiesOf } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { PageOneContainer, PageTwoContainer, PageThreeContainer } from './pages';


import {
  filters, xcriticalFiltersInit, xcriticalFiltersAdd,
} from '../src';
import { config } from './configReducer';
import { data } from './dummyData';
import { getConfigSuccess } from './actions';
import './index.css';


const store = createStore(combineReducers({ filters, config }), devToolsEnhancer({}));
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
setTimeout(() => store.dispatch(xcriticalFiltersInit('three', threeFilters)), 3000);
setTimeout(() => store.dispatch(xcriticalFiltersAdd('three', threeFiltersAdd)), 5000);


storiesOf('Filter', module)
  .add('One', () => (
    <Provider store={ store }>
      <PageOneContainer />
    </Provider>
  ))
  .add('Two', () => (
    <Provider store={ store }>
      <PageTwoContainer />
    </Provider>
  ))
  .add('Three', () => (
    <Provider store={ store }>
      <PageThreeContainer />
    </Provider>
  ));
