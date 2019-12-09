import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Filter from './Filter';
import PureCompactFilter from './CompactFilter';
import {
  IFilterRecivedProps, IFilterStateProps, IMapDispatchFilter, IStateRecivedFilter, IFilter,
} from './interfaces';
import {
  xcriticalFiltersAddFilter,
  xcriticalFiltersApply,
  xcriticalFiltersOpenFilters,
  xcriticalFiltersReset,
  xcriticalFiltersUpdateSelectedFilters,
  xcriticalFiltersSearchUpdate,
} from './actions';
import { filterSelector } from './reducer';


const mapStateToProps = (
  state: any,
  ownProps: IFilterRecivedProps,
): IFilterStateProps => {
  const {
    drafts = [],
    search,
  } = filterSelector(state, ownProps.name);
  return {
    activeFilters: drafts,
    searchInput: search,
    ...ownProps,
  };
};

const mapDispatchToProps = () => {
  let dispatchProps: IMapDispatchFilter;
  return (
    dispatch: Dispatch,
    { name }: any,
  ) => {
    if (!dispatchProps) {
      dispatchProps = {
        addFilter: () => dispatch(xcriticalFiltersAddFilter(name)),
        apply: (filters, search) => dispatch(xcriticalFiltersApply(name, filters, search)),
        openFilters: () => dispatch(xcriticalFiltersOpenFilters(name)),
        resetFilters: () => dispatch(xcriticalFiltersReset(name)),
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


const mergeProps = (stateProps: any, dispatchProps: any, ownProps: IFilterRecivedProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onApply: () => dispatchProps.apply(filterToApply(stateProps.activeFilters, ownProps.filters)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Filter);

export const CompactFilter = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PureCompactFilter);
