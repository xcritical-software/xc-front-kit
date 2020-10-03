/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select } from '@storybook/addon-knobs';


import Input, { IInputProps } from '@xcritical/input';
import InlineEdit, { IEditViewProps } from '@xcritical/inline-edit';


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

const options = {
  True: true,
  False: false,
  Auto: undefined,
};

storiesOf('InlineEdit', module)
  .addDecorator(withKnobs)
  .add('Basic', () => (
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
  ))
  .add('with manual mode control', () => {
    const isEditing = select('isEditing', options, undefined, 'GROUP-ID1');

    return (
      <div style={ { width: '200px' } }>
        <InlineEdit
          isEditing={ typeof isEditing === 'boolean' ? isEditing : undefined }
          defaultValue="Click to enter value"
          readView={ ReadViewComponent }
          editView={ EditViewComponent }
          editViewProps={ { shouldFitContainer: true } }
          onConfirm={ action('onConfirm') }
          onCancel={ action('onCancel') }
          onIsEditingChange={ action('onIsEditingChange') }
        />
      </div>
    );
  });
