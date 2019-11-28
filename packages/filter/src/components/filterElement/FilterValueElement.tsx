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
}) => {
  const Element = currentFilter ? currentFilter.Element || Input : null;
  if (Element && condition) {
    return (
      <Element
        shouldFitContainer
        onChange={ onChange }
        value={ value }
      />
    );
  }

  return null;
});
