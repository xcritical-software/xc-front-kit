import React, { useCallback } from 'react';
import { OptionTypeBase } from 'react-select';

import { ConditionSelect } from '../conditionSelect';
import { FilterValueElement } from '../filterElement';

import {
  TagLabel,
  TagConditionsWrapper,
  DropdownItem,
  RemoveConditionButton,
} from './styled';

import { ITagConditionProps } from '../../interfaces';
import { Remove } from '../icons';


export const TagCondition: React.FC<ITagConditionProps> = (
  {
    currentFilterState,
    filterSetting,
    onChangeFilter,
    onRemoveFilter,
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

  const onRemoveCondition = useCallback(
    () => {
      onRemoveFilter({ guid });
    }, [guid, onRemoveFilter],
  );


  return (
    <TagConditionsWrapper>
      <RemoveConditionButton onClick={ onRemoveCondition }>
        <Remove size={ 20 } />
      </RemoveConditionButton>

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
