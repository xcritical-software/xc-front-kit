import React from 'react';
import { components } from 'react-select';

import { Close } from '../Icons';
import { MultiValueRemoveProps } from '../interfaces';

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  const {
    selectProps: { classNamePrefix },
  } = props;

  return (
    components.MultiValueRemove && (
      <components.MultiValueRemove {...props}>
        <Close
          className={classNamePrefix && `${classNamePrefix}--icon-close`}
          fill="inherit"
          size={8}
        />
      </components.MultiValueRemove>
    )
  );
};

export default MultiValueRemove;
