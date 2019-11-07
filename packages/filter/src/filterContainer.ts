import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Filter from './Filter';
import { IFilterRecivedProps, IFilterStateProps, IMapDispatchFilter } from './interfaces';
import {
  xcriticalFiltersAddFilter,
  xcriticalFiltersApply,
  xcriticalFiltersOpenFilters,
  xcriticalFiltersReset,
} from './actions';


const mapStateToProps = (
  state: any,
  ownProps: IFilterRecivedProps,
): IFilterStateProps => ({
  activeFilters: state.filters[ownProps.name],
  ...ownProps,
});

const mapDispatchToProps = () => {
  let dispatchProps: IMapDispatchFilter;
  return (
    dispatch: Dispatch,
    { name }: any,
  ) => {
    if (!dispatchProps) {
      dispatchProps = {
        addFilter: () => dispatch(xcriticalFiltersAddFilter(name)),
        apply: () => dispatch(xcriticalFiltersApply(name)),
        openFilters: () => dispatch(xcriticalFiltersOpenFilters(name)),
        resetFilters: () => dispatch(xcriticalFiltersReset(name)),
      };
    }
    return dispatchProps;
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
