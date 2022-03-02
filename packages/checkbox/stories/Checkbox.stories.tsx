/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { action } from '@storybook/addon-actions';

import Checkbox, { SwitchGroup, checkboxThemeNamespace } from '../src';
import { CheckboxTheme, ICheckboxProps, IOption } from '../src/interfaces';
import { Check } from '../src/Icons';

const groupOptions = [
  {
    value: '1',
    label: 'Monday',
  },
  {
    value: '2',
    label: 'Tuesday',
  },
  {
    value: '3',
    label: 'Wednesday',
  },
  {
    value: '4',
    label: 'Thursday',
  },
  {
    value: '5',
    label: 'Friday',
  },
  {
    value: '6',
    label: 'Saturday',
  },
  {
    value: '7',
    label: 'Sunday',
  },
];

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    margin: 0;
  }
  
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;

const TextBlock = styled.div`
  margin-top: 15px;
  margin-left: 15px;
`;

const generateTheme = (
  padding: string,
  baseBgColor: string,
  textColor: string
): CheckboxTheme => ({
  appearance: {
    default: {
      checkboxLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
      },
      checkboxWrapper: {
        backgroundColor: baseBgColor,
        paddingBottom: padding,
        paddingLeft: padding,
        paddingRight: padding,
        paddingTop: padding,
        margin: '10px',
        borderRadius: padding,
        color: textColor,
        border: '1px solid rgba(0, 0, 0, 0.3)',
      },
      checkbox: {
        backgroundColor: textColor,
        borderRadius: '4px',
        width: '16px',
        height: '16px',
      },
    },
    customCheckbox: {
      checkboxLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: 'red',
      },
      checkboxWrapper: {
        backgroundColor: baseBgColor,
        color: textColor,
        border: '1px solid red',
      },
      checkbox: {
        backgroundColor: 'red',
      },
    },
    customRadio: {
      checkboxLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: 'blue',
      },
      checkboxWrapper: {
        backgroundColor: baseBgColor,
        paddingBottom: '3px',
        paddingLeft: '3px',
        paddingRight: '3px',
        paddingTop: '3px',
        margin: '10px',
        borderRadius: '8px',
        color: textColor,
        border: '1px solid blue',
      },
      checkbox: {
        backgroundColor: 'blue',
        borderRadius: '4px',
        width: '8px',
        height: '8px',
      },
    },
    horizontal: {
      checkboxLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: 'gray',
      },
      checkboxWrapper: {
        backgroundColor: baseBgColor,
        paddingBottom: padding,
        paddingLeft: padding,
        paddingRight: padding,
        paddingTop: padding,
        margin: '10px',
        borderRadius: padding,
        color: textColor,
        border: '1px solid green',
      },
      checkbox: {
        backgroundColor: 'green',
        borderRadius: '4px',
        width: '14px',
        height: '14px',
      },
      switchGroupWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '10px',
        paddingBottom: '10px',
      },
    },
  },
});

const theme = generateTheme('2px', '#fff', '#000');

const BasicCheckbox = ({
  theme: innerTheme,
  appearance,
  type,
  label,
  checkIcon,
  disabled = false,
}: ICheckboxProps): React.ReactElement => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleChange = (checked: boolean): void => {
    setIsChecked(checked);
    action('handleChange')(isChecked, checked);
  };

  return (
    <ThemeProvider theme={innerTheme}>
      <Checkbox
        appearance={appearance}
        type={type}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        label={label}
        checkIcon={checkIcon}
        className="at-checkbox-root"
        classNamePrefix="at-checkbox"
      />
    </ThemeProvider>
  );
};

