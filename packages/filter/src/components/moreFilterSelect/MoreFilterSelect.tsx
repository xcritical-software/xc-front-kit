import React, { useState, useMemo, useCallback } from 'react';

import Select, { OptionTypeBase } from '@xcritical/select';
import Button from '@xcritical/button';

import { Dropdown } from '../Dropdown';
import { ChevronDown, ChevronUp, DropdownIndicator, Plus } from '../icons';
import {
  IMoreButtonWithFilterSelectorProps,
  IStateRecivedFilter,
  IFilter,
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
  children,
  filters,
  selectedFilters,
  disabled,
  isAutoOpenAddedTag,
  filterTheme,
  onChange,
  className,
  classNamePrefix,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { showedFilters, hiddenedFilters } = useMemo(() => {
    const $showedFilters: IFilter[] = [];
    const $hiddenedFilters: IFilter[] = [];

    filters.forEach((filter) => {
      if (filter.isHidden) {
        $hiddenedFilters.push(filter);
      } else {
        $showedFilters.push(filter);
      }
    });

    return {
      showedFilters: $showedFilters,
      hiddenedFilters: $hiddenedFilters,
    };
  }, [filters]);

  const filterItems = useMemo(
    () => convertFiltersToOptions(showedFilters),
    [showedFilters]
  );

  const selectedValueItems = useMemo(
    () => convertSelectedFiltersToOptions(selectedFilters, filterItems),
    [filterItems, selectedFilters]
  );

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onSelectChange = useCallback(
    (values: OptionTypeBase[]) => {
      const selected = values.map<IStateRecivedFilter>((item) => ({
        column: item.value,
        condition: '',
        value: '',
      }));

      const mappedHiddenedFilters = hiddenedFilters.map(
        ({ field: column }) => ({
          column,
          condition: '',
          value: '',
        })
      );

      onChange([...selected, ...mappedHiddenedFilters]);

      if (isAutoOpenAddedTag && values.length > selectedValueItems.length) {
        setIsOpen(false);
      }
    },
    [hiddenedFilters, onChange, isAutoOpenAddedTag, selectedValueItems]
  );

  return (
    <Dropdown
      className={className}
      classNamePrefix={classNamePrefix}
      isOpen={isOpen}
      onClose={toggleOpen}
      filterTheme={filterTheme}
      target={
        <Button
          className={`${classNamePrefix}-more__button`}
          appearance="filters-more"
          baseAppearance="link"
          selected={isOpen}
          disabled={disabled}
          postfix={isOpen ? <ChevronUp /> : <ChevronDown />}
          prefix={<Plus />}
          onClick={toggleOpen}>
          {children}
        </Button>
      }>
      <Select
        autoFocus
        className={`${classNamePrefix}-more__select`}
        classNamePrefix={`${classNamePrefix}-more-select`}
        appearance="filters-more"
        backspaceRemovesValue={false}
        components={{ DropdownIndicator, IndicatorSeparator: null }}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        isSearchable
        menuIsOpen
        isMulti
        onChange={onSelectChange}
        options={filterItems}
        placeholder="Search..."
        styles={selectStyles}
        tabSelectsValue={false}
        value={selectedValueItems}
      />
    </Dropdown>
  );
};
