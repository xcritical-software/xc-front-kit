/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';

import Input, { IInputProps } from '@xcritical/input';
import InlineEdit, { IEditViewProps, inlineEditThemeNamespace } from '@xcritical/inline-edit';

import { theme } from './helpers';


const ReadViewComponent: React.FC<{ value: string }> = ({ value }) => (
  <div>
    { value }
  </div>
);

const EditViewComponent: React.FC<IInputProps & IEditViewProps<string>> = ({ ...props }) => (
  <div>
    <Input
      { ...props }
    />
  </div>
);

storiesOf('InlineEdit', module)
  .add('Themed', () => (
    <ThemeProvider theme={ { [inlineEditThemeNamespace]: theme } }>
      <div style={ { width: '200px' } }>
        <InlineEdit
          defaultValue="Click to enter value"
          readView={ ReadViewComponent }
          editView={ EditViewComponent }
          editViewProps={ { shouldFitContainer: true } }
          onConfirm={ action('onConfirm') }
          onCancel={ action('onCancel') }
          onIsEditingChange={ action('onIsEditingChange') }
        />
      </div>
    </ThemeProvider>
  ))
  .add('Themed, with appearance', () => (
    <ThemeProvider theme={ { [inlineEditThemeNamespace]: theme } }>
      <div style={ { width: '200px' } }>
        <InlineEdit
          appearance="custom"
          defaultValue="Click to enter value"
          readView={ ReadViewComponent }
          editView={ EditViewComponent }
          editViewProps={ { shouldFitContainer: true } }
          onConfirm={ action('onConfirm') }
          onCancel={ action('onCancel') }
          onIsEditingChange={ action('onIsEditingChange') }
        />
      </div>
    </ThemeProvider>
  ));
