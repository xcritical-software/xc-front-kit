import React from 'react';
import { components } from 'react-select';

import { Close } from '../Icons';
import { ClearIndicatorProps } from '../interfaces';

const ClearIndicator = (props: ClearIndicatorProps) => {
  const {
    getStyles,
    selectProps: { classNamePrefix },
  } = props;
  const clearIndicatorStyles = getStyles('clearIndicator', props);

  return (
    components.ClearIndicator && (
      <components.ClearIndicator {...props}>
        <Close
          className={classNamePrefix && `${classNamePrefix}--icon-close`}
          fill={clearIndicatorStyles?.color}
        />
      </components.ClearIndicator>
    )
  );
};

export default ClearIndicator;
