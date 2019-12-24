/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { lighten } from 'polished';

import InlineEdit, { inlineEditThemeNamespace } from '../src';

import { InlineEditTheme } from '../src/interfaces';


const generateTheme = (
  baseBgColor: string,
  textColor: string,
): InlineEditTheme => ({
  backgroundColor: baseBgColor,
  color: textColor,
  borderRadius: 20,
  boxSizing: 'border-box',
  border: '2px solid transparent',
  display: 'inline-block',
  maxWidth: '100%',
  transition: 'background 0.2s',
  appearance: {
    default: {
      editButton: {
        appearance: 'none',
        background: 'transparent',
        border: 0,
        display: 'inline-block',
        lineHeight: 1,
        margin: 0,
        padding: 0,
        outline: 0,
        focus: {
          border: `2px solid ${lighten(0.6, baseBgColor)}`,
          backgroundColor: baseBgColor,
        },
      },
      actionButtonsWrapper: {
        display: 'flex',
        flexShrink: 0,
        marginTop: '10px',
        position: 'absolute',
        right: 0,
        top: '100%',
      },
      actionButtonWrapper: {
        backgroundColor: '#ccc',
        borderRadius: '10px',
        boxShadow: '0 5px 5px -5px black, 0 0 1px black',
        boxSizing: 'border-box',
        fontSize: '14px',
        zIndex: 200,
      },
      button: {
        backgroundColor: '#ccc',
        borderRadius: 'inherit',
        boxSizing: 'border-box',
        outline: 0,
      },
      contentWrapper: {
        maxWidth: '100%',
        position: 'relative',
      },
      hover: {
        backgroundColor: lighten(0.6, baseBgColor),
      },
    },
    crm: {
      editButton: {
        focus: {
          border: `2px solid ${lighten(0.6, '#003e6c')}`,
          backgroundColor: '#003e6c',
        },
      },
      actionButtonWrapper: {
        backgroundColor: '#003e6c',
        boxShadow: '0 5px 5px -5px black, 0 0 1px #003e6c',
      },
      button: {
        backgroundColor: 'white',
        border: '1px solid blue',
      },
      hover: {
        backgroundColor: lighten(0.6, '#003e6c'),
      },
    },
  },
});

const theme = generateTheme('#575857', '#A7A7A7');

const BasicInlineEdit: React.FC<any> = ({
  appearance = 'default',
}) => {
  const [value, setValue] = React.useState('');

  const getReadView = React.useCallback(() => (
    <div>
      { value || 'Click to enter value' }
    </div>
  ), [value]);

  const getEditView = React.useCallback((fieldProps) => (
    <input type="text" { ...fieldProps } autoFocus />
  ), []);

  const handleConfirm = React.useCallback((v: string) => {
    setValue(v);
  }, []);

  return (
    <ThemeProvider theme={ { [inlineEditThemeNamespace]: theme } }>
      <InlineEdit
        appearance={ appearance }
        defaultValue={ value }
        readView={ getReadView }
        editView={ getEditView }
        onConfirm={ handleConfirm }
      />
    </ThemeProvider>
  );
};


storiesOf('InlineEdit', module)
  .add('Basic', () => (
    <div style={ { width: '200px' } }>
      <BasicInlineEdit />
    </div>
  ))
  .add('Themed', () => (
    <div style={ { width: '200px' } }>
      <BasicInlineEdit appearance="crm" />
    </div>
  ));
