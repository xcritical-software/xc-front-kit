import React from 'react';
import Input from '@xcritical/input';
import { ISelectedFilterComponent } from '../../interfaces';


export const FilterValueElement: React.FC<ISelectedFilterComponent> = React.memo(({
  currentFilter,
  filterData,
  onChange,
}) => {
  const Element = currentFilter ? currentFilter.Element || Input : null;
  if (Element && filterData?.condition) {
    return (
      <Element
        shouldFitContainer
        onChange={ onChange }
        value={ filterData.value }
      />
    );
  }

  return null;
});
