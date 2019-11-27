const addFilters = ({
  applied = [],
  drafts,
  ...rest
}: any, action: IInitFilters): IState => ({
  ...rest,
  drafts: [
    drafts,
    ...action.payload.filters.map((filter: IStateRecivedFilter) => ({
      ...filter,
      key: guid(),
    })),
  ],
  applied,
});


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
