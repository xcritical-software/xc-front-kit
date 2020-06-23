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
import Select from '@xcritical/select/src';
import { ButtonTheme } from '@xcritical/button/src/interfaces';
import { darken } from 'polished';

import { CompactFilterContainer, ExternalFilterContainer } from './pages';
import { salesStatus, simpleData } from './data/simpleData';

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
  .add('With Auto Select First Condition', () => (
    <CompactFilter name="withAutoSelectFirstCondition" isAutoSelectFirstCondition filters={ simpleData } />
  ))
  .add('With Auto Open Added Tag', () => (
    <CompactFilter name="withAutoOpenAddedTag" isAutoOpenAddedTag filters={ simpleData } />
  ))
  .add('With Auto Open Added Tag And Select First Condition', () => (
    <CompactFilter
      isAutoOpenAddedTag
      isAutoSelectFirstCondition
      name="withAutoOpenAddedTagAndSelectFirstCondition"
      filters={ simpleData }
    />
  ))
  .add('With Custom Names', () => (
    <CompactFilter
      name="withCustomNames"
      moreName="Add Field Name"
      resetName="Reset Filters"
      searchName="Start Search"
      filters={ simpleData }
    />
  ))
  .add('With Validation', () => {
    const SelectWithValidation = (
      value: any,
      onChange: (value: any) => void,
      _condition?: string,
      validationError?: string,
    ) => (
      <>
        <Select
          options={ salesStatus }
          shouldFitContainer
          onChange={ onChange }
          value={ value }
        />
        { validationError && <div style={ { color: colors.DANGER } }>{ validationError }</div> }
      </>
    );

    const filtersWithValidation = simpleData.map((filter) => {
      const generalMap = {
        ...filter,
        validate: (conditions) => {
          const validationErrors = {};

          conditions.forEach((condition) => {
            if (!condition.value) {
              validationErrors[condition.key] = 'Filed is required';
            }
          });

          return validationErrors;
        },
      };

      if (filter.field === 'status') {
        generalMap.Element = SelectWithValidation;
      }

      return generalMap;
    });

    return (
      <CompactFilter name="withValidation" filters={ filtersWithValidation } />
    );
  })
  .add('With Hidden Tags', () => (
    <CompactFilterContainer isTagsVisible={ false } />
  ))
  .add('External Filter', () => (
    <ExternalFilterContainer />
  ));
