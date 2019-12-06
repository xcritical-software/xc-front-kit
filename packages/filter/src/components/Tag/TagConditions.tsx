import React, { useCallback } from 'react';
import { OptionTypeBase } from 'react-select';
import {
  DropdownItem, TagLabel, ConditionSelect, FilterValueElement,
} from '..';

import { ITagConditionProps } from '../../interfaces';


export const TagCondition: React.FC<ITagConditionProps> = (
  {
    currentFilterState,
    filterSetting,

    onChangeFilter,
  },
) => {
  const { key: guid } = currentFilterState;
  const onChangeValue = useCallback(
    (value: any) => {
      onChangeFilter({ field: 'value', value, guid });
    }, [guid, onChangeFilter],
  );

  const onChangeCondition = useCallback(
    ({ value }: OptionTypeBase) => {
      onChangeFilter({ field: 'condition', value, guid });
    }, [guid, onChangeFilter],
  );


  return (
    <>
      <DropdownItem>
        <TagLabel>Conditions</TagLabel>
        <ConditionSelect
          onChange={ onChangeCondition }
          currentFilter={ filterSetting }
          filterData={ currentFilterState }
        />
      </DropdownItem>

      <DropdownItem>
        <TagLabel>Value</TagLabel>
        <FilterValueElement
          onChange={ onChangeValue }
          currentFilter={ filterSetting }
          filterData={ currentFilterState }
        />
      </DropdownItem>
    </>
  );
};
