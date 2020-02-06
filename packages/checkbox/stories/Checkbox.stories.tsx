/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Checkbox, { checkboxThemeNamespace } from '../src';
import { CheckboxTheme, ICheckboxProps } from '../src/interfaces';
import { Check } from '../src/Icons';


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

const generateTheme = (
  padding: string,
  baseBgColor: string,
  textColor: string,
): CheckboxTheme => ({
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
});

const theme = generateTheme('2px', '#fff', '#000');

const BasicCheckbox = ({
  theme: innerTheme,
  label,
  checkIcon,
}: ICheckboxProps): React.ReactElement => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleChange = (): void => {
    setIsChecked(!isChecked);
  };

  return (
    <ThemeProvider theme={ innerTheme }>
      <Checkbox
        checked={ isChecked }
        onChange={ handleChange }
        label={ label }
        checkIcon={ checkIcon }
      />
    </ThemeProvider>
  );
};

storiesOf('Checkbox', module)
  .add('Basic', () => (
    <div>
      <GlobalStyle />
      <BasicCheckbox
        theme={ { [checkboxThemeNamespace]: theme } }
        label="Checkbox"
      />
    </div>
  ))
  .add('Custom Check Icon', () => (
    <div>
      <GlobalStyle />
      <BasicCheckbox
        theme={ { [checkboxThemeNamespace]: theme } }
        label="Custom Check Icon"
        checkIcon={ <Check /> }
      />
    </div>
  ));
