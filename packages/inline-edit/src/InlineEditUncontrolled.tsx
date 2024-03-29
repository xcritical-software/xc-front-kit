/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  useCallback,
  createRef,
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  ReadViewWrapper,
  EditButton,
  ReadViewContentWrapper,
  ButtonsWrapper,
  ButtonWrapper,
  Button,
  ContentWrapper,
  ConfirmIcon,
  CancelIcon,
} from './styled/InlineEdit';
import { IInlineEditUncontrolledProps } from './interfaces';

export const InlineEditUncontrolled = function <TFieldValue>({
  appearance = 'default',
  baseAppearance = 'default',
  value: valueProp,
  readView: ReadView,
  readViewProps,
  editView: EditView,
  editViewProps,
  readViewFitContainerWidth,
  isEditing,
  disabled,
  onEditRequested,
  onCancel,
  onConfirm,
  invalid,
  error,
  cancelIcon: CustomCancelIcon,
  confirmIcon: CustomConfirmIcon,
  isDoubleClickMode = false,
  className,
  classNamePrefix,
  closeOnOutsideClick,
}: IInlineEditUncontrolledProps<TFieldValue>): React.ReactElement<
  IInlineEditUncontrolledProps<TFieldValue>
> {
  const editButtonRef = createRef<HTMLButtonElement>();
  const confirmButtonRef = createRef<HTMLButtonElement>();
  const cancelButtonRef = createRef<HTMLButtonElement>();
  const contentRef = useRef<any>();

  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  const handleEditValueChange = useCallback((e: any) => {
    if (e?.target && e?.target?.value) {
      setValue(e.target.value);
    } else {
      setValue(e);
    }
  }, []);

  const handleReadViewClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>): void => {
      event.preventDefault();

      if (!disabled) {
        onEditRequested();
      }
    },
    [disabled, onEditRequested]
  );

  const handleConfirmClick = useCallback(
    (e: React.MouseEvent<HTMLElement>): void => {
      e.preventDefault();
      onConfirm(value);
    },
    [onConfirm, value]
  );

  const handleCancelClick = useCallback(
    (e: React.MouseEvent<HTMLElement>): void => {
      e.preventDefault();
      setValue(valueProp);
      onCancel?.();
    },
    [onCancel, valueProp]
  );

  const handleClickOutside = useCallback(
    (e: MouseEvent): void => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target) &&
        closeOnOutsideClick &&
        isEditing
      ) {
        e.preventDefault();
        setValue(valueProp);
        onCancel?.();
      }
    },
    [closeOnOutsideClick, onCancel, valueProp, isEditing]
  );

  useEffect(() => {
    if (closeOnOutsideClick) {
      document.addEventListener('mousedown', handleClickOutside);

      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {};
  }, [handleClickOutside, closeOnOutsideClick]);

  return (
    <ContentWrapper
      ref={contentRef}
      className={className}
      appearance={appearance}
      baseAppearance={baseAppearance}>
      {isEditing ? (
        <>
          <EditView
            className={classNamePrefix && `${classNamePrefix}__edit-view`}
            {...editViewProps}
            value={value}
            onChange={handleEditValueChange}
            invalid={invalid}
            error={error}
          />
          <ButtonsWrapper
            className={classNamePrefix && `${classNamePrefix}__buttons-wrapper`}
            appearance={appearance}
            baseAppearance={baseAppearance}>
            <ButtonWrapper
              className={
                classNamePrefix && `${classNamePrefix}__button-wrapper`
              }
              appearance={appearance}
              baseAppearance={baseAppearance}>
              <Button
                className={
                  classNamePrefix && `${classNamePrefix}__button-confirm`
                }
                appearance={appearance}
                baseAppearance={baseAppearance}
                ref={confirmButtonRef}
                onClick={handleConfirmClick}>
                {CustomConfirmIcon ? (
                  <CustomConfirmIcon />
                ) : (
                  <ConfirmIcon
                    className={
                      classNamePrefix && `${classNamePrefix}__icon-confirm`
                    }
                    appearance={appearance}
                    baseAppearance={baseAppearance}
                    viewBox="0 0 24 24">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                  </ConfirmIcon>
                )}
              </Button>
            </ButtonWrapper>
            <ButtonWrapper
              className={
                classNamePrefix && `${classNamePrefix}__button-wrapper`
              }
              appearance={appearance}
              baseAppearance={baseAppearance}>
              <Button
                className={
                  classNamePrefix && `${classNamePrefix}__button-cancel`
                }
                appearance={appearance}
                baseAppearance={baseAppearance}
                ref={cancelButtonRef}
                onClick={handleCancelClick}>
                {CustomCancelIcon ? (
                  <CustomCancelIcon />
                ) : (
                  <CancelIcon
                    className={
                      classNamePrefix && `${classNamePrefix}__icon-cancel`
                    }
                    appearance={appearance}
                    baseAppearance={baseAppearance}
                    viewBox="0 0 24 24">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                  </CancelIcon>
                )}
              </Button>
            </ButtonWrapper>
          </ButtonsWrapper>
        </>
      ) : (
        <ReadViewWrapper
          className={classNamePrefix && `${classNamePrefix}__wrapper`}>
          <EditButton
            className={classNamePrefix && `${classNamePrefix}__button-edit`}
            appearance={appearance}
            baseAppearance={baseAppearance}
            onClick={onEditRequested}
            ref={editButtonRef}
          />
          <ReadViewContentWrapper
            className={classNamePrefix && `${classNamePrefix}__content-wrapper`}
            appearance={appearance}
            baseAppearance={baseAppearance}
            readViewFitContainerWidth={readViewFitContainerWidth}
            disabled={disabled}
            onClick={isDoubleClickMode ? undefined : handleReadViewClick}
            onDoubleClick={isDoubleClickMode ? handleReadViewClick : undefined}>
            <ReadView {...readViewProps} value={value} />
          </ReadViewContentWrapper>
        </ReadViewWrapper>
      )}
    </ContentWrapper>
  );
};
