import React, {
  FC, createRef, useState, useEffect, useCallback, memo,
} from 'react';
import { withTheme } from 'styled-components';


import { getInlineEditUncontrolled } from './InlineEditUncontrolled';
import { IInlineEditProps } from './interfaces';


interface IInlineEditState {
  isEditing?: boolean;
}

const getPureInlineEdit: <TFieldValue = string>() => FC<
IInlineEditProps<TFieldValue> & IInlineEditState> = function f<TFieldValue>() {
  return ({
    startWithEditViewOpen = false,
    onConfirm,
    defaultValue,
    readView,
    editView,
    ...rest
  }: IInlineEditProps<TFieldValue>) => {
    const editViewRef = createRef<HTMLElement>();
    const [isEditing, setIsEditing] = useState(startWithEditViewOpen);

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

    const handleConfirm = useCallback((value: string): void => {
      setIsEditing(false);
      onConfirm(value);
    }, [onConfirm]);

    const handleCancel = useCallback((): void => {
      setIsEditing(false);
      onConfirm('');
    }, [onConfirm]);

    const handleEditRequested = useCallback((): void => {
      setIsEditing(true);
    }, []);

    const InlineEditUncontrolled = getInlineEditUncontrolled<TFieldValue>();

    return (
      <InlineEditUncontrolled
        { ...rest }
        defaultValue={ defaultValue }
        editView={ (fieldProps) => editView(fieldProps, editViewRef) }
        readView={ readView }
        onConfirm={ handleConfirm }
        onCancel={ handleCancel }
        isEditing={ isEditing }
        onEditRequested={ handleEditRequested }
      />
    );
  };
};

export const PureInlineEdit = getPureInlineEdit();

export const InlineEdit = memo(withTheme(PureInlineEdit));
