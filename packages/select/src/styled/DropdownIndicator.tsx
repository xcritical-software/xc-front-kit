import React from 'react';
import { components } from 'react-select';

import { ChevronDown, ChevronUp } from '../Icons';
import { DropdownIndicatorProps } from '../interfaces';


const DropdownIndicator = (props: DropdownIndicatorProps) => {
  const { getStyles, selectProps } = props;
  const dropdownIndicatorStyles = getStyles('dropdownIndicator', props);

  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator { ...props }>
        {
          selectProps.menuIsOpen
            ? <ChevronUp fill={ dropdownIndicatorStyles?.color } />
            : <ChevronDown fill={ dropdownIndicatorStyles?.color } />
        }
      </components.DropdownIndicator>
    )
  );
};

export default DropdownIndicator;
