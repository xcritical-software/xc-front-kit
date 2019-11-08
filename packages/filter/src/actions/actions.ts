import {
  ADD_FILTER,
  INIT_FILTERS,
  ADD_FILTERS,
  REMOVE_FILTER,
  CHANGE_FILTER,
  APPLY_FILTERS,
  OPEN_FILTERS,
  RESET_FILTERS,
} from './const';
import {
  IStateRecivedFilter,
  IPayloadChangeFilter,
  IChangeFilter,
  IInitFilters,
  IAction,
  IRemoveFilter,
} from '../interfaces';


export function xcriticalFiltersChangeFilter(
  changes: IPayloadChangeFilter,
  name: string,
): IChangeFilter {
  return {
    type: CHANGE_FILTER,
    name,
    payload: { ...changes },
  };
}
export function xcriticalFiltersAddFilter(name: string): IAction {
  return {
    type: ADD_FILTER,
    name,
  };
}
export function xcriticalFiltersRemoveFilter(
  name: string,
  guid: string,
): IRemoveFilter {
  return {
    type: REMOVE_FILTER,
    name,
    payload: { guid },
  };
}
export function xcriticalFiltersApply(
  filters: any,
  name: string,
): any {
  return {
    type: APPLY_FILTERS,
    name,
    payload: filters,
  };
}

export function xcriticalFiltersOpenFilters(name: string): IAction {
  return {
    type: OPEN_FILTERS,
    name,
  };
}

export function xcriticalFiltersReset(name: string): IAction {
  return {
    type: RESET_FILTERS,
    name,
  };
}
export function xcriticalFiltersInit(
  name: string,
  filters: IStateRecivedFilter[],
): IInitFilters {
  return {
    type: INIT_FILTERS,
    payload: { filters },
    name,
  };
}
export function xcriticalFiltersAdd(
  name: string,
  filters: IStateRecivedFilter[],
): IInitFilters {
  return {
    type: ADD_FILTERS,
    payload: { filters },
    name,
  };
}
