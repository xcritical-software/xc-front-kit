import React, {
  useState,
  useCallback,
  useMemo,
  MouseEvent,
} from 'react';

import isEmpty from 'lodash.isempty';
import Button from '@xcritical/button';

import {
  ITagProps,
  IFilter,
  IStateFilter,
  IPayloadChangeFilter,
} from '../../interfaces';

import { Dropdown } from '../Dropdown';
import { ChevronDown, ChevronUp, Remove } from '../icons';
import { TagCondition } from './TagCondition';

import {
  TagConditions,
  DropdownFooter,
  ButtonBlock,
  RemoveButton,
} from './styled';


export const Tag: React.FC<ITagProps> = ({
  filterId,
  conditions,
  filters,
  disabled,
  isAutoSelectFirstCondition,
  isAutoOpenAddedTag,
  onChangeFilter,
  onRemoveFilter,
  onAddCondition,
  onApply,
}) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isOpen, setIsOpen] = useState(() => {
    const isAdded = conditions.length === 1 && !conditions[0].condition;
    return isAutoOpenAddedTag && isAdded;
  });

  const filterSetting = useMemo(
    () => filters.find((f) => f.field === filterId) as IFilter,
    [filterId, filters],
  );


  const validateConditions = useCallback((filterConditions: IStateFilter[]): boolean => {
    if (filterSetting.validate) {
      const conditionsForValidation = filterConditions.filter(({ condition }) => (
        condition && filterSetting.conditions[condition]?.hasValue
      ));
      const filterValidationErrors = filterSetting.validate(conditionsForValidation);

      setValidationErrors(filterValidationErrors);

      if (!isEmpty(filterValidationErrors)) {
        return false;
      }
    }

    return true;
  }, [filterSetting]);

  const onOpenDropdown = useCallback(() => {
    if (isAutoSelectFirstCondition) {
      if (conditions.length === 1 && !conditions[0].condition) {
        onChangeFilter({
          field: 'condition',
          value: Object.keys(filterSetting.conditions)[0],
          guid: conditions[0].key,
        });
      }
    }

    setIsOpen(true);
  }, [isAutoSelectFirstCondition, conditions, filterSetting.conditions, onChangeFilter]);

  const onCloseDropdown = useCallback(() => {
    const isValidConditions = validateConditions(conditions);

    if (isValidConditions) {
      setIsOpen(false);
    }
  }, [conditions, validateConditions]);

  const onChangeTagCondition = useCallback((changes: IPayloadChangeFilter) => {
    if (filterSetting.validate) {
      const newValidationErrors = { ...validationErrors };
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete newValidationErrors[changes.guid];
      setValidationErrors(newValidationErrors);
    }

    onChangeFilter(changes);
  }, [filterSetting.validate, onChangeFilter, validationErrors]);

  const onTagApply = useCallback(() => {
    const isValidConditions = validateConditions(conditions);

    if (isValidConditions) {
      setIsOpen(!isOpen);
      onApply();
    }
  }, [conditions, validateConditions, isOpen, onApply]);

  const onTagRemove = useCallback((e: MouseEvent<any>) => {
    e.stopPropagation();

    if (!disabled) {
      onRemoveFilter({ name: filterId });
    }
  }, [disabled, filterId, onRemoveFilter]);

  const onTagAddCondition = useCallback(() => {
    onAddCondition(filterId);
  }, [filterId, onAddCondition]);


  return (
    <Dropdown
      isOpen={ isOpen }
      onClose={ onCloseDropdown }
      target={ (
        <Button
          postfix={ (
            <>
              { isOpen ? <ChevronUp /> : <ChevronDown /> }
              <RemoveButton onClick={ onTagRemove }>
                <Remove />
              </RemoveButton>
            </>
          ) }
          appearance="filter-tag"
          selected={ isOpen }
          disabled={ disabled }
          onClick={ onOpenDropdown }
        >
          { `${filterSetting.displayName}` }
        </Button>
      ) }
    >
      <TagConditions>
        {
          conditions.map((condition) => (
            <TagCondition
              key={ condition.key }
              currentFilterState={ condition }
              filterSetting={ filterSetting }
              validationError={ validationErrors[condition.key] }
              onChangeFilter={ onChangeTagCondition }
              onRemoveFilter={ onRemoveFilter }
            />
          ))
        }

        <DropdownFooter>
          <ButtonBlock position="left">
            <Button
              appearance="filter-tag-add-condition"
              onClick={ onTagAddCondition }
            >
              Add condition
            </Button>
          </ButtonBlock>
          <ButtonBlock>
            <Button
              appearance="filter-tag-remove"
              baseAppearance="link"
              onClick={ onTagRemove }
            >
              Remove
            </Button>

            <Button
              appearance="filter-tag-apply"
              baseAppearance="primary"
              onClick={ onTagApply }
            >
              Apply
            </Button>
          </ButtonBlock>
        </DropdownFooter>
      </TagConditions>
    </Dropdown>
  );
};
