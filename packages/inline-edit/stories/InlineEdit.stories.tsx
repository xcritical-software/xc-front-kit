/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import BookIcon from 'mdi-react/BookIcon';
import CreditCardIcon from 'mdi-react/CreditCardIcon';

import Input from '@xcritical/input';
import Select from '@xcritical/select';
import { AllType } from '@xcritical/theme';

import InlineEdit, { inlineEditThemeNamespace } from '../src';

import { ErrorMessage, theme, options } from './Components';

const BasicInlineEditInput: React.FC<AllType> = ({
  appearance = 'default',
  cancelIcon,
  confirmIcon,
  isDoubleClickMode,
  defaultValue = '',
  className,
  classNamePrefix,
  closeOnEscape,
  ...rest
}) => {
  const [value, setValue] = React.useState(defaultValue);

  const getReadView = React.useCallback(
    () => <div>{value || 'Click to enter value'}</div>,
    [value]
  );

  const getEditView = React.useCallback(
    (fieldProps) => (
      <Input
        {...fieldProps}
        {...rest}
        autoFocus
        shouldFitContainer
        className="at-input-root"
        classNamePrefix="at-input"
      />
    ),
    [rest]
  );

  const handleConfirm = React.useCallback((v: AllType) => {
    setValue(v);
  }, []);

  return (
    <ThemeProvider theme={{ [inlineEditThemeNamespace]: theme }}>
      <InlineEdit
        appearance={appearance}
        value={value}
        readView={getReadView}
        editView={getEditView}
        onConfirm={handleConfirm}
        cancelIcon={cancelIcon}
        confirmIcon={confirmIcon}
        isDoubleClickMode={isDoubleClickMode}
        className={className}
        classNamePrefix={classNamePrefix}
        closeOnEscape={closeOnEscape}
      />
    </ThemeProvider>
  );
};

