import { OptionTypeBase } from 'react-select';

import { IFilter, IStateFilter } from '../interfaces';


export const convertFiltersToOptions = (
  filters?: IFilter[],
): OptionTypeBase[] => filters?.reduce(
    (acc: OptionTypeBase[], { field, displayName }) => ([
      ...acc,
      { label: displayName, value: field },
    ]), [],
  ) || [];


export const convertSelectedFiltersToOptions = (
  selectedFilters: IStateFilter[],
  filters: OptionTypeBase[],
): OptionTypeBase[] => filters
  .filter(
    (filter) => selectedFilters?.some((selectedFilter) => selectedFilter.column === filter.value),
  );
