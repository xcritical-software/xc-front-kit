import React from 'react';
import { connect } from 'react-redux';
import Filter from '../../src';
import { conditions } from '../conditions';
import { createElement } from '../createValueElement';
import { IPage, IMappedFilter } from '../interfaces';


const pageName = 'one';
const PageOne: React.FC<IPage> = ({ filters, dictionaries, theme }) => {
  const mappedFilters: any[] = filters
    ? filters
      .sort((a: IMappedFilter, b: IMappedFilter) => (a.displayName > b.displayName ? 1 : -1))
      .map(({
        field, name, type, displayName,
      }: IMappedFilter) => ({
        field, // что отправится в редюсер в поле column
        displayName, // выводится пользователю
        conditions: conditions[type], // conditions текущего фильтра
        Element: createElement({ name, type, dictionaries }), // элемент для value
      }))
    : [];
  return (
    <>
      <h1>
        Page
        { pageName }
      </h1>
      <Filter filters={ mappedFilters } name={ pageName } theme={ theme } />
    </>
  );
};

const mapStateToProps = (state: any, { theme }: any): IPage => ({
  filters: state.config.columns,
  dictionaries: state.config.dictionaries,
  theme,
});

export const PageOneContainer = connect(mapStateToProps)(PageOne);
