import React, {
  FC, createRef, useState, useEffect, useCallback, memo, useRef,
} from 'react';
import { withTheme } from 'styled-components';


import { getInlineEditUncontrolled } from './InlineEditUncontrolled';
import { IInlineEditProps } from './interfaces';


interface IInlineEditState {
  isEditing?: boolean;
}

const getPureInlineEdit: <TFieldValue>() => FC<IInlineEditProps<TFieldValue> & IInlineEditState> = function f<TFieldValue>() {
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
            ...rest
          }: IInlineEditProps<TFieldValue>) => {
    const editViewRef = createRef<HTMLElement>();
    const [isEditing, setIsEditing] = useState(startWithEditViewOpen || invalid);
    const defaultValueRef = useRef(defaultValue);
    console.log(invalid, isEditing)

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
        setIsEditing(true)
      }
    });

    const handleConfirm = useCallback((value: TFieldValue): void => {
      setIsEditing(false);
      defaultValueRef.current = value;
      onConfirm(value);
    }, [onConfirm, invalid]);

    const handleCancel = useCallback((): void => {
      onCancel?.(defaultValueRef.current);
      setIsEditing(false);
    }, [onCancel]);

    const handleEditRequested = useCallback((): void => {
      setIsEditing(true);
    }, []);

    const InlineEditUncontrolled = getInlineEditUncontrolled<TFieldValue>();

    return (
      <InlineEditUncontrolled
        { ...rest }
        defaultValue={ defaultValue }
        editView={ editView }
        readView={ readView }
        onConfirm={ handleConfirm }
        onCancel={ handleCancel }
        isEditing={ isEditing }
        disabled={ disabled }
        onEditRequested={ handleEditRequested }
        appearance={ invalid ? 'error' : appearance }
      />
    );
  };
};

export const PureInlineEdit = getPureInlineEdit();

export const InlineEdit = memo(withTheme(PureInlineEdit));
