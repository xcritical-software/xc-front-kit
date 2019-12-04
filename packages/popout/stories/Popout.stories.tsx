/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved
import Popout from '../src';

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

storiesOf('Popout', module)
  .add('Basic', () => (
    <>
      <Popout items={ items } />
    </>
  ))
  .add('Empty', () => (
    <Popout />
  ))
  .add('With value and clear icon', () => (
    <Popout isClearable value="thirdCard" items={ items } />
  ))
  .add('Themed', () => (
    <Popout theme={ customTheme } textPosition="left" items={ items } />
  ))
  .add('RTL Support', () => (
    <Popout theme={ customTheme } isRTL textPosition="left" items={ items } />
  ))
  .add('Disabled', () => (
    <Popout disabled textPosition="left" items={ items } />
  ));
