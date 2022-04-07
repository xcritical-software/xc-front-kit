import { v1 as uuid } from 'uuid';
import { setIn } from 'utilitify';

import {
  IFilterAction,
  IFilterStore,
  IStateRecivedFilter,
  IPayloadRemoveFilter,
  PayloadChangeFilterType,
  IPayloadInitFilters,
  IStateFilter,
} from '../interfaces';

export const defaultFilter = {
  column: '',
  condition: '',
  value: '',
};

export const addFilters = (
  state: any,
  { payload: { filters } }: IFilterAction<IPayloadInitFilters>
): IFilterStore => {
  const mappedFilters = filters.map((filter) => ({
    ...filter,
    key: filter.key ?? uuid(),
  }));

  return setIn(state, [...state.drafts, ...mappedFilters], 'drafts');
};

export const removeFilter = (
  state: IFilterStore,
  { payload: { guid, name } }: IFilterAction<IPayloadRemoveFilter>
): IFilterStore => {
  const newActiveFilters = state.drafts.filter(
    ({ key, column }) => !((guid && key === guid) || (name && column === name))
  );

  if (!newActiveFilters.length) {
    newActiveFilters.push({ ...defaultFilter, key: uuid() });
  }

  return setIn(state, newActiveFilters, 'drafts');
};

export const changeFilter = (
  state: IFilterStore,
  { payload }: IFilterAction<PayloadChangeFilterType>
): IFilterStore => {
  const { guid: id, field, value } = payload;

  const index = state.drafts.findIndex(({ key }: any) => key === id);

  if (field === 'column') {
    return setIn(
      state,
      {
        column: value,
        key: id,
        condition: '',
        value: '',
      },
      ['drafts', `${index}`]
    );
  }

  if (payload.field === 'condition') {
    const { valueType, hasFieldForValue } = payload;

    const $state = setIn(state, value, ['drafts', `${index}`, 'condition']);

    if (valueType?.toLowerCase() === 'string' && hasFieldForValue) {
      return $state;
    }

    return setIn($state, null, ['drafts', `${index}`, 'value']);
  }

  return setIn(state, value, ['drafts', `${index}`, field]);
};

export const initFilters = (
  state: IFilterStore,
  { payload: { filters, search = '' } }: IFilterAction<IPayloadInitFilters>
): IFilterStore => {
  const mappedFilters = filters.map((filter: IStateRecivedFilter) => ({
    ...filter,
    key: filter.key ?? uuid(),
  }));

  let $state = setIn(state, mappedFilters, 'drafts');

  $state = setIn($state, search, 'search');

  return setIn($state, mappedFilters, 'applied');
};

export const updateSelectedFilters = (
  state: IFilterStore,
  { payload: { filters } }: IFilterAction<IPayloadInitFilters>
): IFilterStore => {
  const { drafts } = state;

  let newFilters: IStateFilter[] = [];

  filters.forEach((filter) => {
    const filterDrafts = drafts.filter(
      (draftItem) => draftItem.column === filter.column
    );

    if (filterDrafts.length) {
      newFilters = [...newFilters, ...filterDrafts];

      return;
    }

    newFilters.push({
      ...filter,
      key: uuid(),
    });
  });

  return setIn(state, newFilters, 'drafts');
};

export const updateSearchInput = (
  state: IFilterStore,
  { payload }: IFilterAction<string>
): IFilterStore => setIn(state, payload, 'search');

export const resetFilters = (state: IFilterStore): IFilterStore =>
  setIn(state, state.applied, 'drafts');

export const applyFilters = (state: IFilterStore): IFilterStore =>
  setIn(state, state.drafts, 'applied');
