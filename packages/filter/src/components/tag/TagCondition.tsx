import React, { useCallback, useMemo } from 'react';

import Select, { OptionTypeBase } from '@xcritical/select';

import { FilterValueElement } from '../filterElement';
import { ITagConditionProps } from '../../interfaces';
import { Remove } from '../icons';

import {
  TagLabel,
  TagConditionsWrapper,
  DropdownItem,
  RemoveConditionButton,
} from './styled';

export const TagCondition: React.FC<ITagConditionProps> = ({
  tagConditionsRef,
  currentFilterState,
  filterSetting,
  validationError,
  filterTheme,
  onChangeFilter,
  onRemoveFilter,
}) => {
  const { key: guid, condition, column } = currentFilterState;

  const tagConditionSelectStyles = useMemo(
    () => ({
      menuPortal: (css) => ({
        ...css,
        zIndex: filterTheme.tagConditionSelectZIndex,
      }),
    }),
    [filterTheme.tagConditionSelectZIndex]
  );

  const conditions = useMemo(
    () =>
      filterSetting
        ? Object.keys(filterSetting.conditions).map((key) => ({
            ...filterSetting.conditions[key],
            value: key,
            label: filterSetting.conditions[key].name,
          }))
        : [],
    [filterSetting]
  );

  const selectedCondition = useMemo(
    () => conditions.find(($condition) => $condition.value === condition),
    [condition, conditions]
  );

  const onChangeValue = useCallback(
    (value: any) => {
      onChangeFilter({ field: 'value', value, guid });
    },
    [guid, onChangeFilter]
  );

  const onChangeCondition = useCallback(
    ({ value }: OptionTypeBase) => {
      onChangeFilter({
        field: 'condition',
        value,
        guid,
        valueType: filterSetting?.type,
        hasFieldForValue: selectedCondition?.hasValue,
      });
    },
    [guid, onChangeFilter, conditions, filterSetting?.type]
  );

  const onRemoveCondition = useCallback(() => {
    onRemoveFilter({ guid });
  }, [guid, onRemoveFilter]);

  return (
    <TagConditionsWrapper className="at-filter--tag-conditions-wrapper">
      <RemoveConditionButton
        className="at-filter--remove-conditions-button"
        onClick={onRemoveCondition}>
        <Remove size={20} />
      </RemoveConditionButton>

      <DropdownItem className="at-filter--dropdown-item">
        <TagLabel className="at-filter--tag-label">Conditions</TagLabel>
        <Select
          shouldFitContainer
          appearance="filters-tag-condition"
          menuPortalTarget={document.body}
          styles={tagConditionSelectStyles}
          closeMenuOnScroll={(event: Event) =>
            event.target === tagConditionsRef.current
          }
          onChange={onChangeCondition}
          options={conditions}
          disabled={!column}
          value={selectedCondition}
        />
      </DropdownItem>
      {selectedCondition?.hasValue ? (
        <DropdownItem className="at-filter--dropdown-item">
          <TagLabel className="at-filter--tag-label">Value</TagLabel>
          <div>
            <FilterValueElement
              tagConditionsRef={tagConditionsRef}
              onChange={onChangeValue}
              currentFilter={filterSetting}
              filterData={currentFilterState}
              validationError={validationError}
            />
          </div>
        </DropdownItem>
      ) : null}
    </TagConditionsWrapper>
  );
};
