import React, { useCallback, useMemo } from 'react';
import { OptionTypeBase } from 'react-select';

import Select from '@xcritical/select';
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
  const { key: guid, condition, column } = currentFilterState;

  const conditions = useMemo(() => (filterSetting
    ? Object.keys(filterSetting.conditions).map((key) => ({
      ...filterSetting.conditions[key],
      value: key,
      label: filterSetting.conditions[key].name,
    }))
    : []), [filterSetting]);

  const selectedCondition = useMemo(() => conditions
    .find(($condition) => $condition.value === condition),
  [condition, conditions]);


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
        <Select
          shouldFitContainer
          onChange={ onChangeCondition }
          options={ conditions }
          disabled={ !column }
          value={ selectedCondition }
        />
      </DropdownItem>
      {
        (selectedCondition && selectedCondition?.hasValue)
          ? (
            <DropdownItem>
              <TagLabel>Value</TagLabel>
              <div>
                <FilterValueElement
                  onChange={ onChangeValue }
                  currentFilter={ filterSetting }
                  filterData={ currentFilterState }
                />
              </div>
            </DropdownItem>
          ) : null
      }

    </TagConditionsWrapper>
  );
};
