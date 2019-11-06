/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */

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


  return (
    <WrapperTag theme={ theme } onKeyDown={ handleKeyDown }>
      <WrapperFilter onClick={ handleClick }>
        { displayName }
        <span style={ { paddingLeft: '5px' } }>
          { filter.condition && conditions[filter.condition].name }
        </span>

        { filter.value
          && filter.condition
          && conditions[filter.condition].hasValue && (
          <WrapperElement>
            <Element
              handleChange={ handleChange }
              value={ value }
              key={ filter.column }
              isEdit={ isEdit }
              inTag
            />
          </WrapperElement>
        ) }
      </WrapperFilter>

      <WrapperButtons>
        { isEdit ? (
          <>
            <Button
              key="filter-tag-tag-button-appearance"
              appearance="filter-tag-ok-button-appearance"
              onClick={ handleOk }
            >
              OK
            </Button>
            <Button
              key="filter-tag-cancel-button-appearance"
              appearance="filter-tag-cancel-button-appearance"
              onClick={ handleCancel }
            >
              CAN
            </Button>
          </>
        ) : (
          <Button
            key="filter-tag-delete-button-appearance"
            appearance="filter-tag-delete-button-appearance"
            onClick={ removeFilter }
          >
            X
          </Button>
        ) }
      </WrapperButtons>
    </WrapperTag>
  );
};

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
        removeFilter: (e: any): any => dispatch(xcriticalFiltersRemoveFilter(name, guid)),
      };
    }
    return dispatchProps;
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Tag);
