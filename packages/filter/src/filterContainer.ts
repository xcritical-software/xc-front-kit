import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import PureCompactFilter from './CompactFilter';

import {
  xcriticalFiltersApply,
  xcriticalFiltersReset,
  xcriticalFiltersUpdateSelectedFilters,
  xcriticalFiltersSearchUpdate,
} from './actions';

import { filterSelector } from './reducer';

import {
  IFilterProps,
  IMapDispatchFilter,
  IStateRecivedFilter,
  IFilter,
  IFilterComponentProps,
  IFilterContainerProps,
} from './interfaces';


const mapStateToProps = (
  state: any,
  ownProps: IFilterProps,
): IFilterContainerProps => {
  const {
    drafts = [],
    search,
  } = filterSelector(state, ownProps.name);
  return {
    activeFilters: drafts,
    searchInput: search,
  };
};

const mapDispatchToProps = () => {
  let dispatchProps: IMapDispatchFilter;
  return (
    dispatch: Dispatch,
    { name }: IFilterProps,
  ) => {
    if (!dispatchProps) {
      dispatchProps = {
        onApply: (filters, search) => dispatch(xcriticalFiltersApply(name, filters || [], search || '')),
        onResetFilters: () => dispatch(xcriticalFiltersReset(name)),
        onChangeFilters: (
          values: IStateRecivedFilter[],
        ) => dispatch(xcriticalFiltersUpdateSelectedFilters(name, values)),
        onSearchInputChange: (value) => dispatch(xcriticalFiltersSearchUpdate(name, value)),
      };
    }
    return dispatchProps;
  };
};

const filterToApply = (
  activeFilters: IStateRecivedFilter[],
  filters: IFilter[],
): IStateRecivedFilter[] => activeFilters
  .filter(({ column, condition, value }) => {
    if (value) return true;
    if (!condition) return false;

    const filter = filters.find((f) => f.field === column);
    if (filter?.conditions[condition].hasValue) {
      return !!value;
    }
    return false;
  });


const mergeProps = (
  stateProps: IFilterContainerProps,
  dispatchProps: IMapDispatchFilter,
  ownProps: IFilterProps,
): IFilterComponentProps => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onApply: () => dispatchProps.onApply(
    filterToApply(stateProps.activeFilters, ownProps.filters),
    stateProps.searchInput,
  ),
});

export const CompactFilter = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PureCompactFilter);
