import React, {
  useState,
  useCallback,
  useMemo,
  MouseEvent,
} from 'react';

import Button from '@xcritical/button';

import { ITagProps, IFilter } from '../../interfaces';
import { Dropdown } from '../Dropdown';
import { ChevronDown, ChevronUp, Remove } from '../icons';
import { DropdownFooter, ButtonBlock, RemoveButton } from './styled';
import { TagCondition } from './TagConditions';


export const Tag: React.FC<ITagProps> = ({
  filterId,
  conditions,
  filters,
  disabled,
  onChangeFilter,
  onRemoveFilter,
  onAddCondition,
  onApply,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterSetting = useMemo(
    () => filters.find((f) => f.field === filterId) as IFilter,
    [filterId, filters],
  );


  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onTagApply = useCallback(() => {
    setIsOpen(!isOpen);
    onApply();
  }, [isOpen, onApply]);

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
      onClose={ toggleOpen }
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
          onClick={ toggleOpen }
        >
          { `${filterSetting.displayName}` }
        </Button>
      ) }
    >

      {
        conditions.map((condition) => (
          <TagCondition
            key={ condition.key }
            conditions={ filterSetting.conditions }
            onRemoveFilter={ onRemoveFilter }
            currentFilterState={ condition }
            filterSetting={ filterSetting }
            onChangeFilter={ onChangeFilter }
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
    </Dropdown>
  );
};
