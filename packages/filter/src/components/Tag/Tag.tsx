import React, {
  useState, useCallback, useMemo,
} from 'react';
import Button from '@xcritical/button';

import {
  Dropdown,
  DropdownButtons,
} from '..';
import {
  ChevronDown,
  ChevronUp,
} from '../icons';
import { ICompactFilterTag, IFilter } from '../../interfaces';
import { TagCondition } from './TagConditions';


export const Tag: React.FC<ICompactFilterTag> = ({
  filterId,
  conditions,
  filters,
  onChangeFilter,
  onRemoveFilter,
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
            conditions={ filterSetting.conditions }
            onRemoveFilter={ onRemoveFilter }
            currentFilterState={ condition }
            filterSetting={ filterSetting }
            onChangeFilter={ onChangeFilter }
          />
        ))
      }

      <DropdownButtons>
        <Button
          appearance="filter-add-button-appearance"
          onClick={ onTagApply }
        >
          Apply
        </Button>
        <Button
          appearance="filter-reset-button-appearance"
          onClick={ onTagReset }
        >
          Reset
        </Button>
      </DropdownButtons>
    </Dropdown>
  );
};
