import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Filter from './Filter';
import {
  IFilterRecivedProps, IFilterStateProps, IMapDispatchFilter, IStateRecivedFilter, IFilter,
} from './interfaces';
import {
  xcriticalFiltersAddFilter,
  xcriticalFiltersApply,
  xcriticalFiltersOpenFilters,
  xcriticalFiltersReset,
} from './actions';
import { filterSelector } from './reducer';


const mapStateToProps = (
  state: any,
  ownProps: IFilterRecivedProps,
): IFilterStateProps => {
  const activeFilters = filterSelector(state, ownProps.name)?.drafts || [];
  return {
    activeFilters,
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
        apply: (filters) => dispatch(xcriticalFiltersApply(name, filters)),
        openFilters: () => dispatch(xcriticalFiltersOpenFilters(name)),
        resetFilters: () => dispatch(xcriticalFiltersReset(name)),
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
  apply: () => dispatchProps.apply(filterToApply(stateProps.activeFilters, ownProps.filters)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Filter);
