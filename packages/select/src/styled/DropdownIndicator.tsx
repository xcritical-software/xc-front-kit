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
  const {
    getStyles,
    selectProps,
    selectProps: { classNamePrefix },
  } = props;
  const dropdownIndicatorStyles = getStyles(
    'dropdownIndicator',
    props
  ) as CSSObject;

  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {selectProps.menuIsOpen ? (
          <ChevronUp
            className={classNamePrefix as string && `${classNamePrefix}--icon-chevron-up`}
            fill={dropdownIndicatorStyles?.color}
          />
        ) : (
          <ChevronDown
            className={
              classNamePrefix as string && `${classNamePrefix}--icon-chevron-down`
            }
            fill={dropdownIndicatorStyles?.color}
          />
        )}
      </components.DropdownIndicator>
    )
  );
};

export default DropdownIndicator;
