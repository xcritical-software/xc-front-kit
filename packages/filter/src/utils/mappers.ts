import { OptionTypeBase } from 'react-select';

import { IFilter, IStateFilter } from '../interfaces';


export const convertFiltersToOptions = (
  filters?: IFilter[],
): OptionTypeBase[] => filters?.reduce(
    (acc: OptionTypeBase[], { field, displayName }) => ([
      ...acc,
      { label: displayName, value: field },
    ]), [],
  ) ?? [];


export const convertSelectedFiltersToOptions = (
  selectedFilters: IStateFilter[],
  filters: OptionTypeBase[],
): OptionTypeBase[] => filters
  .filter(
    (filter) => selectedFilters.some((selectedFilter) => selectedFilter.column === filter.value),
  );

// TODO: move to utilitify
export const groupBy = (xs: any[], key) => xs.reduce((rv, x) => {
  (rv[x[key]] = rv[x[key]] || []).push(x);

  return rv;
}, {});
