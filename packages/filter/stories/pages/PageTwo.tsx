import React from 'react';
import { connect } from 'react-redux';
import Filter from '../../src';
import { conditions } from '../conditions';
import { createElement } from '../createValueElement';
import { IPage, IMappedFilter, IFilter } from '../interfaces';


const pageName = 'two';
const PageTwo: React.FC<IPage> = ({ filters, dictionaries }) => {
  const mappedFilters: IFilter[] = filters
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
    </>
  );
};

const mapStateToProps = (state: any, { theme }: any): IPage => ({
  filters: state.config.columns,
  dictionaries: state.config.dictionaries,
  theme,
});

export const PageTwoContainer = connect(mapStateToProps)(PageTwo);
