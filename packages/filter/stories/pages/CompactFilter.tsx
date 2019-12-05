import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CompactFilter, xcriticalFiltersInit, xcriticalFiltersAdd } from '../../src';
import { conditions } from '../conditions';
import { createElement } from '../createValueElement';
import { IPage, IMappedFilter } from '../interfaces';


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


const pageName = 'compactFilter';
const CompactFilterPage: React.FC<IPage> = ({ filters, dictionaries, onInit }) => {
  useEffect(() => {
    onInit?.();
  });

  const mappedFilters: any[] = filters
    ? filters
      .sort((a: IMappedFilter, b: IMappedFilter) => (a.displayName > b.displayName ? 1 : -1))
      .map(({
        field, name, type, displayName,
      }: IMappedFilter) => ({
        field,
        displayName,
        conditions: conditions[type],
        Element: createElement({ name, type, dictionaries }),
      }))
    : [];
  return (
    <CompactFilter filters={ mappedFilters } name={ pageName } />
  );
};


const mapStateToProps = (state: any, { theme }: any): IPage => ({
  filters: state.config.columns,
  dictionaries: state.config.dictionaries,
  theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onInit: () => {
    dispatch(xcriticalFiltersInit(pageName, threeFilters));
    dispatch(xcriticalFiltersAdd(pageName, threeFiltersAdd));
  },
});

export const CompactFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompactFilterPage);
