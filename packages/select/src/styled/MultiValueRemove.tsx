import React from 'react';
import { components } from 'react-select';

import { Close } from '../Icons';
import { MultiValueRemoveProps } from '../interfaces';


const MultiValueRemove = (props: MultiValueRemoveProps) => (
  components.MultiValueRemove && (
    <components.MultiValueRemove { ...props }>
      <Close fill="inherit" size={ 8 } />
    </components.MultiValueRemove>
  )
);

export default MultiValueRemove;
