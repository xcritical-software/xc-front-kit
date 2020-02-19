import React from 'react';
import Input from '@xcritical/input';
import { ISelectedFilterComponent } from '../../interfaces';


export const FilterValueElement: React.FC<ISelectedFilterComponent> = React.memo(({
  currentFilter,
  filterData: {
    condition = '',
    value = '',
  } = {},
  onChange,
}) => (
  currentFilter?.Element
    ? currentFilter.Element(value, onChange, condition)
    : (
      <Input
        disabled={ !condition }
        shouldFitContainer
        onChange={ onChange }
        value={ value }
      />
    )));
