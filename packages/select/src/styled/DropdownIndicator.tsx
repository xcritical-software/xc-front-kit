import React from 'react';
import { components } from 'react-select';

import { ChevronDown, ChevronUp } from '../Icons';
import { DropdownIndicatorProps } from '../interfaces';

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  const {
    getStyles,
    selectProps,
    selectProps: { classNamePrefix },
  } = props;
  const dropdownIndicatorStyles = getStyles('dropdownIndicator', props);

  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {selectProps.menuIsOpen ? (
          <ChevronUp
            className={classNamePrefix && `${classNamePrefix}--icon-chevron-up`}
            fill={dropdownIndicatorStyles?.color}
          />
        ) : (
          <ChevronDown
            className={
              classNamePrefix && `${classNamePrefix}--icon-chevron-down`
            }
            fill={dropdownIndicatorStyles?.color}
          />
        )}
      </components.DropdownIndicator>
    )
  );
};

export default DropdownIndicator;
