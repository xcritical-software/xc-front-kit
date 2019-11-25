import React, { useMemo } from 'react';
import { OptionTypeBase } from 'react-select';

import Select from '@xcritical/select';
import { ISelectedFilterComponent } from '../../interfaces';


export const FilterSelect: React.FC<ISelectedFilterComponent> = React.memo(({
  filters,
  currentFilter,
  onChange,
}) => {
  const selectedFilterName = useMemo(() => {
    if (currentFilter) {
      return {
        value: currentFilter.field,
        label: currentFilter.displayName,
      };
    }
    return null;
  }, [currentFilter]);

  const filterItems = useMemo(
    () => filters?.reduce(
      (acc: OptionTypeBase[], { field, displayName }) => ([
        ...acc,
        { label: displayName, value: field },
      ]),
      [],
    ),
    [filters],
  );

  return (
    <Select
      shouldFitContainer
      onChange={ onChange }
      options={ filterItems }
      value={ selectedFilterName }
    />
  );
});
