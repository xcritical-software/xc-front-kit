import { v1 as uuid } from 'uuid';

import { setIn } from 'utilitify';
import {
  IFilterAction,
  IFilterStore,
  IStateRecivedFilter,
  IPayloadRemoveFilter,
  IPayloadChangeFilter,
  IPayloadInitFilters,
} from '../interfaces';


export const defaultFilter = {
  column: '',
  condition: '',
  value: '',
};

export const addFilters = (
  state: any,
  { payload: { filters } }: IFilterAction<IPayloadInitFilters>,
): IFilterStore => {
  const mappedFilters = filters.map((filter) => ({
    ...filter,
    key: filter.key || uuid(),
  }));

  return setIn(state, [
    ...state.drafts,
    ...mappedFilters,
  ], 'drafts');
};

export const removeFilter = (
  state: IFilterStore,
  { payload: { guid, name } }: IFilterAction<IPayloadRemoveFilter>,
): IFilterStore => {
  const newActiveFilters = state.drafts.filter(({
    key,
    column,
  }) => !((guid && key === guid) || (name && column === name)));

  if (!newActiveFilters.length) {
    newActiveFilters.push({ ...defaultFilter, key: uuid() });
  }

  return setIn(state, newActiveFilters, 'drafts');
};

export const changeFilter = (
  state: IFilterStore,
  { payload }: IFilterAction<IPayloadChangeFilter>,
): IFilterStore => {
  const { guid: id, field, value } = payload;

  const index = state.drafts.findIndex(({ key }: any) => key === id);

  if (field === 'column') {
    return setIn(state, {
      column: value,
      key: id,
      condition: '',
      value: '',
    }, ['drafts', `${index}`]);
  } if (field === 'condition') {
    const $state = setIn(state, value, ['drafts', `${index}`, 'condition']);
    return setIn($state, null, ['drafts', `${index}`, 'value']);
  }

  return setIn(state, value, ['drafts', `${index}`, field]);
};

export const initFilters = (
  state: IFilterStore,
  { payload: { filters } }: IFilterAction<IPayloadInitFilters>,
): IFilterStore => {
  const mappedFilters = filters.map((filter: IStateRecivedFilter) => ({
    ...filter,
    key: filter.key || uuid(),
  }));

  const $state = setIn(
    state,
    mappedFilters,
    'drafts',
  );

  return setIn(
    $state,
    mappedFilters,
    'applied',
  );
};

export const updateSelectedFilters = (
  state: IFilterStore,
  { payload: { filters } }: IFilterAction<IPayloadInitFilters>,
): IFilterStore => {
  const { drafts } = state;
  const newFilters = filters.map((filter) => {
    const draft = drafts.find((draftItem) => draftItem.column === filter.column);

    if (draft) {
      return draft;
    }

    return {
      ...filter,
      key: uuid(),
    };
  });

  return setIn(state, newFilters, 'drafts');
};

export const updateSearchInput = (
  state: IFilterStore,
  { payload }: IFilterAction<string>,
): IFilterStore => setIn(state, payload, 'search');


export const resetFilters = (state: IFilterStore): IFilterStore => setIn(state, state.applied, 'drafts');

export const applyFilters = (state: IFilterStore): IFilterStore => setIn(state, state.drafts, 'applied');
