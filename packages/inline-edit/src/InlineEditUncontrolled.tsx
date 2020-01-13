/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  FC, ReactNode, useCallback, createRef, useState,
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
    appearance = 'default',
    baseAppearance = 'default',
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

    const [value, setValue] = useState(defaultValue);

    const handleEditValueChange = useCallback((e) => {
      if (e.target && e.target.value) {
        setValue(e.target.value);
      } else {
        setValue(e);
      }
    }, []);

    const handleReadViewClick = useCallback((
      event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    ): void => {
      event.preventDefault();
      onEditRequested();
    }, [onEditRequested]);

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
          onClick={ onEditRequested }
          ref={ editButtonRef }
        />
        <ReadViewContentWrapper
          appearance={ appearance }
          baseAppearance={ baseAppearance }
          onClick={ handleReadViewClick }
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
            onClick={ handleConfirmClick }
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
