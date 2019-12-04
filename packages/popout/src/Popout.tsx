import React, { useState } from 'react';
import Button from '@xcritical/button';
import Select, { SelectProps } from '@xcritical/select';
import get from 'lodash.get';
import {
  Dropdown, ChevronDown, ChevronUp, DropdownIndicator,
} from './styled';


const selectStyles = {
  control: (provided: any) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
};

const Popout: React.FC<SelectProps> = ({
  disabled,
  items,
  theme = {},
}) => {
  const [stateValue, setStateValue] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);


  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const onSelectChange = (value: any) => {
    toggleOpen();
    setStateValue(get(items, [value]));
  };

  return (
    <Dropdown
      isOpen={ isOpen }
      onClose={ toggleOpen }
      target={ (
        <Button
          disabled={ disabled }
          baseAppearance="test-1"
          appearance="test-2"
          postfix={ isOpen ? <ChevronUp /> : <ChevronDown /> }
          prefix={ stateValue ? stateValue.prefix : null }
          onClick={ toggleOpen }
          selected={ isOpen }
          theme={ theme }
        >
          { stateValue ? stateValue.name : 'Select a State' }
        </Button>
      ) }
    >
      <Select
        autoFocus
        backspaceRemovesValue={ false }
        components={ { DropdownIndicator, IndicatorSeparator: null } }
        controlShouldRenderValue={ false }
        hideSelectedOptions={ false }
        isClearable={ false }
        isSearchable
        menuIsOpen
        onChange={ onSelectChange }
        items={ items }
        placeholder="Search..."
        styles={ selectStyles }
        tabSelectsValue={ false }
        value={ stateValue }
      />
    </Dropdown>
  );
};

export default Popout;
