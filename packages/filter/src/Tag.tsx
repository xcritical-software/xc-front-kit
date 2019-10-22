import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IFilterRow, IFilterRowProps, IMapDispatchFilterRow, IPayloadChangeFilter,
} from './interfaces';
import { xcriticalFiltersChangeFilter, xcriticalFiltersRemoveFilter } from './actions';


const WrapperTag = styled.div`
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid black;
  padding: 5px;
`;
const DeleteButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const Tag = ({ filter }: IFilterRow): ReactElement => (
  <WrapperTag>
    { filter.column }

    { filter.condition }

    { String(filter.value) }
    <DeleteButton>X</DeleteButton>
  </WrapperTag>
);


const mapDispatchToProps = (
  dispatch: Dispatch,
  { name }: IFilterRowProps,
): IMapDispatchFilterRow => ({
  changeFilter:
    (changes: IPayloadChangeFilter): any => dispatch(xcriticalFiltersChangeFilter(changes, name)),
  removeFilter:
    (id: number): any => dispatch(xcriticalFiltersRemoveFilter(name, id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Tag);
