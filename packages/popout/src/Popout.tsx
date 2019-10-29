import React, { Component, useState } from 'react';
import Button from '@xc-front-kit/button';

import Select from '@xc-front-kit/select';
import { Dropdown, ChevronDown } from './styled';


const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
};

const PopoutExample = ({
  items: any,
}: any) => {
  const [stateValue, setStateValue] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);


  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const onSelectChange = (value: any) => {
    toggleOpen();
    setStateValue(value);
  };

  return (
    <Dropdown
      isOpen={ isOpen }
      onClose={ toggleOpen }
      target={ (
        <Button
          iconAfter={ <ChevronDown /> }
          onClick={ toggleOpen }
          isSelected={ isOpen }
        >
          { stateValue ? `State: ${stateValue.label}` : 'Select a State' }
        </Button>
      ) }
    >
      <Select
        autoFocus
        backspaceRemovesValue={ false }
        components={ { IndicatorSeparator: null } }
        controlShouldRenderValue={ false }
        hideSelectedOptions={ false }
        isClearable={ false }
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

export default PopoutExample;
