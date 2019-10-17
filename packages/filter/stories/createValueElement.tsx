import React, { useState, ReactElement } from 'react';
import { SingleDatePicker } from 'react-dates';
import {
  IDictionary,
  ICreateElement,
  IElementProps,
  IDictionaryElementProps,
} from './interfaces';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


const Input = ({ handleChange, value }: IElementProps): ReactElement => (
  <input
    style={ { width: '100%' } }
    value={ value }
    onChange={ (e) => handleChange(e.target.value) }
  />
);

const DictionarySelector = ({
  name,
  dictionaries,
  value,
  handleChange,
}: IDictionaryElementProps): ReactElement => (
  <select onChange={ (e) => handleChange(e.target.value) }>
    { !value && <option selected>Please select...</option> }
    { dictionaries[name]
      && dictionaries[name].map(({ id, name: n }: IDictionary) => (
        <option key={ id } value={ id } selected={ +value === id }>
          { n }
        </option>
      )) }
  </select>
);

const BooleanSelector = ({
  handleChange,
  value,
}: IElementProps): ReactElement => (
  <select onChange={ (e) => handleChange(e.target.value) }>
    { !value && <option selected>Please select...</option> }
    <option key="yes" value="yes">
      Yes
    </option>
    <option key="no" value="no">
      No
    </option>
  </select>
);

const DateSelector = ({ handleChange, value }: any): ReactElement => {
  const [focus, changeFocus] = useState(false);
  const handleChangeFocus = (): void => {
    changeFocus(!focus);
  };

  return (
    <SingleDatePicker
      id="date_input"
      focused={ focus }
      date={ value }
      onDateChange={ handleChange }
      onFocusChange={ handleChangeFocus }
      small
    />
  );
};

export const createElement = ({
  name,
  type,
  dictionaries,
}: ICreateElement): Function => {
  switch (type) {
    case 'String':
    case 'Numeric':
    case 'Currency':
      return Input;
    case 'Enum':
      return ({ handleChange, value }: IElementProps) => DictionarySelector({
        name,
        dictionaries,
        value,
        handleChange,
      });
    case 'Boolean':
      return BooleanSelector;
    case 'Date':
      return DateSelector;
    default:
      return Input;
  }
};
