import React, {
  ReactElement, useState, useRef, MutableRefObject,
} from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IFilterRow,
  IFilterRowProps,
  IMapDispatchFilterRow,
  IPayloadChangeFilter,
  IFilter,
} from './interfaces';
import {
  xcriticalFiltersChangeFilter,
  xcriticalFiltersRemoveFilter,
} from './actions';


const WrapperTag = styled.div`
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid black;
  padding: 2px 5px;
  display: flex;
  align-items: center;
  border-radius: 5px;
`;
const DeleteButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const WrapperElement = styled.div`
  padding-right: 5px;
  padding-left: 5px;
`;

const WrapperFilter = styled.div`
  display: flex;
  align-items: center;
`;
const WrapperButtons = styled.div`
  margin-left: 10px;
`;

const Tag = ({
  filter,
  removeFilter,
  id,
  filters,
  changeFilter,
}: IFilterRow): ReactElement | null => {
  const [edit, changeEdit] = useState(false);
  const [value, changeValue] = useState(filter.value);
  const currentFilter: MutableRefObject<IFilter> = useRef(filters.find(
    ({ field }) => field === filter.column,
  ) as IFilter);
  if (!filter.column) return null;


  const { Element, conditions, displayName } = currentFilter.current;
  const handleChange = (v: any): void => {
    changeValue(v);
  };

  return (
    <WrapperTag>
      <WrapperFilter
        onClick={ () => {
          if (filter.condition && conditions[filter.condition].hasValue) changeEdit(true);
        } }
      >
        { displayName }


        { filter.condition && conditions[filter.condition].displayName }

        { filter.value
          && filter.condition
          && conditions[filter.condition].hasValue && (
          <WrapperElement>
            <Element
              handleChange={ handleChange }
              value={ value }
              key={ filter.column }
              isEdit={ edit }
            />
          </WrapperElement>
        ) }
      </WrapperFilter>

      <WrapperButtons>
        { edit ? (
          <>
            <DeleteButton
              onClick={ () => {
                changeEdit(false);
                changeFilter({ field: 'value', value, id });
              } }
            >
              OK
            </DeleteButton>
            <DeleteButton
              onClick={ () => {
                changeValue(filter.value);
              } }
            >
              Can
            </DeleteButton>
          </>
        ) : (
          <DeleteButton onClick={ () => removeFilter(id) }>X</DeleteButton>
        ) }
      </WrapperButtons>
    </WrapperTag>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { name }: IFilterRowProps,
): IMapDispatchFilterRow => ({
  changeFilter: (
    changes: IPayloadChangeFilter,
  ): any => dispatch(xcriticalFiltersChangeFilter(changes, name)),
  removeFilter: (id: number): any => dispatch(xcriticalFiltersRemoveFilter(name, id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Tag);
