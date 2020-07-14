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

const BasicInlineEditInput: React.FC<AllType> = ({
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
    <Input
      { ...fieldProps }
      { ...rest }
      autoFocus
      shouldFitContainer
    />
  ), [rest]);

  const handleConfirm = React.useCallback((v: AllType) => {
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

const BasicInlineEditSelect: React.FC<AllType> = ({
  appearance = 'default',
  ...rest
}) => {
  const [selectValue, setSelectValue] = React.useState({ value: 0, label: 'Select value' });

  const getReadView = React.useCallback(() => (
    <div>
      { selectValue.label || 'Click to enter value' }
    </div>
  ), [selectValue]);

  const getEditView = React.useCallback((fieldProps) => (
    <Select
      { ...fieldProps }
      { ...rest }
      autoFocus
      shouldFitContainer
    />
  ), [rest]);

  const handleConfirm = React.useCallback((v: AllType) => {
    setSelectValue(v);
  }, []);

  const handleCancel = React.useCallback((defaultValue: AllType) => {
    setSelectValue(defaultValue);
  }, []);

  return (
    <ThemeProvider theme={ { [inlineEditThemeNamespace]: theme } }>
      <InlineEdit
        appearance={ appearance }
        defaultValue={ selectValue }
        readView={ getReadView }
        editView={ getEditView }
        onConfirm={ handleConfirm }
        onCancel={ handleCancel }
      />
    </ThemeProvider>
  );
};

const InlineEditInputWithValidation: React.FC<AllType> = ({
  appearance = 'default',
  ...rest
}) => {
  const [value, setValue] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  const [error, setError] = React.useState('');
  const [invalid, setInvalid] = React.useState(false);

  const getReadView = React.useCallback(() => (
    <div>
      { value || 'Click and try to enter \'123\'' }
    </div>
  ), [value]);

  const getEditView = React.useCallback((fieldProps) => (
    <Input
      { ...fieldProps }
      { ...rest }
      autoFocus
      shouldFitContainer
    />
  ), [rest]);

  const handleConfirm = React.useCallback((v: AllType) => {
    if (v === '123') {
      setInvalid(true);
      setError('You can\'t use \'123\' as value.');
    } else {
      setInvalid(false);
      setValue(v);
      setIsEditing(false);
    }
  }, []);

  const handleSetIsEditing = React.useCallback((isEditingState: boolean) => {
    if (isEditingState) {
      setIsEditing(true);
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
        invalid={ invalid }
        error={ error }
        isEditing={ isEditing }
        setIsEditing={ handleSetIsEditing }
      />
    </ThemeProvider>
  );
};

const InlineEditSelectWithValidation: React.FC<AllType> = ({
  appearance = 'default',
  ...rest
}) => {
  const [value, setValue] = React.useState({ value: '', label: '' });
  const [isEditing, setIsEditing] = React.useState(false);
  const [error, setError] = React.useState('');
  const [invalid, setInvalid] = React.useState(false);

  const getReadView = React.useCallback(() => (
    <div>
      { value.label || 'Click and try to save it without value' }
    </div>
  ), [value]);

  const getEditView = React.useCallback((fieldProps) => (
    <Select
      { ...fieldProps }
      { ...rest }
      autoFocus
      shouldFitContainer
    />
  ), [rest]);

  const handleConfirm = React.useCallback((v: { value: string; label: string }) => {
    if (v.value === '') {
      setInvalid(true);
      setError('You should select something.');
    } else {
      setInvalid(false);
      setValue(v);
      setIsEditing(false);
    }
  }, []);

  const handleSetIsEditing = React.useCallback((isEditingState: boolean) => {
    if (isEditingState) {
      setIsEditing(true);
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
        invalid={ invalid }
        error={ error }
        isEditing={ isEditing }
        setIsEditing={ handleSetIsEditing }
      />
    </ThemeProvider>
  );
};


storiesOf('InlineEdit', module)
  .add('Basic', () => (
    <div style={ { width: '200px' } }>
      <BasicInlineEditInput editView={ Input } />
    </div>
  ))
  .add('Themed', () => (
    <div style={ { width: '200px' } }>
      <BasicInlineEditInput
        editView={ Input }
        appearance="crm"
      />
    </div>
  ))
  .add('Select', () => (
    <div style={ { width: '200px' } }>
      <BasicInlineEditSelect
        options={ options }
        appearance="crm"
      />
    </div>
  ))
  .add('Input with custom validation', () => (
    <div style={ { width: '210px' } }>
      <InlineEditInputWithValidation editView={ Input } />
    </div>
  ))
  .add('Select with custom validation', () => (
    <div style={ { width: '210px' } }>
      <InlineEditSelectWithValidation
        options={ options }
      />
    </div>
  ));
