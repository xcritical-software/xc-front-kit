import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import {
  IMapDispatchFilterTag,
  IPayloadChangeFilter,
  ITagContainerProps,
} from '../../interfaces';

import {
  xcriticalFiltersChangeFilter,
  xcriticalFiltersRemoveFilter,
  xcriticalFiltersAdd,
} from '../../actions';
import { Tag } from './Tag';


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
        ) => dispatch(xcriticalFiltersAdd(name, {
          column: filterName,
          condition: '',
          value: '',
        })),
      };
    }
    return dispatchProps;
  };
};


export default connect<null, IMapDispatchFilterTag, ITagContainerProps>(
  null,
  mapDispatchToProps,
)(Tag);
