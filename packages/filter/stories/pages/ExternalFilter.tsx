import React, { useEffect } from 'react';
import { v1 as uuid } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import get from 'lodash.get';

import Input from '@xcritical/input';

import { CompactFilter, xcriticalFiltersInit, xcriticalFiltersChangeFilter } from '../../src';
import { simpleData } from '../data/externalData';
import { IPageExternal } from '../interfaces';


const userNameKey = uuid();
const pageName = 'externalFilter';

const threeFilters = [
  {
    column: 'userName',
    condition: 'startsWith',
    value: '',
    key: userNameKey,
  },
];


const CompactFilterPage: React.FC<IPageExternal> = ({
  onInit, isSearchable, onChangeExternal, userName,
}) => {
  useEffect(() => {
    onInit();
  }, []);

  return (
    <>
      <Input placeholder="User Name" value={ userName } onChange={ (value) => onChangeExternal(value) } />
      <CompactFilter filters={ simpleData } name={ pageName } isSearchable={ isSearchable } />
    </>
  );
};

const mapStateToProps = (state) => ({
  userName: get(state, ['filter', 'externalFilter', 'drafts'], []).find(({ key }) => key === userNameKey)?.value,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onInit: () => {
    dispatch(xcriticalFiltersInit(pageName, threeFilters));
  },
  onChangeExternal: (value) => dispatch(xcriticalFiltersChangeFilter(pageName, { guid: userNameKey, field: 'value', value })),
});

export const ExternalFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompactFilterPage);
