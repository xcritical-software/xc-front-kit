import * as actions from './const';
import {
  IStateRecivedFilter,
  IPayloadChangeFilter,
  IFilterAction,
  FilterActionType,
  IPayloadRemoveFilter,
  IPayloadInitFilters,
} from '../interfaces';


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
  changes: IPayloadChangeFilter,
): IFilterAction<IPayloadChangeFilter> {
  return actionCreator(
    actions.FILTERS_CHANGE_FILTER,
    name,
    changes,
  );
}
export function xcriticalFiltersAddFilter(name: string): IFilterAction {
  return actionCreator(
    actions.FILTERS_ADD_NEW,
    name,
  );
}
export function xcriticalFiltersRemoveFilter(
  name: string,
  guid: string,
): IFilterAction<IPayloadRemoveFilter> {
  return actionCreator(
    actions.FILTERS_REMOVE_FILTER,
    name,
    { guid },
  );
}
export function xcriticalFiltersApply(
  name: string,
  filters: IStateRecivedFilter[],
): IFilterAction<IPayloadInitFilters> {
  return actionCreator(
    actions.FILTERS_APPLY,
    name,
    filters,
  );
}

export function xcriticalFiltersOpenFilters(name: string): IFilterAction {
  return actionCreator(
    actions.FILTERS_OPEN,
    name,
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
): IFilterAction<IPayloadInitFilters> {
  return actionCreator(
    actions.FILTERS_RESET,
    name,
    { filters },
  );
}
export function xcriticalFiltersAdd(
  name: string,
  filters: IStateRecivedFilter[],
): IFilterAction<IPayloadInitFilters> {
  return actionCreator(
    actions.FILTERS_ADD,
    name,
    { filters },
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
