import React, {
  useState, useCallback, useMemo,
} from 'react';
import Button from '@xcritical/button';

import {
  Dropdown,
} from '../Dropdown';
import {
  DropdownFooter,
  ButtonBlock,
} from './styled';
import {
  ChevronDown,
  ChevronUp,
} from '../icons';
import { ITagProps, IFilter } from '../../interfaces';
import { TagCondition } from './TagConditions';


export const Tag: React.FC<ITagProps> = ({
  filterId,
  conditions,
  filters,
  onChangeFilter,
  onRemoveFilter,
  onAddCondition,
  onApply,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterSetting = useMemo(
    () => filters.find((f) => f.field === filterId) as IFilter,
    [filterId, filters],
  );


  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onTagApply = useCallback(
    () => {
      setIsOpen(!isOpen);
      onApply();
    }, [isOpen, onApply],
  );

  const onTagReset = useCallback(
    () => {
      setIsOpen(!isOpen);
      onReset();
    }, [isOpen, onReset],
  );

  const onTagAddCondition = useCallback(
    () => {
      onAddCondition(filterId);
    }, [filterId, onAddCondition],
  );

  return (
    <Dropdown
      isOpen={ isOpen }
      onClose={ toggleOpen }
      target={ (
        <Button
          postfix={ isOpen ? <ChevronUp /> : <ChevronDown /> }
          onClick={ toggleOpen }
          selected={ isOpen }
        >
          { `${filterSetting?.displayName}` }
        </Button>
      ) }
    >

      {
        conditions.map((condition) => (
          <TagCondition
            conditions={ filterSetting?.conditions }
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
            appearance="filter-add-button-appearance"
            onClick={ onTagAddCondition }
          >
          Add condition
          </Button>
        </ButtonBlock>
        <ButtonBlock>
          <Button
            appearance="filter-reset-button-appearance"
            onClick={ onTagReset }
          >
            Reset
          </Button>

          <Button
            appearance="filter-add-button-appearance"
            onClick={ onTagApply }
          >
            Apply
          </Button>
        </ButtonBlock>

      </DropdownFooter>
    </Dropdown>
  );
};