const BasicSwitchGroup = ({
  type,
  theme: innerTheme,
  appearance,
  options,
  disabled = false,
  withAllGroup = false,
}): React.ReactElement => {
  const [values, setValues] = React.useState([options[0].value]);
  const [isAll, setIsAll] = React.useState(false);

  const handleChange = (value: (string | number)[]): void => {
    setValues(value);
    setIsAll(false);
  };

  const handleAllChange = React.useCallback(
    (checked: boolean) => {
      if (checked) {
        setValues(options.map((option: IOption) => option.value));
      } else {
        setValues([]);
      }

      setIsAll(checked);
    },
    [options]
  );

  return (
    <ThemeProvider theme={innerTheme}>
      {type === 'checkbox' && withAllGroup && (
        <Checkbox
          appearance={appearance}
          label="Choose all"
          checked={isAll}
          disabled={disabled}
          onChange={handleAllChange}
        />
      )}
      <SwitchGroup
        type={type}
        appearance={appearance}
        onChange={handleChange}
        options={options}
        values={values}
        disabled={disabled}
        className="at-switch-group"
        classNamePrefix="at-checkbox"
      />
    </ThemeProvider>
  );
};

storiesOf('Checkbox', module)
  .add('Basic', () => (
    <div>
      <GlobalStyle />
      <BasicCheckbox
        theme={{ [checkboxThemeNamespace]: theme }}
        label="Checkbox"
      />
    </div>
  ))
  .add('Custom Check Icon', () => (
    <div>
      <GlobalStyle />
      <BasicCheckbox
        theme={{ [checkboxThemeNamespace]: theme }}
        label="Custom Check Icon"
        checkIcon={<Check className="at-check" />}
      />
    </div>
  ))
  .add('Radio', () => (
    <div>
      <GlobalStyle />
      <BasicCheckbox
        theme={{ [checkboxThemeNamespace]: theme }}
        label="Radio"
        type="radio"
      />
    </div>
  ))
  .add('Radio Group', () => (
    <div>
      <GlobalStyle />
      <BasicSwitchGroup
        theme={{ [checkboxThemeNamespace]: theme }}
        type="radio"
        options={groupOptions}
        appearance="default"
      />
    </div>
  ))
  .add('Checkbox Group', () => (
    <div>
      <GlobalStyle />
      <BasicSwitchGroup
        theme={{ [checkboxThemeNamespace]: theme }}
        type="checkbox"
        options={groupOptions}
        appearance="default"
      />
    </div>
  ))
  .add('Checkbox Group With All Switcher', () => (
    <div>
      <GlobalStyle />
      <BasicSwitchGroup
        theme={{ [checkboxThemeNamespace]: theme }}
        type="checkbox"
        options={groupOptions}
        appearance="default"
        withAllGroup
      />
    </div>
  ))
  .add('Disabled Checkbox', () => (
    <div>
      <GlobalStyle />
      <BasicCheckbox
        theme={{ [checkboxThemeNamespace]: theme }}
        label="Disabled Checkbox"
        disabled
      />
    </div>
  ))
  .add('Prevent bubbling', () => (
    <div onClick={action('bubbling')}>
      <GlobalStyle />
      <BasicCheckbox
        theme={{ [checkboxThemeNamespace]: theme }}
        label="Checkbox"
      />
    </div>
  ))
  .add('Themed', () => (
    <div>
      <GlobalStyle />
      <BasicCheckbox
        theme={{ [checkboxThemeNamespace]: theme }}
        label="Themed Checkbox"
        appearance="customCheckbox"
      />
      <div>
        <BasicCheckbox
          theme={{ [checkboxThemeNamespace]: theme }}
          label="Themed Radio"
          type="radio"
          appearance="customRadio"
        />
      </div>
      <TextBlock>Themed Radio Group</TextBlock>
      <BasicSwitchGroup
        theme={{ [checkboxThemeNamespace]: theme }}
        type="radio"
        options={groupOptions}
        appearance="customRadio"
      />
      <TextBlock>Themed Checkbox Group</TextBlock>
      <BasicSwitchGroup
        theme={{ [checkboxThemeNamespace]: theme }}
        type="checkbox"
        options={groupOptions}
        appearance="horizontal"
      />
    </div>
  ));
