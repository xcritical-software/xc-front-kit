import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import {
  boolean, withKnobs, text, select,
} from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';

import { Switch } from '../src/Switch';
import { BaseSwitch } from '../src/interfaces';
import { defaultSwitchTheme, switchThemeNamespace } from '../src/theme';


const BasicSwitch: React.FC<BaseSwitch> = ({ theme: innerTheme, ...props }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handlerChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={ innerTheme }>
      <Switch onChange={ handlerChange } checked={ isChecked } { ...props } />
    </ThemeProvider>
  );
};

const theme = {
  appearance: {
    default: defaultSwitchTheme,
    customTheme: {
      container: {
        backgroundColor: 'red',
        checked: {
          backgroundColor: 'green',
        },
      },
    },
  },
};

storiesOf('Switch', module)
  .addDecorator(withKnobs)
  .add('Basic', () => (
    <BasicSwitch
      theme={ { [switchThemeNamespace]: theme } }
      disabled={ boolean('Disabled', false) }
      label={ text('Label', '') }
      labelPosition={ select('Label position', ['left', 'right'], 'right') }
    />
  ))
  .add('With Custom Theme', () => (
    <BasicSwitch
      theme={ { [switchThemeNamespace]: theme } }
      appearance="customTheme"
      disabled={ boolean('Disabled', false) }
      label={ text('Label', '') }
      labelPosition={ select('Label position', ['left', 'right'], 'right') }
    />
  ))
  .add('With Loading State', () => (
    <BasicSwitch
      theme={ { [switchThemeNamespace]: theme } }
      disabled={ boolean('Disabled', false) }
      loading={ boolean('Loading', true) }
      label={ text('Label', '') }
      labelPosition={ select('Label position', ['left', 'right'], 'right') }
    />
  ));
