import {
  IStateRecivedFilter,
  PayloadChangeFilterType,
  IFilterAction,
  FilterActionType,
  IPayloadRemoveFilter,
  IPayloadInitFilters,
  IPayloadApplyFilters,
} from '../interfaces';

import * as actions from './const';


function actionCreator(type: FilterActionType, name: string, payload?: any): IFilterAction {
  return {
    type,
    meta: {
      filterName: name,
    },
    payload,
  };
}

export function xcriticalFiltersChangeFilter(
  name: string,
  changes: PayloadChangeFilterType,
): IFilterAction<PayloadChangeFilterType> {
  return actionCreator(
    actions.FILTERS_CHANGE_FILTER,
    name,
    changes,
  );
}

export function xcriticalFiltersRemoveFilter(
  name: string,
  filter: IPayloadRemoveFilter,
): IFilterAction<IPayloadRemoveFilter> {
  return actionCreator(
    actions.FILTERS_REMOVE_FILTER,
    name,
    filter,
  );
}
export function xcriticalFiltersApply(
  name: string,
  filters: IStateRecivedFilter[],
  search: string,
): IFilterAction<IPayloadApplyFilters> {
  return actionCreator(
    actions.FILTERS_APPLY,
    name,
    {
      filters,
      search,
    },
  );
}

export function xcriticalFiltersReset(name: string): IFilterAction {
  return actionCreator(
    actions.FILTERS_RESET,
    name,
  );
}
export function xcriticalFiltersInit(
  name: string,
  filters: IStateRecivedFilter[],
  search?: string,
): IFilterAction<IPayloadInitFilters> {
  return actionCreator(
    actions.FILTERS_INIT,
    name,
    {
      filters,
      search,
    },
  );
}
export function xcriticalFiltersAdd(
  name: string,
  filters: IStateRecivedFilter[] | IStateRecivedFilter,
): IFilterAction<IPayloadInitFilters> {
  let $filters: IStateRecivedFilter[];

  if (!Array.isArray(filters)) {
    $filters = [filters];
  } else $filters = filters;

  return actionCreator(
    actions.FILTERS_ADD,
    name,
    { filters: $filters },
  );
}


export function xcriticalFiltersUpdateSelectedFilters(
  name: string,
  filters: IStateRecivedFilter[],
): IFilterAction<IPayloadInitFilters> {
  return actionCreator(
    actions.FILTERS_UPDATE_SELECTED_FILTERS,
    name,
    { filters },
  );
}

export function xcriticalFiltersSearchUpdate(
  name: string,
  value: string,
): IFilterAction<string> {
  return actionCreator(
    actions.FILTERS_SEARCH_UPDATE,
    name,
    value,
  );
}
