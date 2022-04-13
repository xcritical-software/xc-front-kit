import React, { useMemo } from 'react';

import Select from '@xcritical/select';

import { ISelectedFilterComponent } from '../../interfaces';

export const ConditionSelect: React.FC<ISelectedFilterComponent> = React.memo(
  ({
    currentFilter,
    filterData: { condition = '', column = '' } = {},
    onChange,
    className,
    classNamePrefix,
  }) => {
    const conditions = useMemo(
      () =>
        currentFilter
          ? Object.keys(currentFilter.conditions).map((key) => ({
              ...currentFilter.conditions[key],
              value: key,
              label: currentFilter.conditions[key].name,
            }))
          : [],
      [currentFilter]
    );

    const selectedCondition = useMemo(
      () => conditions.find(($condition) => $condition.value === condition),
      [condition, conditions]
    );

    return (
      <Select
        shouldFitContainer
        onChange={onChange}
        options={conditions}
        disabled={!column}
        value={selectedCondition}
        className={className}
        classNamePrefix={classNamePrefix}
      />
    );
  }
);
