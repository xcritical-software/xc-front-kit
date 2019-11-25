import { setIn } from 'utilitify';

import {
  ADD_FILTER,
  ADD_FILTERS,
  REMOVE_FILTER,
  CHANGE_FILTER,
  OPEN_FILTERS,
  INIT_FILTERS,
  RESET_FILTERS,
  APPLY_FILTERS,
} from './actions/const';
import {
  IState,
  // IStateFilter,
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
  newFilters[action.name] = {
    drafts: [{ ...newFilter, key: guid() }],
    applied: [],
  };
  return {
    ...newFilters,
  };
};

const addFilter = (state: IState, action: IAction): IState => {
  const applied = state[action.name].applied ? state[action.name].applied : [];
  return {
    ...state,
    [action.name]: {
      drafts: [...state[action.name].drafts, { ...newFilter, key: guid() }],
      applied,
    },
  };
};

const removeFilter = (state: IState, action: IRemoveFilter): IState => {
  const newActiveFilters = state[action.name]
    .drafts.filter(({ key }) => key !== action.payload.guid);

  if (!newActiveFilters.length) {
    newActiveFilters.push({ ...newFilter, key: guid() });
  }

  const applied = state[action.name].applied ? state[action.name].applied : [];
  return {
    ...state,
    [action.name]: {
      drafts: newActiveFilters,
      applied,
    },
  };
};

const changeFilter = (state: IState, action: IChangeFilter): IState => {
  const {
    payload: { guid: id, field, value },
    name,
  } = action;

  const index = state[name].drafts.findIndex(({ key }: any) => key === id);

  if (field === 'column') {
    return setIn(state, {
      column: value, key: id, condition: '', value: '',
    }, [name, 'drafts', index]);
  }
  return setIn(state, value, [name, 'drafts', index, field]);
};

const initFilters = (state: IState, action: IInitFilters): IState => ({
  ...state,
  [action.name]: {
    drafts: action.payload.filters.map((filter: IStateRecivedFilter) => ({
      ...filter,
      key: guid(),
    })),
    applied: [],
  },
});


const addFilters = (state: IState, action: IInitFilters): IState => {
  const applied = state[action.name].applied ? state[action.name].applied : [];
  return {
    ...state,
    [action.name]: {
      drafts: [
        ...state[action.name].drafts,
        ...action.payload.filters.map((filter: IStateRecivedFilter) => ({
          ...filter,
          key: guid(),
        })),
      ],
      applied,
    },
  };
};

const resetFilters = (state: IState, action: IAction): IState => ({
  ...state,
  [action.name]: {
    drafts: [{ ...newFilter, key: guid() }],
    applied: [],
  },
});

const applyFilters = (state: IState, action: any): IState => ({
  ...state,
  [action.name]: {
    ...state[action.name],
    applied: action.payload,
  },
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

    case APPLY_FILTERS:
      return applyFilters(state, action as IAction);

    default:
      return state;
  }
};

export { filters };
