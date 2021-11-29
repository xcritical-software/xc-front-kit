import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, withKnobs, text, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';

import { Switch } from '../src/Switch';
import { BaseSwitch } from '../src/interfaces';
import { switchThemeNamespace } from '../src/theme';

const BasicSwitch: React.FC<BaseSwitch> = ({ theme: innerTheme, ...props }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handlerChange = useCallback(() => {
    setIsChecked((prevState) => !prevState);
  }, [setIsChecked]);

  return (
    <ThemeProvider theme={innerTheme}>
      <Switch onChange={handlerChange} checked={isChecked} {...props} />
    </ThemeProvider>
  );
};

const emptyTheme = {};

const theme = {
  appearance: {
    customTheme: {
      container: {
        backgroundColor: 'red',
        checked: {
          backgroundColor: 'green',
        },
      },
    },
    mini: {
      container: {
        backgroundColor: 'rgb(50 67 78)',
        borderRadius: 5,
        width: 20,
        height: 4,
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
        backgroundColor: 'rgb(121 131 138)',
        checked: {
          left: '100%',
          backgroundColor: 'rgb(64, 172, 173)',
        },
      },
    },
    myAccount: {
      container: {
        margin: '0 9px',
        backgroundColor: 'rgb(161 161 161 / 35%)',
        borderRadius: 100,
        width: 19,
        height: 8,
        disabled: {
          opacity: 0.4,
        },
        checked: {
          backgroundColor: 'rgb(45 148 243 / 25%)',
        },
      },
      handle: {
        width: 18,
        height: 18,
        top: 0,
        bottom: 0,
        left: 0,
        transform: 'translateX(-50%)',
        backgroundColor: 'rgb(161 161 161)',
        checked: {
          left: '100%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgb(44 143 238)',
        },
      },
    },
  },
};

storiesOf('Switch', module)
  .addDecorator(withKnobs)
  .add('Basic', () => (
    <BasicSwitch
      theme={emptyTheme}
      disabled={boolean('Disabled', false)}
      label={text('Label', 'Test Label')}
      labelPosition={select('Label position', ['left', 'right'], 'right')}
      className="at-custom-class"
    />
  ))
  .add('With Custom Theme', () => (
    <>
      <BasicSwitch
        theme={{ [switchThemeNamespace]: theme }}
        appearance="customTheme"
        disabled={boolean('Disabled', false)}
        label={text('Label', 'Test Label')}
        labelPosition={select('Label position', ['left', 'right'], 'right')}
      />
      <br />
      <BasicSwitch
        theme={{ [switchThemeNamespace]: theme }}
        appearance="mini"
        disabled={boolean('Disabled', false)}
        label={text('Label', 'Test Label')}
        labelPosition={select('Label position', ['left', 'right'], 'right')}
      />
      <br />
      <BasicSwitch
        theme={{ [switchThemeNamespace]: theme }}
        appearance="myAccount"
        disabled={boolean('Disabled', false)}
        label={text('Label', 'Test Label')}
        labelPosition={select('Label position', ['left', 'right'], 'right')}
      />
    </>
  ));
