import get from 'lodash.get';
import { Reducer } from 'redux';

import uuid from 'uuid/v1';
import * as actions from '../actions/const';

import { reducerDictionary } from '../utils';
import { IFilterStore, FilterActionType, IFilterAction } from '../interfaces';
import {
  changeFilter,
  addFilters,
  addFilter,
  removeFilter,
  applyFilters,
  initFilters,
  resetFilters,
  openFilters,
  defaultFilter,
  updateSelectedFilters,
  updateSearchInput,
} from './func';


const behaviors: Record<FilterActionType, Function> = {
  [actions.FILTERS_ADD]: addFilters,
  [actions.FILTERS_CHANGE_FILTER]: changeFilter,
  [actions.FILTERS_ADD_NEW]: addFilter,
  [actions.FILTERS_APPLY]: applyFilters,
  [actions.FILTERS_INIT]: initFilters,
  [actions.FILTERS_RESET]: resetFilters,
  [actions.FILTERS_REMOVE_FILTER]: removeFilter,
  [actions.FILTERS_OPEN]: openFilters,
  [actions.FILTERS_UPDATE_SELECTED_FILTERS]: updateSelectedFilters,
  [actions.FILTERS_SEARCH_UPDATE]: updateSearchInput,
};

const defaultFilterState = {
  drafts: [{ ...defaultFilter, key: uuid() }],
  applied: [],
  search: '',
};

const reducer: Reducer<IFilterStore, IFilterAction> = (state = defaultFilterState, action) => {
  const behavior = behaviors[action.type];
  return behavior ? behavior(state, action) : state;
};

export const filterSelector = (state: any, filterName: string): IFilterStore => {
  if (!filterName) {
    return state;
  }

  return get(state.filter, filterName, defaultFilterState);
};

export default reducerDictionary(reducer, 'filterName');
