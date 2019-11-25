import React, { useMemo } from 'react';

import Select from '@xcritical/select';
import { ISelectedFilterComponent } from '../../interfaces';


export const ConditionSelect: React.FC<ISelectedFilterComponent> = React.memo(({
  currentFilter,
  filterData,
  onChange,
}) => {
  const conditions = useMemo(() => (currentFilter
    ? Object.keys(currentFilter.conditions).map((key) => ({
      ...currentFilter.conditions[key],
      value: key,
      label: currentFilter.conditions[key].name,
    }))
    : []), [currentFilter]);

  const selectedConditions = useMemo(() => conditions
    .find((f) => f.value === filterData?.condition),
  [conditions, filterData]);

  return (
    <Select
      shouldFitContainer
      onChange={ onChange }
      options={ conditions }
      disabled={ !filterData?.column }
      value={ selectedConditions }
    />
  );
});
