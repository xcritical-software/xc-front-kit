import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IMapDispatchFilterRow, ICompactFilterTag, IPayloadChangeFilter } from './interfaces';
import { xcriticalFiltersChangeFilter, xcriticalFiltersRemoveFilter } from './actions';
import Tag from './components/Tag';


const mapDispatchToProps = () => {
  let dispatchProps: IMapDispatchFilterRow;
  return (
    dispatch: Dispatch,
    { name }: ICompactFilterTag,
  ) => {
    if (!dispatchProps) {
      dispatchProps = {
        onChangeFilter: (
          changes: IPayloadChangeFilter,
        ) => dispatch(xcriticalFiltersChangeFilter(name, changes)),
        onRemoveFilter: (guid) => dispatch(xcriticalFiltersRemoveFilter(name, guid)),
      };
    }
    return dispatchProps;
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Tag);
