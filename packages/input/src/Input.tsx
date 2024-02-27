/* eslint-disable jsx-a11y/no-autofocus */
import React, { useCallback, useRef, useState } from 'react';

import {
  Root,
  Prefix,
  Postfix,
  StyledInput,
  ClearIconWrapper,
} from './styled/Input';
import { IInputProps } from './interfaces';
import { DefaultClearIcon } from './Icons';

export const PureInput = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      classNamePrefix,
      appearance = 'default',
      baseAppearance = 'default',
      prefix,
      postfix,
      isRTL = false,
      isDivided = false,
      disabled = false,
      invalid = false,
      pattern,
      onChange,
      onValidate,
      type = 'text',
      autoComplete = 'on',
      shouldFitContainer = false,
      css,
      isClearable,
      clearIcon: ClearIcon = DefaultClearIcon,
      value,
      onFocus,
      onBlur,
      showArrows = false,
      ...rest
    },
    ref: React.MutableRefObject<HTMLInputElement>
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const innerRef = useRef<HTMLInputElement>(null);
    const combinedRef = ref || innerRef;

    const inputOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (pattern) {
          const isValid = RegExp(pattern).test(e.target.value);

          if (!onValidate && !isValid) {
            return;
          }

          if (onValidate) {
            onValidate(isValid, e);
          }
        }

        if (onChange) {
          onChange(e.target.value, e);
        }
      },
      [onChange, onValidate, pattern]
    );

    const handleClick = useCallback(() => {
      // eslint-disable-next-line no-unused-expressions
      combinedRef.current?.focus();
    }, []);

    const inputOnClear = useCallback(() => {
      if (onChange) onChange('');
    }, [onChange]);

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        setIsFocused(true);

        if (onFocus) onFocus(event);
      },
      [onFocus]
    );
    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        setIsFocused(false);

        if (onBlur) onBlur(event);
      },
      [onBlur]
    );

    return (
      <Root
        className={className}
        appearance={appearance}
        baseAppearance={baseAppearance}
        isRTL={isRTL}
        disabled={disabled}
        invalid={invalid}
        css={css}
        shouldFitContainer={shouldFitContainer}
        onClick={handleClick}
        hasValue={!!value}
        focusOnInput={isFocused}>
        {!!prefix && (
          <Prefix
            className={classNamePrefix && `${classNamePrefix}__prefix`}
            appearance={appearance}
            baseAppearance={baseAppearance}
            isRTL={isRTL}
            isDivided={isDivided}>
            {prefix}
          </Prefix>
        )}
        <StyledInput
          className={classNamePrefix && `${classNamePrefix}_styled`}
          appearance={appearance}
          baseAppearance={baseAppearance}
          isRTL={isRTL}
          isDivided={isDivided}
          disabled={disabled}
          invalid={invalid}
          onChange={inputOnChange}
          type={type}
          ref={combinedRef}
          autoComplete={autoComplete}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          showArrows={showArrows}
          {...rest}
        />
        {isClearable && !!value && (
          <ClearIconWrapper
            className={
              classNamePrefix && `${classNamePrefix}__icon-wrapper-clear`
            }
            appearance={appearance}
            baseAppearance={baseAppearance}
            onClick={inputOnClear}
            disabled={disabled}
            invalid={invalid}
            hasValue={!!value}
            focusOnInput={isFocused}>
            <ClearIcon
              className={
                classNamePrefix && `${classNamePrefix}__icon-clear-default`
              }
            />
          </ClearIconWrapper>
        )}
        {!!postfix && (
          <Postfix
            className={classNamePrefix && `${classNamePrefix}__postfix`}
            appearance={appearance}
            baseAppearance={baseAppearance}
            isRTL={isRTL}
            isDivided={isDivided}>
            {postfix}
          </Postfix>
        )}
      </Root>
    );
  }
);
