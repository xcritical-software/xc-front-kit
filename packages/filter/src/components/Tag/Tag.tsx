import React, {
  useState, useCallback, useMemo, useRef,
} from 'react';
import Button from '@xcritical/button';
import { OptionTypeBase } from 'react-select';

import {
  Dropdown,
  DropdownItem,
  DropdownButtons,
} from '..';
import {
  ChevronDown,
  ChevronUp,
} from '../icons';
import { IFilterTag } from '../../interfaces';
import { ConditionSelect } from '../conditionSelect';
import { FilterValueElement } from '../filterElement';


export const Tag: React.FC<IFilterTag> = ({
  filter,
  guid,
  filters,
  changeFilter,
  onApply,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const cachedFilterData = useRef(filters.find((f) => f.field === filter.column));
  const currentFilter = useMemo(() => {
    if (
      (filter.column && !cachedFilterData.current)
      || (cachedFilterData?.current?.field !== filter.column)
    ) {
      cachedFilterData.current = filters.find((f) => f.field === filter.column);
    }

    return cachedFilterData.current;
  }, [filter, filters]);

  const onChangeCondition = useCallback(
    ({ value }: OptionTypeBase) => {
      changeFilter({ field: 'condition', value, guid });
    }, [changeFilter, guid],
  );


  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onChangeValue = useCallback(
    (value: any) => {
      changeFilter({ field: 'value', value, guid });
    }, [changeFilter, guid],
  );


  const { displayName = '', conditions } = currentFilter || {};

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
          { `${displayName} ${conditions?.[filter.condition]?.name || ''} ${filter.value}` }
        </Button>
      ) }
    >
      <DropdownItem>
        <ConditionSelect
          onChange={ onChangeCondition }
          currentFilter={ currentFilter }
          filterData={ filter }
          key={ filter.condition }
        />
      </DropdownItem>

      <DropdownItem>
        <FilterValueElement
          onChange={ onChangeValue }
          currentFilter={ currentFilter }
          filterData={ filter }
          key={ filter.column }
        />
      </DropdownItem>

      <DropdownButtons>
        <Button
          appearance="filter-add-button-appearance"
          onClick={ onApply }
        >
            Apply
        </Button>
        <Button
          appearance="filter-reset-button-appearance"
          onClick={ onReset }
        >
            Reset
        </Button>
      </DropdownButtons>
    </Dropdown>
  );
};
