/* eslint-disable import/no-unresolved */
import React, { useState, ReactElement } from 'react';
import { SingleDatePicker } from 'react-dates';
import {
  ICreateElement,
  IElementProps,
  IDictionaryElementProps,
} from './interfaces';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Select from '../../select/src';


const DictionarySelector = ({
  name,
  dictionaries,
  value,
  handleChange,
  isEdit,
  inTag,
}: IDictionaryElementProps): ReactElement => {
  if (!isEdit) {
    return (
      <span>
        { dictionaries[name].find(({ id }: any) => +id === +value).name }
      </span>
    );
  }
  if (inTag) {
    return (
      <div style={ { width: '130px' } }>
        <Select
          items={ dictionaries[name].reduce(
            (acc: any, elem: any) => ({ ...acc, [elem.id]: { name: elem.name } }),
            {},
          ) }
          shouldFitContainer
          onChange={ handleChange }
          value={ value }
        />
      </div>
    );
  }
  return (
    <Select
      items={ dictionaries[name].reduce(
        (acc: any, elem: any) => ({ ...acc, [elem.id]: { name: elem.name } }),
        {},
      ) }
      shouldFitContainer
      onChange={ handleChange }
      value={ value }
    />
  );
};

const BooleanSelector = ({
  handleChange,
  value,
  isEdit,
}: IElementProps): ReactElement => {
  if (!isEdit) return <span>{ value }</span>;
  return (
    <select defaultValue="yes" onChange={ (e) => handleChange(e.target.value) }>
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
}: ICreateElement): Function | null => {
  switch (type) {
    case 'Enum':
      return ({
        handleChange, value, isEdit = true, inTag,
      }: IElementProps) => DictionarySelector({
        name,
        dictionaries,
        value,
        handleChange,
        isEdit,
        inTag,
      });
    case 'Boolean':
      return BooleanSelector;
    case 'Date':
      return DateSelector;
    default:
      return null;
  }
};
