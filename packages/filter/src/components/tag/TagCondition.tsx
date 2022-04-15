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
  className,
  classNamePrefix,
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
    <TagConditionsWrapper className={className}>
      <RemoveConditionButton
        className={classNamePrefix && `${classNamePrefix}__remove`}
        onClick={onRemoveCondition}>
        <Remove size={20} />
      </RemoveConditionButton>

      <DropdownItem className={classNamePrefix && `${classNamePrefix}__type`}>
        <TagLabel className={classNamePrefix && `${classNamePrefix}__label`}>
          Conditions
        </TagLabel>
        <Select
          shouldFitContainer
          className={classNamePrefix && `${classNamePrefix}__conditions`}
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
        <DropdownItem
          className={classNamePrefix && `${classNamePrefix}__value`}>
          <TagLabel>Value</TagLabel>

          <FilterValueElement
            tagConditionsRef={tagConditionsRef}
            onChange={onChangeValue}
            currentFilter={filterSetting}
            filterData={currentFilterState}
            validationError={validationError}
            classNamePrefix={classNamePrefix}
          />
        </DropdownItem>
      ) : null}
    </TagConditionsWrapper>
  );
};
