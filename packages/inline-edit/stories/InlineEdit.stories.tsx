/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { lighten } from 'polished';

import Input from '@xcritical/input';
import Select from '@xcritical/select';
import { AllType } from '@xcritical/theme';

import InlineEdit, { inlineEditThemeNamespace } from '../src';

import { InlineEditTheme } from '../src/interfaces';


const generateTheme = (
  baseBgColor: string,
  textColor: string,
): InlineEditTheme => ({
  backgroundColor: baseBgColor,
  color: textColor,
  appearance: {
    crm: {
      editButton: {
        focus: {
          border: `2px solid ${lighten(0.6, '#003e6c')}`,
          backgroundColor: '#003e6c',
        },
      },
      actionButtonWrapper: {
        backgroundColor: '#003e6c',
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

const theme = generateTheme('#fff', '#000');

const options = [
  { value: 'firstCard', label: '1234 1234 1234 1234' },
  { value: 'secondCard', label: '4321 4321 4321 4321' },
  { value: 'thirdCard', label: '4567 4567 4567 4567' },
  { value: 'fourthCard', label: '0123 0123 0123 0123' },
];

const BasicInlineEdit: React.FC<AllType> = ({
  editView: Component,
  appearance = 'default',
  ...rest
}) => {
  const [value, setValue] = React.useState('');

  const getReadView = React.useCallback(() => (
    <div>
      { value || 'Click to enter value' }
    </div>
  ), [value]);

  const getEditView = React.useCallback((fieldProps) => (
    <Component
      { ...fieldProps }
      { ...rest }
      autoFocus
      shouldFitContainer
    />
  ), [rest]);

  const handleConfirm = React.useCallback((v: AllType) => {
    if (v.label) {
      setValue(v.label);
    } else {
      setValue(v);
    }
  }, []);

  const handleCancel = React.useCallback((defaultValue: AllType) => {
    if (defaultValue.label) {
      setValue(defaultValue.label || '');
    } else {
      setValue(defaultValue || '');
    }
  }, []);

  return (
    <ThemeProvider theme={ { [inlineEditThemeNamespace]: theme } }>
      <InlineEdit
        appearance={ appearance }
        defaultValue={ value }
        readView={ getReadView }
        editView={ getEditView }
        onConfirm={ handleConfirm }
        onCancel={ handleCancel }
      />
    </ThemeProvider>
  );
};


storiesOf('InlineEdit', module)
  .add('Basic', () => (
    <div style={ { width: '200px' } }>
      <BasicInlineEdit editView={ Input } />
    </div>
  ))
  .add('Themed', () => (
    <div style={ { width: '200px' } }>
      <BasicInlineEdit
        editView={ Input }
        appearance="crm"
      />
    </div>
  ))
  .add('Select', () => (
    <div style={ { width: '200px' } }>
      <BasicInlineEdit
        editView={ Select }
        options={ options }
        appearance="crm"
      />
    </div>
  ));
