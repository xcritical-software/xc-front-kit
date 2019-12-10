import React, { useState, useMemo, useCallback } from 'react';
import Button from '@xcritical/button';
import Select from '@xcritical/select';
import { OptionTypeBase } from 'react-select';

import {
  Dropdown,
} from '../Dropdown';

import {
  ChevronDown,
  ChevronUp,
  DropdownIndicator,
  Plus,
} from '../icons';
import {
  IMoreButtonWithFilterSelectorProps,
  IStateRecivedFilter,
} from '../../interfaces';
import {
  convertFiltersToOptions,
  convertSelectedFiltersToOptions,
} from '../../utils';


const selectStyles = {
  control: (provided: any) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
};

export const MoreFilterSelect: React.FC<IMoreButtonWithFilterSelectorProps> = ({
  filters,
  selectedFilters,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);


  const filterItems = useMemo(
    () => convertFiltersToOptions(filters),
    [filters],
  );

  const selectedValueItems = useMemo(
    () => convertSelectedFiltersToOptions(selectedFilters, filterItems),
    [filterItems, selectedFilters],
  );


  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onSelectChange = useCallback((value: OptionTypeBase[]) => {
    const selected = value.map<IStateRecivedFilter>((item) => ({
      column: item.value as string,
      condition: '',
      value: '',
    }));
    onChange(selected);
  }, [onChange]);

  return (
    <Dropdown
      isOpen={ isOpen }
      onClose={ toggleOpen }
      target={ (
        <Button
          appearance="filters-more"
          baseAppearance="link"
          postfix={ isOpen ? <ChevronUp /> : <ChevronDown /> }
          prefix={ <Plus /> }
          onClick={ toggleOpen }
          selected={ isOpen }
        >
          More
        </Button>
      ) }
    >
      <Select
        autoFocus
        backspaceRemovesValue={ false }
        components={ { DropdownIndicator, IndicatorSeparator: null } }
        controlShouldRenderValue={ false }
        hideSelectedOptions={ false }
        isClearable={ false }
        isSearchable
        menuIsOpen
        isMulti
        onChange={ onSelectChange }
        options={ filterItems }
        placeholder="Search..."
        styles={ selectStyles }
        tabSelectsValue={ false }
        value={ selectedValueItems }
      />
    </Dropdown>
  );
};
