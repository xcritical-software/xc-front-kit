/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';

// eslint-disable-next-line import/no-unresolved
import { IThemeNamespace } from '@xcritical/theme';

import Select, { ISelectBaseTheme, selectThemeNamespace } from '../src';

import { MasterCardIcon } from './MasterCardIcon';

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

storiesOf('Select', module)
  .add('Basic', () => (
    <>
      <Select
        options={options}
        className="at-select-root"
        classNamePrefix="at-select"
      />
    </>
  ))
  .add('With Search', () => (
    <>
      <Select isSearchable options={options} />
    </>
  ))
  .add('Empty', () => <Select />)
  .add('Themed', () => {
    const customTheme: IThemeNamespace<ISelectBaseTheme> = {
      [selectThemeNamespace]: {
        appearance: {
          default: {
            fontSize: '13px',
            fontWeight: 600,
            paddingBottom: '11px',
            paddingLeft: '15px',
            paddingRight: '15px',
            paddingTop: '11px',
            divided: {
              color: '#4D4D4D',
            },
            background: 'linear-gradient(to top, #474747, #383838)',
            color: '#fff',

            border: {
              width: 1,
              style: 'solid',
              color: '#575857',
            },
            hover: {
              color: '#fff',
              background: 'linear-gradient(to top, #474747, #383838)',
            },
            active: {
              color: '#fff',

              background: 'linear-gradient(to top, #474747, #383838)',
            },

            dropdown: {
              background: '#575857',
              selected: {
                background: '#575857',
              },
              hover: {
                background: '#575857',
              },
            },
            dropdownList: {
              borderRadius: 6,
              padding: {
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
              },
            },
            button: {
              background: 'linear-gradient(to top, #474747, #383838)',
              paddingBottom: '11px',
              paddingLeft: '5px',
              paddingRight: '5px',
              paddingTop: '11px',
              hover: {
                background: 'linear-gradient(to top, #505050, #424242)',
              },
              focus: {
                boxShadow: 'none',
              },
              filled: {
                border: '1px solid darkorange',
              },
            },
            dropdownIndicator: {
              background: 'transparent',
              paddingBottom: 0,
              paddingLeft: '10px',
              paddingRight: '10px',
              paddingTop: 0,
            },
            input: {
              color: '#fff',
            },
            option: {
              background: '#575857',
              color: '#fff',
              hover: {
                background: 'linear-gradient(to top, #474747, #383838)',
              },
              selected: {
                background: 'linear-gradient(to top, #474747, #242424)',
              },
              focus: {
                background: 'linear-gradient(to top, #505050, #424242)',
              },
            },
            singleValue: {
              color: '#fff',
            },
          },
        },
      },
    };

    return <Select theme={customTheme} textPosition="left" options={options} />;
  })
  .add('RTL Support', () => (
    <Select isRTL textPosition="left" options={options} />
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
  .add('Change Options', () => {
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
  })
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
    );
  });
