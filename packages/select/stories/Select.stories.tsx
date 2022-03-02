/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';

// eslint-disable-next-line import/no-unresolved
import Select from '../src';

import { MasterCardIcon } from './MasterCardIcon';
import { customTheme } from './customThemes';

const options = [
  {
    value: 'firstCard',
    label: '1234 1234 1234 1234',
    prefix: <MasterCardIcon />,
  },
  {
    value: 'secondCard',
    label: '4321 4321 4321 4321',
    prefix: <MasterCardIcon />,
  },
  {
    value: 'thirdCard',
    label: '4567 4567 4567 4567',
    prefix: <MasterCardIcon />,
  },
  {
    value: 'fourthCard',
    label: '0123 0123 0123 0123',
    prefix: <MasterCardIcon />,
  },
];

const options2 = [
  {
    value: 'firstCard',
    label: '111111111111111111',
    prefix: <MasterCardIcon />,
  },
  {
    value: 'secondCard',
    label: '222222222222222222',
    prefix: <MasterCardIcon />,
  },
  {
    value: 'thirdCard',
    label: '333333333333333333',
    prefix: <MasterCardIcon />,
  },
  {
    value: 'fourthCard',
    label: '444444444444444444',
    prefix: <MasterCardIcon />,
  },
];

const options3 = [
  { value: 'firstCard', label: '1234 1234 1234 1234' },
  { value: 'secondCard', label: '4321 4321 4321 4321' },
  { value: 'thirdCard', label: '4567 4567 4567 4567', isDisabled: true },
  { value: 'fourthCard', label: '0123 0123 0123 0123' },
];

const options4 = [
  { value: 'firstCard', label: '111111111111111111', isDisabled: true },
  { value: 'secondCard', label: '222222222222222222' },
  { value: 'thirdCard', label: '333333333333333333' },
  { value: 'fourthCard', label: '444444444444444444' },
];

const groupOptions = [
  {
    label: 'first',
    options: options3,
  },
  {
    label: 'second',
    options: options4,
  },
];

const groupOptionsPrefix = [
  {
    label: 'third',
    options,
  },
  {
    label: 'forth',
    options: options2,
  },
];

const ChangeOptions = () => {
  const [isFirstOptions, changeIsFirstOptions] = useState(true);

  return (
    <>
      <button
        style={{ width: '60px', height: '38px', margin: '10px' }}
        onClick={() => changeIsFirstOptions(true)}>
        One
      </button>
      <button
        style={{ width: '60px', height: '38px', margin: '20px ' }}
        onClick={() => changeIsFirstOptions(false)}>
        Two
      </button>
      <Select options={isFirstOptions ? options : options2} />
    </>
  );
};

storiesOf('Select', module)
  .add('Basic', () => (
    <>
      <Select options={options} className="at-custom-class" />
      <Select
        isSearchable
        textPosition="left"
        options={options}
        className="at-select-root"
        classNamePrefix="at-select"
      />
    </>
  ))
  .add('Empty', () => <Select />)
  .add('Themed', () => (
    <Select theme={customTheme} textPosition="left" options={options} />
  ))
  .add('RTL Support', () => (
    <Select theme={customTheme} isRTL textPosition="left" options={options} />
  ))
  .add('Disabled', () => (
    <Select disabled textPosition="left" options={options} />
  ))
  .add('Autocomplete', () => (
    <Select isSearchable textPosition="left" options={options} />
  ))
  .add('Multi Select', () => (
    <Select textPosition="left" options={options} isMulti />
  ))
  .add('Change Options', () => <ChangeOptions />)
  .add('With default option', () => (
    <Select
      isSearchable
      isClearable
      defaultValue={options[2]}
      options={options}
    />
  ))
  .add('Only default option', () => (
    <Select isSearchable isClearable defaultValue={options[3]} />
  ))
  .add('With groups', () => (
    <>
      <span style={{ margin: '10px' }}>Default with disabled options:</span>
      <Select options={groupOptions} placeholder="Search.." />
      <span style={{ margin: '10px' }}>With prefix:</span>
      <Select options={groupOptionsPrefix} placeholder="Search.." />
    </>
  ))
  .add('Save input value and open after select value', () => {
    const [inputValue, setInputValue] = useState('');

    const onInputChange = useCallback((newInputValue, { action }) => {
      if (action === 'input-change') {
        setInputValue(newInputValue);
      }
    }, []);

    const onMenuClose = useCallback(() => {
      setInputValue('');
    }, []);

    return (
      <>
        <Select
          textPosition="left"
          options={options}
          isMulti
          inputValue={inputValue}
          onInputChange={onInputChange}
          isClearable
          isSearchable
          isCloseMenuOnSelect={false}
          onMenuClose={onMenuClose}
        />
      </>
    );
  });
