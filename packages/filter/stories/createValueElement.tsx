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


const Input = ({
  handleChange,
  value,
  isEdit,
}: IElementProps): ReactElement => {
  if (!isEdit) return <span>{ value }</span>;
  return (
    <input
      style={ { width: '100%' } }
      value={ value }
      onChange={ (e) => handleChange(e.target.value) }
    />
  );
};

const DictionarySelector = ({
  name,
  dictionaries,
  value,
  handleChange,
  isEdit,
}: IDictionaryElementProps): ReactElement => {
  if (!isEdit) {
    return (
      <span>
        { dictionaries[name]
          .find(({ id }: any) => +id === +value).name }
      </span>
    );
  }

  return (
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
};

const BooleanSelector = ({
  handleChange,
  value,
  isEdit,
}: IElementProps): ReactElement => {
  if (!isEdit) return <span>{ value }</span>;
  return (
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
};

const DateSelector = ({ handleChange, value, isEdit }: any): ReactElement => {
  const [focus, changeFocus] = useState(false);
  const handleChangeFocus = (): void => {
    changeFocus(!focus);
  };
  if (!isEdit) return <span>{ value ? value.format('YYYY MM DD') : null }</span>;

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
      return ({ handleChange, value, isEdit }: IElementProps) => DictionarySelector({
        name,
        dictionaries,
        value,
        handleChange,
        isEdit,
      });
    case 'Boolean':
      return BooleanSelector;
    case 'Date':
      return DateSelector;
    default:
      return Input;
  }
};
