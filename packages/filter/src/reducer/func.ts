import uuid from 'uuid/v1';

import { setIn } from 'utilitify';
import {
  IFilterAction,
  IState,
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
): IState => setIn(state, [
  ...state.drafts,
  ...filters.map((filter) => ({
    ...filter,
    key: uuid(),
  })),
], 'drafts');


export const openFilters = (): IState => ({
  drafts: [{ ...defaultFilter, key: uuid() }],
  applied: [],
});

export const addFilter = (state: IState): IState => {
  const drafts = [...state.drafts, { ...defaultFilter, key: uuid() }];
  return setIn(state, drafts, 'drafts');
};

export const removeFilter = (
  state: IState,
  { payload: { guid } }: IFilterAction<IPayloadRemoveFilter>,
): IState => {
  const newActiveFilters = state.drafts.filter(({ key }) => key !== guid);

  if (!newActiveFilters.length) {
    newActiveFilters.push({ ...defaultFilter, key: uuid() });
  }

  return setIn(state, newActiveFilters, 'drafts');
};

export const changeFilter = (
  state: IState,
  { payload }: IFilterAction<IPayloadChangeFilter>,
): IState => {
  const { guid: id, field, value } = payload;

  const index = state.drafts.findIndex(({ key }: any) => key === id);

  if (field === 'column') {
    return setIn(state, {
      column: value, key: id, condition: '', value: '',
    }, ['drafts', `${index}`]);
  }

  return setIn(state, value, ['drafts', `${index}`, field]);
};

export const initFilters = (
  state: IState,
  { payload: { filters } }: IFilterAction<IPayloadInitFilters>,
): IState => setIn(
  state,
  filters.map((filter: IStateRecivedFilter) => ({
    ...filter,
    key: uuid(),
  })),
  'drafts',
);

export const updateSelectedFilters = (
  state: IState,
  { payload: { filters } }: IFilterAction<IPayloadInitFilters>,
): IState => {
  const { drafts } = state;

  const newFilters = filters.map((filter) => {
    const draft = drafts.find((draftItem) => draftItem.column === filter.column);

    if (draft) {
      return draft;
    }
    return filter;
  });

  return setIn(state, newFilters, 'drafts');
};


export const resetFilters = (state: IState): IState => setIn(state, state.applied, 'drafts');

export const applyFilters = (state: IState): IState => setIn(state, state.drafts, 'applied');
