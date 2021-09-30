import React, { useState, useEffect, useCallback } from 'react';

import { InlineEditUncontrolled } from './InlineEditUncontrolled';
import { IInlineEditProps, IReadViewProps } from './interfaces';

export const PureInlineEdit = function <
  TEditViewProps,
  TViewProps extends IReadViewProps<TFieldValue>,
  TFieldValue
>({
  appearance = 'default',
  startWithEditViewOpen = false,
  onConfirm,
  onCancel,
  value: valueProp,
  disabled = false,
  invalid = false,
  isEditing,
  onIsEditingChange,
  dataAtField,
  ...rest
}: IInlineEditProps<
  TEditViewProps,
  TViewProps,
  TFieldValue
>): React.ReactElement<
  IInlineEditProps<TEditViewProps, TViewProps, TFieldValue>
> {
  const [isEditingAuto, setIsEditingAutoMode] = useState(startWithEditViewOpen);
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    if (invalid && isEditing === undefined) {
      setIsEditingAutoMode(true);
    }
  });

  useEffect(() => setValue(valueProp), [valueProp]);

  const handleConfirm = useCallback(
    (newValue: TFieldValue): void => {
      setValue(newValue);
      onConfirm?.(newValue);

      if (isEditing) return;

      setIsEditingAutoMode(false);
    },
    [onConfirm, isEditing]
  );

  const handleCancel = useCallback((): void => {
    setValue(valueProp);

    if (onCancel) {
      onCancel();

      return;
    }

    setIsEditingAutoMode(false);
  }, [onCancel, valueProp]);

  const handleEditRequested = useCallback((): void => {
    if (onIsEditingChange) {
      onIsEditingChange(true);

      return;
    }

    setIsEditingAutoMode(true);
  }, []);

  return (
    <InlineEditUncontrolled
      {...rest}
      invalid={invalid}
      value={value}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      isEditing={isEditing !== undefined ? isEditing : isEditingAuto}
      disabled={disabled}
      onEditRequested={handleEditRequested}
      appearance={appearance}
      dataAtField={dataAtField}
    />
  );
};

export const InlineEdit = PureInlineEdit;
