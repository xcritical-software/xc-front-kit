/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React from 'react';
import { components, DropdownIndicatorProps, GroupBase } from 'react-select';
import { CSSObject } from 'styled-components';

import { ChevronDown, ChevronUp } from '../Icons';

const DropdownIndicator = function <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  const { getStyles, selectProps } = props;
  const dropdownIndicatorStyles = getStyles(
    'dropdownIndicator',
    props
  ) as CSSObject;

  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {selectProps.menuIsOpen ? (
          <ChevronUp fill={dropdownIndicatorStyles?.color} />
        ) : (
          <ChevronDown fill={dropdownIndicatorStyles?.color} />
        )}
      </components.DropdownIndicator>
    )
  );
};

export default DropdownIndicator;
