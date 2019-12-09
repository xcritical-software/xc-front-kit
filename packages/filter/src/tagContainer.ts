import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IMapDispatchFilterTag,
  IPayloadChangeFilter,
  ITagContainerProps,
} from './interfaces';
import {
  xcriticalFiltersChangeFilter,
  xcriticalFiltersRemoveFilter,
  xcriticalFiltersAddFilter,
} from './actions';
import Tag from './components/Tag';


const mapDispatchToProps = () => {
  let dispatchProps: IMapDispatchFilterTag;
  return (
    dispatch: Dispatch,
    { name }: ITagContainerProps,
  ) => {
    if (!dispatchProps) {
      dispatchProps = {
        onChangeFilter: (
          changes: IPayloadChangeFilter,
        ) => dispatch(xcriticalFiltersChangeFilter(name, changes)),
        onRemoveFilter: (guid) => dispatch(xcriticalFiltersRemoveFilter(name, guid)),
        onAddCondition: (
          filterName: string,
        ) => dispatch(xcriticalFiltersAddFilter(name, {
          column: filterName,
          condition: '',
          value: '',
        })),
      };
    }
    return dispatchProps;
  };
};

export default connect<any, IMapDispatchFilterTag, ITagContainerProps>(
  null,
  mapDispatchToProps,
)(Tag);
