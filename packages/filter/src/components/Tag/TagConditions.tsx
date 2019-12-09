import React, { useCallback } from 'react';
import { OptionTypeBase } from 'react-select';

import { ConditionSelect } from '../conditionSelect';
import { FilterValueElement } from '../filterElement';

import {
  TagLabel,
  TagConditionsWrapper,
  DropdownItem,
} from './styled';

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
    <TagConditionsWrapper>
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
    </TagConditionsWrapper>
  );
};
