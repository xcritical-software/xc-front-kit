/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved
import Select from '../src';

import { MasterCardIcon } from './MasterCardIcon';
import { customTheme } from './customThemes';


const options = [
  { value: 'firstCard', label: '1234 1234 1234 1234', prefix: <MasterCardIcon /> },
  { value: 'secondCard', label: '4321 4321 4321 4321', prefix: <MasterCardIcon /> },
  { value: 'thirdCard', label: '4567 4567 4567 4567', prefix: <MasterCardIcon /> },
  { value: 'fourthCard', label: '0123 0123 0123 0123', prefix: <MasterCardIcon /> },
];

const options2 = [
  { value: 'firstCard', label: '111111111111111111', prefix: <MasterCardIcon /> },
  { value: 'secondCard', label: '222222222222222222', prefix: <MasterCardIcon /> },
  { value: 'thirdCard', label: '333333333333333333', prefix: <MasterCardIcon /> },
  { value: 'fourthCard', label: '444444444444444444', prefix: <MasterCardIcon /> },
];


const ChangeItems = () => {
  const [isFirstItems, changeIsFirstItems] = useState(true);
  return (
    <>
      <button style={ { width: '60px', height: '38px', margin: '10px' } } onClick={ () => changeIsFirstItems(true) }>One</button>
      <button style={ { width: '60px', height: '38px', margin: '20px ' } } onClick={ () => changeIsFirstItems(false) }>Two</button>
      <Select items={ isFirstItems ? options : options2 } />
    </>
  );
};


storiesOf('Select', module)
  .add('Basic', () => (
    <>
      <Select options={ options } />
      <Select isSearchable textPosition="left" options={ options } />
    </>
  ))
  .add('Empty', () => (
    <Select />
  ))
  .add('Themed', () => (
    <Select theme={ customTheme } textPosition="left" options={ options } />
  ))
  .add('RTL Support', () => (
    <Select theme={ customTheme } isRTL textPosition="left" options={ options } />
  ))
  .add('Disabled', () => (
    <Select disabled textPosition="left" options={ options } />
  ))
  .add('Autocomplete', () => (
    <Select isSearchable textPosition="left" options={ options } />
  ))
  .add('Multi Select', () => (
    <Select textPosition="left" options={ options } isMulti />
  ))
  .add('Change Items', () => (
    <ChangeItems />
  ))
  .add('With default option', () => (

    <Select isSearchable isClearable defaultValue={ options[2] } options={ options } />
  ))
  .add('Only default option', () => (
    <Select isSearchable isClearable defaultValue={ options[3] } />

  ));
