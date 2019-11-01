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
import {
  PageOneContainer,
  PageTwoContainer,
  PageThreeContainer,
} from './pages';

import { filters, xcriticalFiltersInit, xcriticalFiltersAdd } from '../src';
import { config } from './configReducer';
import { data } from './dummyData';
import { getConfigSuccess } from './actions';
import './index.css';
import { filterThemeNamespace } from '../src/theme';
// import { buttonThemeNamespace } from '../../button/src';


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
  100,
);
setTimeout(
  () => store.dispatch(xcriticalFiltersAdd('three', threeFiltersAdd)),
  200,
);
setTimeout(
  () => store.dispatch(xcriticalFiltersAdd('three', threeFiltersAdd)),
  400,
);
setTimeout(
  () => store.dispatch(xcriticalFiltersAdd('three', threeFiltersAdd)),
  600,
);
setTimeout(
  () => store.dispatch(xcriticalFiltersAdd('three', threeFiltersAdd)),
  800,
);
setTimeout(
  () => store.dispatch(xcriticalFiltersAdd('three', threeFiltersAdd)),
  1000,
);

/* eslint no-unused-vars: "error" */
const theme: IThemeNamespace = {
  [filterThemeNamespace]: {
    backgroundTopPanel: 'lightblue',

  } as IThemeNamespace,
  // [ buttonThemeNamespace ]: {
  //   appearance: {
  //     ['filter-button-apply']: {
  //       margin: {
  //         .....
  //       }
  //     }
  //   }
  // }
};

storiesOf('Filter', module)
  .add('One', () => (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <PageOneContainer theme={ theme } />
      </Provider>
    </ThemeProvider>
  ))
  .add('Two', () => (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <PageTwoContainer />
      </Provider>
    </ThemeProvider>
  ))
  .add('Three, with content', () => (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <PageThreeContainer />
      </Provider>
    </ThemeProvider>
  ));
