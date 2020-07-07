import React, {
  FC, createRef, useState, useEffect, useCallback, memo,
} from 'react';
import { withTheme } from 'styled-components';


import { getInlineEditUncontrolled } from './InlineEditUncontrolled';
import { IInlineEditProps } from './interfaces';


interface IInlineEditState {
  isEditing?: boolean;
}

const getPureInlineEdit: <TFieldValue>() => FC<
IInlineEditProps<TFieldValue> & IInlineEditState
> = function f<TFieldValue>() {
  return ({
    startWithEditViewOpen = false,
    onConfirm,
    onCancel,
    defaultValue,
    readView,
    editView,
    disabled = false,
    invalid = false,
    appearance = 'default',
    error,
    ...rest
  }: IInlineEditProps<TFieldValue>) => {
    const editViewRef = createRef<HTMLElement>();
    const [isEditing, setIsEditing] = useState(startWithEditViewOpen);
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
      if (startWithEditViewOpen && editViewRef.current) {
        editViewRef.current.focus();
      }
    }, [startWithEditViewOpen, editViewRef]);

    useEffect(() => {
      if (isEditing && editViewRef.current) {
        editViewRef.current.focus();
      }
    }, [isEditing, editViewRef]);

    useEffect(() => {
      if (invalid) {
        setIsEditing(true);
      }
    });

    const handleConfirm = useCallback((newValue: TFieldValue): void => {
      onConfirm(newValue);
      setValue(newValue);
      setIsEditing(false);
    }, [onConfirm]);

    const handleCancel = useCallback((): void => {
      onCancel?.(defaultValue);
      setValue(defaultValue);
      handleConfirm(defaultValue);
    }, [onCancel, defaultValue]);

    const handleEditRequested = useCallback((): void => {
      setIsEditing(true);
    }, []);

    const InlineEditUncontrolled = getInlineEditUncontrolled<TFieldValue>();

    return (
      <InlineEditUncontrolled
        { ...rest }
        invalid={ invalid }
        error={ error }
        defaultValue={ value }
        editView={ editView }
        readView={ readView }
        onConfirm={ handleConfirm }
        onCancel={ handleCancel }
        isEditing={ isEditing }
        disabled={ disabled }
        onEditRequested={ handleEditRequested }
        appearance={ appearance }
      />
    );
  };
};

export const PureInlineEdit = getPureInlineEdit();

export const InlineEdit = memo(withTheme(PureInlineEdit));
