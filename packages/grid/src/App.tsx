import React from 'react';
import './App.css';
import { Table } from './components/table/table';
import { mockRows, mockColumns } from './components/row/mock-rows';
import { tableTheme } from './components/theme/theme';


const App: React.FC = () => (
  <Table rows={ mockRows } columns={ mockColumns } theme={ tableTheme } />
);

export default App;
