import React from 'react';
import { connect } from 'react-redux';
import Filter from '../../src';
import { conditions } from '../conditions';
import { createElement } from '../createValueElement';
import { IPage, IMappedFilter } from '../interfaces';


const pageName = 'three';
const PageThree: React.FC<IPage> = ({ filters, dictionaries }) => {
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
    <>
      <h1>
        Page
        { pageName }
      </h1>
      <Filter filters={ mappedFilters } name={ pageName } />
      <div style={ { backgroundColor: 'red', height: '100px' } } />
      <div style={ { backgroundColor: 'orange', height: '100px' } } />
      <div style={ { backgroundColor: 'yellow', height: '100px' } } />
      <div style={ { backgroundColor: 'green', height: '100px' } } />
      <div style={ { backgroundColor: 'blue', height: '100px' } } />
      <div style={ { backgroundColor: 'indigo', height: '100px' } } />
    </>
  );
};

const mapStateToProps = (state: any, { theme }: any): IPage => ({
  filters: state.config.columns,
  dictionaries: state.config.dictionaries,
  theme,
});

export const PageThreeContainer = connect(mapStateToProps)(PageThree);
