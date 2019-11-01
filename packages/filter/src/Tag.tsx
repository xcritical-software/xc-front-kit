/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  ReactElement,
  useState,
  useRef,
  MutableRefObject,
  useCallback,
} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@xcritical/button';
import {
  IMapDispatchFilterRow,
  IPayloadChangeFilter,
  IFilter,
  IFilterTag,
  IFilterTagProps,
} from './interfaces';
import {
  xcriticalFiltersChangeFilter,
  xcriticalFiltersRemoveFilter,
} from './actions';
import {
  WrapperTag,
  WrapperElement,
  WrapperFilter,
  WrapperButtons,
} from './styled';

// const TagButtons = React.memo(
//   ({ isEdit, handleOk, handleCancel, handleDelete }: any) => {
//     console.log(isEdit, handleOk, handleCancel, handleDelete)
//     if (isEdit)
//     return (
//       <>
//           <Button onClick={handleOk}>OK</Button>
//           <Button onClick={handleCancel}>CAN</Button>
//         </>
//       );
//     return <Button onClick={handleDelete}>X</Button>;
//   }
// );

const Tag = ({
  filter,
  removeFilter,
  guid,
  filters,
  changeFilter,
  theme,
}: IFilterTag): ReactElement | null => {
  const [isEdit, changeIsEdit] = useState(false);
  const [value, changeValue] = useState(filter.value);
  const currentFilter: MutableRefObject<IFilter> = useRef(filters.find(
    ({ field }) => field === filter.column,
  ) as IFilter);
  if (!filter.column) return null;

  const { Element, conditions, displayName } = currentFilter.current;
  const handleChange = (v: any): void => {
    changeValue(v);
  };
  // eslint-disable
  const handleOk = useCallback(() => {
    changeIsEdit(false);
    changeFilter({ field: 'value', value, guid });
  }, [changeFilter, guid, value]);

  const handleKeyDown = useCallback(
    (event: any): void => {
      if (isEdit) {
        if (event.key === 'Enter') {
          handleOk();
        }
        if (event.keyCode === 27) {
          changeIsEdit(false);
          changeValue(filter.value);
        }
      }
    },
    [filter.value, handleOk, isEdit],
  );

  const handleClick = useCallback(() => {
    if (filter.condition && conditions[filter.condition].hasValue) changeIsEdit(true);
  }, [conditions, filter.condition]);

  const handleCancel = useCallback(() => {
    changeValue(filter.value);
  }, [filter.value]);

  const handleDelete = useCallback(() => removeFilter(), [removeFilter]);

  return (
    <WrapperTag theme={ theme } onKeyDown={ handleKeyDown }>
      <WrapperFilter onClick={ handleClick }>
        { displayName }

        { filter.condition && conditions[filter.condition].name }

        { filter.value
          && filter.condition
          && conditions[filter.condition].hasValue && (
          <WrapperElement>
            <Element
              handleChange={ handleChange }
              value={ value }
              key={ filter.column }
              isEdit={ isEdit }
            />
          </WrapperElement>
        ) }
      </WrapperFilter>

      <WrapperButtons>
        { isEdit ? (
          <>
            <Button
              appearance="filters-tag-ok-button-appearance"
              onClick={ handleOk }
            >
              OK
            </Button>
            <Button
              appearance="filters-tag-cancel-button-appearance"
              onClick={ handleCancel }
            >
              CAN
            </Button>
          </>
        ) : (
          <Button
            appearance="filters-tag-delete-button-appearance"
            onClick={ handleDelete }
          >
            X
          </Button>
        ) }
      </WrapperButtons>
    </WrapperTag>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { name, guid }: IFilterTagProps,
): IMapDispatchFilterRow => ({
  changeFilter: (
    changes: IPayloadChangeFilter,
  ): any => dispatch(xcriticalFiltersChangeFilter(changes, name)),
  removeFilter: (): any => dispatch(xcriticalFiltersRemoveFilter(name, guid)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Tag);
