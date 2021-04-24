/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { darken, mix } from 'polished';
import { action } from '@storybook/addon-actions';

import InlineEdit from '@xcritical/inline-edit';

import PureInput from '@xcritical/input';

import Item, { ItemGroup, itemThemeNamespace } from '../src';

import { ItemTheme } from '../src/interfaces';

import { MasterCardIcon } from './Icons';


const generateTheme = (
  padding: number,
  baseBgColor: string,
  textColor: string,
  focusColor: string,
  dividedColor: string,
): ItemTheme => ({
  appearance: {
    default: {
      wrapper: {
        overflow: 'inherit',
        width: '100%',
      },
      contentWrapper: {
        overflow: 'inherit',
        width: '100%',
      },
    },
    myaccount: {
      prefixSpacing: padding,
      postfixSpacing: padding,
      borderRadius: 0,
      cursor: 'help',
      width: '100%',
      focus: {
        outline: focusColor || '',
      },
      divided: {
        color: dividedColor,
      },
      padding: {
        bottom: padding,
        left: padding,
        right: padding,
        top: padding,
      },

      background: baseBgColor,
      color: textColor,
      fontWeight: 600,
      hover: {
        background: darken(0.05, baseBgColor),
        color: '#fff',
        fontWeight: 600,
      },
      selected: {
        background: darken(0.05, baseBgColor),
        color: textColor,
        fontWeight: 600,
      },
      active: {
        background: darken(0.1, baseBgColor),
        color: textColor,
        fontWeight: 600,
      },
      disabled: {
        cursor: 'wait',
        background: baseBgColor,
        color: mix(0.5, baseBgColor, textColor),
        fontWeight: 900,
      },
    },
  },

});

const theme = generateTheme(0, '#575857', '#A7A7A7', '#E6E5E9', '#4D4D4D');


storiesOf('Item', module)
  .add('Basic', () => (
    <div>
      <ItemGroup divided>
        <Item
          onClick={ action('item-first-click') }
          value={ { id: 1 } }
          prefix={ <MasterCardIcon /> }
        >
          This is just a standard item
        </Item>
        <Item
          prefix={ <MasterCardIcon /> }
          postfix={ <MasterCardIcon /> }
        >
          This is just a standard item
        </Item>
        <Item>This is just a standard item</Item>
      </ItemGroup>
      <ItemGroup>
        <Item disabled>This is just a standard item</Item>
        <Item selected>This is just a standard item</Item>
        <Item selected disabled>This is just a standard item</Item>
        <Item>This is just a standard item</Item>
      </ItemGroup>
    </div>
  ))
  .add('Themed', () => {
    const [value, setValue] = React.useState('');

    const getReadView = React.useCallback(() => (
      <div>
        { value || 'Click to enter value' }
      </div>
    ), [value]);

    const getEditView = React.useCallback((fieldProps) => (
      <PureInput
        { ...fieldProps }
        autoFocus
        shouldFitContainer
      />
    ), []);

    const handleConfirm = React.useCallback((v: string) => {
      setValue(v);
    }, []);

    return (
      <ThemeProvider theme={ { [itemThemeNamespace]: theme } }>
        <div>
          <ItemGroup divided appearance="myaccount">
            <Item prefix={ <MasterCardIcon /> }>This is just a standard item</Item>
            <Item
              prefix={ <MasterCardIcon /> }
              postfix={ <MasterCardIcon /> }
            >
              This is just a standard item
            </Item>
            <Item>This is just a standard item</Item>
          </ItemGroup>
          <ItemGroup appearance="myaccount">
            <Item>This is just a standard item</Item>
            <Item disabled>This is just a standard item</Item>
            <Item selected disabled>This is just a standard item</Item>
            <Item
              prefix={ <MasterCardIcon /> }
              postfix={ <MasterCardIcon /> }
              isRTL
            >
              This is just a standard item with RTL

            </Item>
          </ItemGroup>

        </div>
        <Item>
          <InlineEdit
            value={ value }
            readView={ getReadView }
            editView={ getEditView }
            onConfirm={ handleConfirm }
          />
        </Item>
      </ThemeProvider>
    );
  });
