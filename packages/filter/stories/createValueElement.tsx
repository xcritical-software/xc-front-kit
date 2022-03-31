/* eslint-disable import/no-unresolved */
import React, { useState, ReactElement } from 'react';
import { SingleDatePicker } from 'react-dates';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Select from '../../select/src';

import { IDictionary } from './interfaces';

export const DictionarySelector =
  (dictionaries: IDictionary[]) =>
  (value: any, onChange: (value: any) => void): ReactElement =>
    (
      <Select
        options={dictionaries}
        shouldFitContainer
        onChange={onChange}
        value={value}
      />
    );

export const BooleanSelector = (
  value: any,
  onChange: (value: any) => void
): ReactElement => (
  <select defaultValue="yes" onChange={(e) => onChange(e.target.value)}>
    {!value && <option selected>Please select...</option>}
    <option key="yes" value="yes">
      Yes
    </option>
    <option key="no" value="no">
      No
    </option>
  </select>
);

export const DateSelector = (
  value: any,
  onChange: (value: any) => void
): ReactElement => {
  const [focus, changeFocus] = useState(false);
  const handleChangeFocus = (): void => {
    changeFocus(!focus);
  };

  return (
    <SingleDatePicker
      id="date_input"
      focused={focus}
      date={value}
      onDateChange={onChange}
      onFocusChange={handleChangeFocus}
      small
    />
  );
};
