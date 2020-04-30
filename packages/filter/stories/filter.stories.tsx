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
import { IThemeNamespace, colors } from '@xcritical/theme';
import { buttonThemeNamespace } from '@xcritical/button';
import { ButtonTheme } from '@xcritical/button/src/interfaces';
import { darken } from 'polished';

import { CompactFilterContainer, ExternalFilterContainer } from './pages';

import {
  filterReducer,
  filterThemeNamespace,
  CompactFilter,
  IFilterTheme,
} from '../src';


export const store = createStore(
  combineReducers({ filter: filterReducer }),
  devToolsEnhancer({}),
);


const themeTwo: IThemeNamespace = {
  [buttonThemeNamespace]: {
    appearance: {
      'filter-tag': {
        paddingRight: 0,
        selected: {
          background: colors.PRIMARY,
          borderColor: colors.PRIMARY,
          boxShadowColor: darken(0.1, colors.PRIMARY),
          color: colors.WHITE,
          fill: colors.WHITE,
        },
      },
      'filters-more': {
        paddingRight: 10,
        paddingLeft: 10,
        prefixSpacing: 10,
        selected: {
          background: colors.PRIMARY,
          borderColor: colors.PRIMARY,
          boxShadowColor: darken(0.1, colors.PRIMARY),
          color: colors.WHITE,
          fill: colors.WHITE,
        },
      },
      'filters-apply': {},
      'filters-reset': {
        background: 'transparent',
        color: colors.PRIMARY,
        fontWeight: 'inherit',
        borderColor: 'transparent',
        padding: 5,
        marginLeft: 20,
        hover: {
          background: 'transparent',
          color: colors.PRIMARY,
          borderColor: 'transparent',
          textDecoration: 'underline',
          textDecorationColor: colors.PRIMARY,
        },
        _outline: {
          background: 'transparent',
          color: colors.PRIMARY,
          borderColor: 'transparent',
        },
      },
      'filter-tag-cancel-button-appearance': {},
      'filter-tag-delete-button-appearance': {},
    },
  } as ButtonTheme,
  [filterThemeNamespace]: {
    topPanel: {
      flexWrap: 'wrap',
    },
    searchInputWrapper: {
      order: 1,
      margin: 0,
      height: '36px',
    },
    topPanelTags: {
      width: '100%',
      order: 3,
      paddingTop: '10px',
    },
    topPanelButtons: {
      order: 2,
      margin: 0,
    },
  } as IFilterTheme,
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
  ))
  .add('With Disabled', () => (
    <CompactFilterContainer disabled />
  ))
  .add('With Prefix', () => (
    <CompactFilter name="withPrefix" filters={ [] } prefix={ <div>Prefix</div> } />
  ))
  .add('With Postfix', () => (
    <CompactFilter name="withPostfix" filters={ [] } postfix={ <div>Postfix</div> } />
  ))
  .add('External Filter', () => (
    <ExternalFilterContainer />
  ));
