import React from 'react';
import { components, GroupBase, MultiValueRemoveProps } from 'react-select';

import { Close } from '../Icons';

const MultiValueRemove = function <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: MultiValueRemoveProps<Option, IsMulti, Group>) {
  return (
    <components.MultiValueRemove {...props}>
      <Close fill="inherit" size={8} />
    </components.MultiValueRemove>
  );
};

export default MultiValueRemove;
