import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IMapDispatchFilterRow, IFilterRowProps, IPayloadChangeFilter } from './interfaces';
import { xcriticalFiltersChangeFilter, xcriticalFiltersRemoveFilter } from './actions';
import FilterRow from './FilterRow';


const mapDispatchToProps = () => {
  let dispatchProps: IMapDispatchFilterRow;
  return (
    dispatch: Dispatch,
    { name, guid }: IFilterRowProps,
  ) => {
    if (!dispatchProps) {
      dispatchProps = {
        changeFilter: (
          changes: IPayloadChangeFilter,
        ) => dispatch(xcriticalFiltersChangeFilter(name, changes)),
        removeFilter: () => dispatch(xcriticalFiltersRemoveFilter(name, guid)),
      };
    }
    return dispatchProps;
  };
};


export default connect(
  null,
  mapDispatchToProps,
)(FilterRow);
