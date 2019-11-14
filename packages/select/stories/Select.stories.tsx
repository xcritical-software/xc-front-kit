/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved
import Select from '../src';

import { MasterCardIcon } from './MasterCardIcon';
import { customTheme } from './customThemes';


const items = {
  firstCard: {
    name: '1234 1234 1234 1234',
    prefix: <MasterCardIcon />,
  },
  secondCard: {
    name: '4321 4321 4321 4321',
    prefix: <MasterCardIcon />,
  },
  thirdCard: {
    name: '4567 4567 4567 4567',
    prefix: <MasterCardIcon />,
  },
  fourthCard: {
    name: '0123 0123 0123 0123',
    prefix: <MasterCardIcon />,
  },
};
const items2 = {
  firstCard: {
    name: '111111111111111111',
    prefix: <MasterCardIcon />,
  },
  secondCard: {
    name: '222222222222222222',
    prefix: <MasterCardIcon />,
  },
  thirdCard: {
    name: '333333333333333333',
    prefix: <MasterCardIcon />,
  },
  fourthCard: {
    name: '444444444444444444',
    prefix: <MasterCardIcon />,
  },
};

const ChangeItems = () => {
  const [isFirstItems, changeIsFirstItems] = useState(true);
  return (
    <>
      <button style={ { width: '60px', height: '38px', margin: '10px' } } onClick={ () => changeIsFirstItems(true) }>One</button>
      <button style={ { width: '60px', height: '38px', margin: '20px ' } } onClick={ () => changeIsFirstItems(false) }>Two</button>
      <Select items={ isFirstItems ? items : items2 } />
    </>
  );
};


storiesOf('Select', module)
  .add('Basic', () => (
    <>
      <Select items={ items } />
      <Select isSearchable textPosition="left" items={ items } />
    </>
  ))
  .add('Empty', () => (
    <Select />
  ))
  .add('With value and clear icon', () => (
    <Select isClearable value="thirdCard" items={ items } />
  ))
  .add('Themed', () => (
    <Select theme={ customTheme } textPosition="left" items={ items } />
  ))
  .add('RTL Support', () => (
    <Select theme={ customTheme } isRTL textPosition="left" items={ items } />
  ))
  .add('Disabled', () => (
    <Select disabled textPosition="left" items={ items } />
  ))
  .add('Autocomplete', () => (
    <Select isSearchable textPosition="left" items={ items } />
  ))
  .add('Multi Select', () => (
    <Select textPosition="left" items={ items } isMulti />
  ))
  .add('Change Items', () => (
    <ChangeItems />
  ));
