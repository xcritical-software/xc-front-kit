import React, { useCallback, useState } from 'react';

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

  const handlerChange = useCallback(() => {
    setIsChecked((prevState) => !prevState);
  }, [setIsChecked]);

  return (
    <ThemeProvider theme={ innerTheme }>
      <Switch onChange={ handlerChange } checked={ isChecked } { ...props } />
    </ThemeProvider>
  );
};

const emptyTheme = {};

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
    mini: {
      label: {
        height: 4,
      },
      container: {
        backgroundColor: 'rgb(50 67 78)',
        borderRadius: 5,
        width: 20,
        checked: {
          backgroundColor: 'rgb(64 172 173 / 25%)',
        },
      },
      handle: {
        width: 12,
        height: 12,
        top: 0,
        bottom: 0,
        left: 0,
        checked: {
          left: '100%',
        },
      },
      handleItem: {
        backgroundColor: 'rgb(121 131 138)',
        checked: {
          backgroundColor: 'rgb(64, 172, 173)',
        },
      },
    },
  },
};

storiesOf('Switch', module)
  .addDecorator(withKnobs)
  .add('Basic', () => (
    <BasicSwitch
      theme={ emptyTheme }
      disabled={ boolean('Disabled', false) }
      label={ text('Label', 'Test Label') }
      labelPosition={ select('Label position', ['left', 'right'], 'right') }
    />
  ))
  .add('With Custom Theme', () => (
    <>
      <BasicSwitch
        theme={ { [switchThemeNamespace]: theme } }
        appearance="customTheme"
        disabled={ boolean('Disabled', false) }
        label={ text('Label', 'Test Label') }
        labelPosition={ select('Label position', ['left', 'right'], 'right') }
      />
      <br />
      <BasicSwitch
        theme={ { [switchThemeNamespace]: theme } }
        appearance="mini"
        disabled={ boolean('Disabled', false) }
        label={ text('Label', 'Test Label') }
        labelPosition={ select('Label position', ['left', 'right'], 'right') }
      />
    </>
  ));