const BasicInlineEditSelect: React.FC<AllType> = ({
  appearance = 'default',
  ...rest
}) => {
  const [selectValue, setSelectValue] = React.useState<{
    value: number;
    label: string;
  }>({ value: 0, label: 'Select value' });

  const getReadView = React.useCallback(
    () => <div>{selectValue.label || 'Click to enter value'}</div>,
    [selectValue]
  );

  const getEditView = React.useCallback(
    (fieldProps) => (
      <Select {...fieldProps} {...rest} autoFocus shouldFitContainer />
    ),
    [rest]
  );

  const handleConfirm = React.useCallback((v: AllType) => {
    setSelectValue(v);
  }, []);

  return (
    <ThemeProvider theme={{ [inlineEditThemeNamespace]: theme }}>
      <InlineEdit
        appearance={appearance}
        value={selectValue}
        readView={getReadView}
        editView={getEditView}
        onConfirm={handleConfirm}
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
  const [innerError, setError] = React.useState('');
  const [withError, setWithError] = React.useState(false);

  const getReadView = React.useCallback(
    () => <div>{value || "Click and try to enter '123'"}</div>,
    [value]
  );

  const getEditView = React.useCallback(
    ({ invalid, error, ...fieldProps }) => (
      <>
        {invalid && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          {...fieldProps}
          {...rest}
          invalid={invalid}
          autoFocus
          shouldFitContainer
        />
      </>
    ),
    [rest]
  );

  const handleConfirm = React.useCallback((v: AllType) => {
    if (v === '123') {
      setWithError(true);
      setError("You can't use '123' as value.");
    } else {
      setWithError(false);
      setValue(v);
      setIsEditing(false);
    }
  }, []);

  const onCancel = React.useCallback(() => {
    setWithError(false);
    setIsEditing(false);
  }, []);

  return (
    <ThemeProvider theme={{ [inlineEditThemeNamespace]: theme }}>
      <InlineEdit
        appearance={appearance}
        value={value}
        readView={getReadView}
        editView={getEditView}
        onConfirm={handleConfirm}
        onCancel={onCancel}
        invalid={withError}
        error={innerError}
        isEditing={isEditing}
        onIsEditingChange={setIsEditing}
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
  const [innerError, setError] = React.useState('');
  const [withError, setWithError] = React.useState(false);

  const getReadView = React.useCallback(
    () => <div>{value.label || 'Click and try to save it without value'}</div>,
    [value]
  );

  const getEditView = React.useCallback(
    ({ invalid, error, ...fieldProps }) => (
      <>
        {invalid && <ErrorMessage>{error}</ErrorMessage>}
        <Select {...fieldProps} {...rest} autoFocus shouldFitContainer />
      </>
    ),
    [rest]
  );

  const handleConfirm = React.useCallback(
    (v: { value: string; label: string }) => {
      if (v.value === '') {
        setWithError(true);
        setError('You should select something.');
      } else {
        setWithError(false);
        setValue(v);
        setIsEditing(false);
      }
    },
    []
  );

  const handleOnIsEditingChange = React.useCallback(
    (isEditingState: boolean) => {
      if (isEditingState) {
        setIsEditing(true);
      }
    },
    []
  );

  const onCancel = React.useCallback(() => {
    setWithError(false);
    setIsEditing(false);
  }, []);

  return (
    <ThemeProvider theme={{ [inlineEditThemeNamespace]: theme }}>
      <InlineEdit
        appearance={appearance}
        value={value}
        readView={getReadView}
        editView={getEditView}
        onConfirm={handleConfirm}
        onCancel={onCancel}
        invalid={withError}
        error={innerError}
        isEditing={isEditing}
        onIsEditingChange={handleOnIsEditingChange}
      />
    </ThemeProvider>
  );
};

const meta: Meta<typeof InlineEdit> = {
  component: InlineEdit,
};

export default meta;
type Story = StoryObj<typeof InlineEdit>;

export const Basic: Story = {
  name: 'Basic',
  render: () => (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '300px', marginLeft: '10px' }}>
        <p>Basic InlineEdit</p>
        <BasicInlineEditInput editView={Input} />
      </div>
      <div style={{ width: '300px', marginLeft: '50px' }}>
        <p>Basic InlineEdit with closing by Esc button</p>
        <BasicInlineEditInput editView={Input} closeOnEscape />
      </div>
    </div>
  ),
};

export const Themed: Story = {
  name: 'Themed',
  render: () => (
    <div style={{ width: '200px' }}>
      <BasicInlineEditInput editView={Input} appearance="crm" />
    </div>
  ),
};

export const InlineEditSelect: Story = {
  name: 'Select',
  render: () => (
    <div style={{ width: '200px' }}>
      <BasicInlineEditSelect options={options} appearance="crm" />
    </div>
  ),
};

export const CustomButtonIcon: Story = {
  name: 'Custom Button Icon',
  render: () => (
    <div style={{ width: '200px' }}>
      <BasicInlineEditInput
        cancelIcon={() => <BookIcon color="red" />}
        confirmIcon={CreditCardIcon}
        appearance="crm"
      />
    </div>
  ),
};

export const WithValidation: Story = {
  name: 'InlineEdit with custom validation',
  render: () => (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '300px', marginLeft: '10px' }}>
        <p>Input InlineEdit</p>
        <InlineEditInputWithValidation editView={Input} />
      </div>
      <div style={{ width: '300px', marginLeft: '50px' }}>
        <p>Select InlineEdit</p>
        <InlineEditSelectWithValidation options={options} />
      </div>
    </div>
  ),
};

export const DoubleClickMode: Story = {
  name: 'Edit view on double click',
  render: () => (
    <div style={{ width: '200px' }}>
      <BasicInlineEditInput
        editView={Input}
        isDoubleClickMode
        defaultValue="Edit view on double click"
      />
    </div>
  ),
};

export const ClassNamePrefix: Story = {
  name: 'className & Prefix',
  render: () => (
    <div style={{ width: '200px' }}>
      <BasicInlineEditInput
        cancelIcon={() => <BookIcon color="red" className="at-book-icon" />}
        confirmIcon={() => <CreditCardIcon className="at-credit-card-icon" />}
        appearance="crm"
        className="at-inline-edit-root"
        classNamePrefix="at-inline-edit"
      />
    </div>
  ),
};
