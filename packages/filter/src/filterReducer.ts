import {
  ADD_FILTER,
  ADD_FILTERS,
  REMOVE_FILTER,
  CHANGE_FILTER,
  OPEN_FILTERS,
  INIT_FILTERS,
  RESET_FILTERS,
} from './actions/const';
import {
  IState,
  IStateFilter,
  IStateRecivedFilter,
  FilterActionTypes,
  IRemoveFilter,
  IChangeFilter,
  IInitFilters,
  IAction,
} from './interfaces';


const newFilter = {
  column: '',
  condition: '',
  value: '',
};

const guid = (): string => {
  function s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

const openFilters = (state: IState, action: IAction): IState => {
  if (state[action.name]) {
    return state;
  }
  const newFilters = { ...state };
  newFilters[action.name] = [{ ...newFilter, key: guid() }];
  return {
    ...newFilters,
  };
};

const addFilter = (state: IState, action: IAction): IState => ({
  ...state,
  [action.name]: [...state[action.name], { ...newFilter, key: guid() }],
});

const removeFilter = (state: IState, action: IRemoveFilter): IState => {
  const newActiveFilters = [...state[action.name]];


  delete newActiveFilters[newActiveFilters.findIndex(({ key }) => key === action.payload.guid)];


  const newActiveFiltersFiltered = newActiveFilters.filter(Boolean);
  if (!newActiveFiltersFiltered.length) {
    newActiveFiltersFiltered.push({ ...newFilter, key: guid() });
  }

  return {
    ...state,
    [action.name]: newActiveFiltersFiltered,
  };
};

const changeFilter = (state: IState, action: IChangeFilter): IState => {
  const {
    payload: { guid: id, field, value },
    name,
  } = action;
  const newFilters: IStateFilter[] = [...state[name]];
  const changedFilterIndex = newFilters.findIndex(({ key }) => key === id);
  const changedFilter = { ...newFilters[changedFilterIndex] };
  changedFilter[field] = value;
  newFilters[changedFilterIndex] = changedFilter;
  return {
    ...state,
    [name]: newFilters,
  };
};

const initFilters = (state: IState, action: IInitFilters): IState => ({
  ...state,
  [action.name]: action.payload.filters.map((filter: IStateRecivedFilter) => ({
    ...filter,
    key: guid(),
  })),
});

const addFilters = (state: IState, action: IInitFilters): IState => ({
  ...state,
  [action.name]: [
    ...state[action.name],
    ...action.payload.filters.map((filter: IStateRecivedFilter) => ({
      ...filter,
      key: guid(),
    })),
  ],
});

const resetFilters = (state: IState, action: IAction): IState => ({
  ...state,
  [action.name]: [{ ...newFilter, key: guid() }],
});

const filters = (state: IState | {} = {}, action: FilterActionTypes): IState => {
  switch (action.type) {
    case OPEN_FILTERS:
      return openFilters(state, action as IAction);

    case ADD_FILTER:
      return addFilter(state, action as IAction);

    case REMOVE_FILTER:
      return removeFilter(state, action as IRemoveFilter);

    case CHANGE_FILTER:
      return changeFilter(state, action as IChangeFilter);

    case INIT_FILTERS:
      return initFilters(state, action as IInitFilters);
    case ADD_FILTERS:
      return addFilters(state, action as IInitFilters);

    case RESET_FILTERS:
      return resetFilters(state, action as IAction);

    default:
      return state;
  }
};

export { filters };
