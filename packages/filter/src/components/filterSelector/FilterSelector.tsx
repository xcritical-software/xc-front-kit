import React, { useMemo } from 'react';

import Select from '@xcritical/select';

import { ISelectedFilterComponent } from '../../interfaces';
import { convertFiltersToOptions } from '../../utils';

export const FilterSelect: React.FC<ISelectedFilterComponent> = React.memo(
  ({ filters, currentFilter, onChange }) => {
    const selectedFilter = useMemo(() => {
      if (currentFilter) {
        return {
          value: currentFilter.field,
          label: currentFilter.displayName,
        };
      }

      return null;
    }, [currentFilter]);

    const filterItems = useMemo(
      () => convertFiltersToOptions(filters),
      [filters]
    );

    return (
      <Select
        shouldFitContainer
        onChange={onChange}
        options={filterItems}
        value={selectedFilter}
      />
    );
  }
);
