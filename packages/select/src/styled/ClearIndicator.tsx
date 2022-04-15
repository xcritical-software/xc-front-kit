import React from 'react';
import { ClearIndicatorProps, components, GroupBase } from 'react-select';
import { CSSObject } from 'styled-components';

import { Close } from '../Icons';

const ClearIndicator = function <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: ClearIndicatorProps<Option, IsMulti, Group>) {
  const {
    getStyles,
    selectProps: { classNamePrefix },
  } = props;
  const clearIndicatorStyles = getStyles('clearIndicator', props) as CSSObject;

  return (
    <components.ClearIndicator {...props}>
      <Close
        className={classNamePrefix && `${classNamePrefix}__icon-close`}
        fill={clearIndicatorStyles.color}
      />
    </components.ClearIndicator>
  );
};

export default ClearIndicator;
