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
  CompactFilterContainer,
} from './pages';
import { filterReducer } from '../src';
import { config } from './configReducer';
import { data } from './data/dummyData';
import { getConfigSuccess } from './actions';
import { filterThemeNamespace } from '../src/theme';


const store = createStore(
  combineReducers({ filter: filterReducer, config }),
  devToolsEnhancer({}),
);
setTimeout(() => store.dispatch(getConfigSuccess(data)), 10);


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

const withProvider = (story) => (
  <Provider store={ store }>
    { story() }
  </Provider>
);

storiesOf('Filter', module)

  .addDecorator(withProvider)
  .add('Simple Filter', () => (
    <CompactFilterContainer />
  ))
  .add('With Theme', () => (
    <ThemeProvider theme={ themeTwo }>
      <CompactFilterContainer />
    </ThemeProvider>
  ));
