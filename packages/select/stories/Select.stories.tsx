/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved
import Select from '@xcritical-old/xc-select';

import { MasterCardIcon } from './MasterCardIcon';
import { customTheme } from './customThemes';


const items = {
  firstCard: {
    name: '1234 1234 1234 1234',
    icon: <MasterCardIcon />,
  },
  secondCard: {
    name: '4321 4321 4321 4321',
    icon: <MasterCardIcon />,
  },
  thirdCard: {
    name: '4567 4567 4567 4567',
    icon: <MasterCardIcon />,
  },
  fourthCard: {
    name: '0123 0123 0123 0123',
    icon: <MasterCardIcon />,
  },
};

storiesOf('Select', module)
  .add('Basic', () => (
    <Select items={ items } />
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
    <Select theme={ customTheme } isSearchable textPosition="left" items={ items } />
  ))
  .add('Multi Select', () => (
    <Select theme={ customTheme } textPosition="left" items={ items } isMulti />
  ));
