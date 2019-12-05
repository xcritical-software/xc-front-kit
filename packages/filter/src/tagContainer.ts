import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IMapDispatchFilterRow, IFilterTagProps, IPayloadChangeFilter } from './interfaces';
import { xcriticalFiltersChangeFilter, xcriticalFiltersRemoveFilter } from './actions';
import Tag from './components/Tag';


const mapDispatchToProps = () => {
  let dispatchProps: IMapDispatchFilterRow;
  return (
    dispatch: Dispatch,
    { name, guid }: IFilterTagProps,
  ) => {
    if (!dispatchProps) {
      dispatchProps = {
        onChangeFilter: (
          changes: IPayloadChangeFilter,
        ) => dispatch(xcriticalFiltersChangeFilter(name, changes)),
        onRemoveFilter: () => dispatch(xcriticalFiltersRemoveFilter(name, guid)),
      };
    }
    return dispatchProps;
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Tag);
