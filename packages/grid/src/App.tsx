import React from 'react';
import { Table } from './components/table/table';
import { mockRows, mockColumns } from './components/row/mock-rows';
import { tableTheme } from './components/theme/theme';


const Grid: React.FC = () => (
  <Table rows={ mockRows } columns={ mockColumns } theme={ tableTheme } />
);

export default Grid;
