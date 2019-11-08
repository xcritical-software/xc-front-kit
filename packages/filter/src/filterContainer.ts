import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Filter from './Filter';
import {
  IFilterRecivedProps, IFilterStateProps, IMapDispatchFilter, IStateRecivedFilter,
} from './interfaces';
import {
  xcriticalFiltersAddFilter,
  xcriticalFiltersApply,
  xcriticalFiltersOpenFilters,
  xcriticalFiltersReset,
} from './actions';


const mapStateToProps = (
  state: any,
  ownProps: IFilterRecivedProps,
): IFilterStateProps => {
  const activeFilters = state.filters[ownProps.name] ? state.filters[ownProps.name].drafts : [];
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
        apply: (filters: any) => dispatch(xcriticalFiltersApply(filters, name)),
        openFilters: () => dispatch(xcriticalFiltersOpenFilters(name)),
        resetFilters: () => dispatch(xcriticalFiltersReset(name)),
      };
    }
    return dispatchProps;
  };
};

const filterToApply = (activeFilters: any, filters: any) => activeFilters
  .filter(({ column, condition, value }: IStateRecivedFilter) => {
    if (value) return true;
    if (!condition) return false;

    const filter = filters.find((f: any) => f.field === column);
    if (filter && filter.conditions[condition].hasValue) {
      return !!value;
    }
    return false;
  })
  .map(({ column, condition, value }: IStateRecivedFilter) => ({ column, condition, value }));


const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => ({
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
