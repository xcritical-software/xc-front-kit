/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  FC, ReactNode, useRef, useCallback, createRef, useState, useEffect,
} from 'react';

import {
  ReadViewWrapper,
  EditButton,
  ReadViewContentWrapper,
  ButtonsWrapper,
  ButtonWrapper,
  Button,
  ContentWrapper,
} from './styled/InlineEdit';
import {
  ConfirmIcon,
  CancelIcon,
} from './Icons';
import { IInlineEditUncontrolledProps } from './interfaces';


export const getInlineEditUncontrolled: <TFieldValue = string>() => FC<
IInlineEditUncontrolledProps<TFieldValue>> = function f<TFieldValue>() {
  return ({
    appearance,
    baseAppearance,
    defaultValue,
    readView,
    editView,
    readViewFitContainerWidth,
    isEditing,
    onEditRequested,
    onCancel,
    onConfirm,
  }: IInlineEditUncontrolledProps<TFieldValue>) => {
    const editButtonRef = createRef<HTMLButtonElement>();
    const confirmButtonRef = createRef<HTMLButtonElement>();
    const cancelButtonRef = createRef<HTMLButtonElement>();

    const startX = useRef(0);
    const startY = useRef(0);
    const prevIsEditing = useRef(isEditing);
    const removeMouseDown: React.MutableRefObject<void | null> = useRef(null);

    const [value, setValue] = useState(defaultValue);
    const [preventFocusOnEditButton, setPreventFocusOnEditButton] = useState(false);

    useEffect(() => {
      if (prevIsEditing.current && !isEditing) {
        if (preventFocusOnEditButton) {
          setPreventFocusOnEditButton(false);
        } else if (editButtonRef && editButtonRef.current) {
          editButtonRef.current.focus();
        }
      }
    }, [editButtonRef, isEditing, preventFocusOnEditButton]);

    useEffect(() => {
      function handleMouseDown(this: Document, e: MouseEvent): void {
        if (confirmButtonRef.current?.contains(e.target as Node)) {
          onConfirm(value);
        } else if (cancelButtonRef.current?.contains(e.target as Node)) {
          onCancel();
        }
      }

      if (typeof removeMouseDown.current === 'function') {
        document.removeEventListener('mousedown', handleMouseDown);
        removeMouseDown.current = null;
      }

      removeMouseDown.current = document.addEventListener(
        'mousedown',
        handleMouseDown,
        { capture: true },
      );
    }, [cancelButtonRef, confirmButtonRef, onCancel, onConfirm, value]);

    const mouseHasMoved = useCallback((event: { clientX: number; clientY: number }): boolean => (
      Math.abs(startX.current - event.clientX) >= 5 || Math.abs(startY.current - event.clientY) >= 5
    ), []);

    const handleEditValueChange = useCallback((e) => {
      if (e.target && e.target.value) {
        setValue(e.target.value);
      } else {
        setValue(e);
      }
    }, []);

    const handleReadViewMouseDown = useCallback((e) => {
      startX.current = e.clientX;
      startY.current = e.clientY;
    }, []);

    const handleReadViewClick = useCallback((
      event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    ): void => {
      const element = event.target as HTMLElement;
      if (element.tagName.toLowerCase() !== 'a' && !mouseHasMoved(event)) {
        event.preventDefault();
        onEditRequested();
        setPreventFocusOnEditButton(true);
      }
    }, [mouseHasMoved, onEditRequested]);

    const handleConfirmClick = useCallback((e: React.MouseEvent<HTMLElement>): void => {
      e.preventDefault();
      onConfirm(value);
    }, [onConfirm, value]);

    const handleCancelClick = useCallback((e: React.MouseEvent<HTMLElement>): void => {
      e.preventDefault();
      onCancel();
    }, [onCancel]);

    const renderReadView = useCallback((): ReactNode => (
      <ReadViewWrapper>
        <EditButton
          appearance={ appearance }
          baseAppearance={ baseAppearance }
          type="button"
          onClick={ onEditRequested }
          ref={ editButtonRef }
        />
        <ReadViewContentWrapper
          appearance={ appearance }
          baseAppearance={ baseAppearance }
          onClick={ handleReadViewClick }
          onMouseDown={ handleReadViewMouseDown }
          readViewFitContainerWidth={ readViewFitContainerWidth }
        >
          { readView() }
        </ReadViewContentWrapper>
      </ReadViewWrapper>
    ), [
      appearance,
      baseAppearance,
      editButtonRef,
      handleReadViewClick,
      handleReadViewMouseDown,
      onEditRequested,
      readView,
      readViewFitContainerWidth,
    ]);

    const renderActionButtons = useCallback((): ReactNode => (
      <ButtonsWrapper
        appearance={ appearance }
        baseAppearance={ baseAppearance }
      >
        <ButtonWrapper
          appearance={ appearance }
          baseAppearance={ baseAppearance }
        >
          <Button
            appearance={ appearance }
            baseAppearance={ baseAppearance }
            ref={ confirmButtonRef }
            type="button"
            onClick={ handleConfirmClick }
            onMouseDown={ () => {
              setPreventFocusOnEditButton(true);
            } }
          >
            <ConfirmIcon />
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            appearance={ appearance }
            baseAppearance={ baseAppearance }
            ref={ cancelButtonRef }
            onClick={ handleCancelClick }
            onMouseDown={ () => {
              setPreventFocusOnEditButton(true);
            } }
          >
            <CancelIcon />
          </Button>
        </ButtonWrapper>
      </ButtonsWrapper>
    ), [
      appearance,
      baseAppearance,
      cancelButtonRef,
      confirmButtonRef,
      handleCancelClick,
      handleConfirmClick,
    ]);

    return (
      <ContentWrapper
        appearance={ appearance }
        baseAppearance={ baseAppearance }
      >
        {
          isEditing ? (
            <>
              { editView({ value, onChange: handleEditValueChange }) }
              { renderActionButtons() }
            </>
          ) : renderReadView()
        }
      </ContentWrapper>
    );
  };
};
