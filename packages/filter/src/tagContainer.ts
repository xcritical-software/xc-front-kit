import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IMapDispatchFilterRow, IFilterTagProps, IPayloadChangeFilter } from './interfaces';
import { xcriticalFiltersChangeFilter, xcriticalFiltersRemoveFilter } from './actions';
import Tag from './Tag';


const mapDispatchToProps = () => {
  let dispatchProps: IMapDispatchFilterRow;
  return (
    dispatch: Dispatch,
    { name, guid }: IFilterTagProps,
  ) => {
    if (!dispatchProps) {
      dispatchProps = {
        changeFilter: (
          changes: IPayloadChangeFilter,
        ): any => dispatch(xcriticalFiltersChangeFilter(changes, name)),
        removeFilter: () => dispatch(xcriticalFiltersRemoveFilter(name, guid)),
      };
    }
    return dispatchProps;
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Tag);
