import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CompactFilter, xcriticalFiltersInit, xcriticalFiltersAdd } from '../../src';
import { simpleData } from '../data/simpleData';
import { IPage } from '../interfaces';


const threeFilters = [
  {
    column: 'userName',
    condition: 'startsWith',
    value: '15',
  },
  {
    column: 'userName',
    condition: 'startsWith',
    value: '15',
  },
  {
    column: 'country',
    condition: 'endsWith',
    value: '20',
  },
];
const threeFiltersAdd = [
  {
    column: 'userName',
    condition: 'startsWith',
    value: '150',
  },
  {
    column: 'userName',
    condition: 'endsWith',
    value: '150',
  },
  {
    column: 'country',
    condition: 'endsWith',
    value: '200',
  },
];


const pageName = 'compactFilter';
const CompactFilterPage: React.FC<IPage> = ({
  onInit, isSearchable,
}) => {
  useEffect(() => {
    onInit();
  });
  return (
    <CompactFilter filters={ simpleData } name={ pageName } isSearchable={ isSearchable } />
  );
};


const mapDispatchToProps = (dispatch: Dispatch) => ({
  onInit: () => {
    dispatch(xcriticalFiltersInit(pageName, threeFilters));
    dispatch(xcriticalFiltersAdd(pageName, threeFiltersAdd));
  },
});

export const CompactFilterContainer = connect(
  null,
  mapDispatchToProps,
)(CompactFilterPage);
